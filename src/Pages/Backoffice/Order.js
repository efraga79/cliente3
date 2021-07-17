import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Col, Row, Card, Button, Alert, Spinner} from 'react-bootstrap'
import CardOrder from '../../Components/SubComponents/CardOrder'
import {i18n} from '../../Components/Translates/i18n'
import Modals from '../../Components/SubComponents/Modals'
import { FaBtc, FaEraser } from 'react-icons/fa'

export default function Order() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	document.title = `${i18n.t('pedido_td')} | ${process.env.REACT_APP_NAME}`
	
	const token = sessionStorage.getItem('token');

  	const [orders, setOrders] = useState([])
	const [idApagar, setIdApagar] = useState();
	const [pedId, setPedId] = useState();
	const [modalShow, setModalShow] = useState(false);
	const [modalWalletShow, setModalWalletShow] = useState(false);
	const [user, setUser] = useState([]);

	useEffect(() => {
		const getOrders = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/pedidos/token/${token}`).then(success => {
				if(success.data.status){
					setOrders(success.data.dados)
				} else {
					sessionStorage.removeItem('token')
					let local = window.location
					window.location = local
				}
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			window.scrollTo(0, 0)
		}
		getOrders()
	}, [token]);

	const apagar = data => {
		setIdApagar(data)
		setModalShow(true)
	}

	const doDelete = () => {
		axios.post(`${process.env.REACT_APP_URL_API}/ContaCorrente/pedidos/token/${token}`,idApagar).then(success => {
			if(success.data.status){
				axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/pedidos/token/${token}`).then(success => {
					if(success.data.status){
						setOrders(success.data.dados)
					} else {
						sessionStorage.removeItem('token')
						let local = window.location
						window.location = local
					}
				}).catch(error => {
					console.log(error)
					sessionStorage.removeItem('token')
					let local = window.location
					window.location = local
				})
				setModalShow(false)
			} else {
				alert('Order can not be deleted!')
			}
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	const gerarBtc = data => {
		document.getElementsByClassName('botao')[0].style.display = 'none'
		document.getElementsByClassName('loading')[0].style.display = 'block'
		let moeda = process.env.NODE_ENV === 'development'?'ltct':'btc'
		axios.get(`${process.env.REACT_APP_URL_API}/Block/gerar_pedido/moeda/${moeda}/pedido/${data}/token/${token}`).then(success => {
			if(success.data.status){
				setUser(success.data.user[0])
				setPedId(data)
				setModalWalletShow(true)
				document.getElementsByClassName('loading')[0].style.display = 'none'
			}
		}).catch(error => {
			console.log(error)
			/* sessionStorage.removeItem('token')
			let local = window.location
			window.location = local */
		})
	}

	return (
		<>
			<Row>
				<Col>
					<div className="p-2">
						<h4 className="text-white">{i18n.t('pagar_td')} {i18n.t('com_td')} Bitcoin</h4>
						<Row>
							{orders ? 
								orders.map((item, index) => {
									return (
										<Col md="6" xl="4" key={index}>
											<CardOrder
											bg="default"
											color="light"
											title={i18n.t('numero_td') + ' ' + i18n.t('pedido_td') + ': ' + item.ped_id}
											subtitle={i18n.t('desc_td') + ': ' + i18n.t(item.pro_nome)}
											status={item.fk_status === 3 ? "success" : "danger"}
											list={[
													{
														visible: true,
														title: i18n.t('data_td'),
														valor: new Intl.DateTimeFormat('pt-BR').format(new Date(item.ped_data))
													}, 
													{
														visible: true,
														title: i18n.t('status_td'),
														valor: item.fk_status === 3 ? i18n.t('pago_td') : i18n.t('pendente_td'),
														badge: item.fk_status === 3 ? "success" : "danger"
													}, 
													{
														visible: item.ped_data_pag ? true : false,
														title: i18n.t('data_td') + ' ' + i18n.t('de_td') + ' ' + i18n.t('pagamento_td'),
														valor: new Intl.DateTimeFormat('pt-BR').format(new Date(item.ped_data_pag))
													}, 
													{
														visible: true,
														title: i18n.t('total_td'),
														valor: item.ped_total
													},
													{
														visible: item.ped_total === item.ped_valor ? false : true,
														title: `${i18n.t('efetuado_td')} ${i18n.t('saldo_td')}`,
														valor: item.ped_total - item.ped_valor
													}
												]}
											>
											{item.fk_status === 2
											? <>
												<Card.Footer variant="dark">
													<Button variant="warning" className="botao" onClick={e => gerarBtc(item.ped_id)}><FaBtc /> Bitcoin</Button>
													<Spinner animation="border" className="loading" style={{display: 'none'}}/>
													<Button variant="danger" onClick={e => apagar(item.ped_id)}><FaEraser /> {i18n.t('apagar_td')}</Button>
												</Card.Footer>
											</>
											: ''}
											</CardOrder>
										</Col>
									)
								})
							: ''}
						</Row>
					</div>
				</Col>
			</Row>
			<Modals
				size="lg"
				title={`${i18n.t('apagar_td')} ${i18n.t('pedido_td')} ${idApagar}`}
				// contentClassName="bg-dark"
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Row>
					<Col md="9">
						<h3>{`${i18n.t('confirmar_td')} ${i18n.t('apagar_td')} ${i18n.t('pedido_td')} ${idApagar}?`}</h3>
					</Col>
					<Col md="3">
						<Button variant="danger" size="lg" onClick={() => doDelete()}>{i18n.t('apagar_td')}</Button>
					</Col>
				</Row>
			</Modals>
			
			<Modals
				size="lg"
				// contentClassName="bg-dark"
				show={modalWalletShow}
				onHide={() => setModalWalletShow(false)}
			>
				<Row>
					<Col>
						<Alert variant="success">
							<strong>
								{i18n.t('msg_wallet_email')} ({pedId}), 
								{i18n.t('msg_wallet_email2')}: <br/>
								{user.usu_email} <br/>
								{i18n.t('msg_wallet_email3')}
							</strong>
						</Alert>
					</Col>
				</Row>
			</Modals>
		</>
	)
}