import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Alert, Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

import Modals from '../../Components/SubComponents/Modals'

export default function PayWithBalance() {
	document.title = `${i18n.t('pg_saldo')} | ${process.env.REACT_APP_NAME}`
	const token = sessionStorage.getItem('token')

	const [saldo, setSaldo] = useState([])
	const [tipo, setTipo] = useState()
	const [ped, setPed] = useState()
	const [seg, setSeg] = useState()

	const [modalShow, setModalShow] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [alertSuccessSenhaSaq, setAlertSuccessSenhaSaq] = useState(false)
	const [alertErrorSenhaSaq, setAlertErrorSenhaSaq] = useState(false)

	useEffect(() => {
		const getBalance = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/pagarsaldo/token/${token}`).then(success => {
				if(success.data.status){
					setSaldo(success.data.dados)
				} else {
					console.log(success.data)
				}
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		getBalance()
	}, [token]);

	const validPassword = () => {
		let userPay = {
			senha : seg
		}
		userPay = JSON.stringify(userPay)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/valid_senhaf/token/${token}`, userPay).then(success => {
			if(!success.data.status){
				setSeg('')
				setAlertErrorSenhaSaq(true)
				setAlertSuccessSenhaSaq(false)
			} else {
				setAlertErrorSenhaSaq(false)
				setAlertSuccessSenhaSaq(true)
			}
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	const pagar = () => {
		let post = {
			tipo : tipo,
			ped : ped,
			seg : seg
		}
		post = JSON.stringify(post)
		axios.post(`${process.env.REACT_APP_URL_API}/ContaCorrente/modal_verificar_pagar/token/${token}`,post).then(success => {
			if(success.data.status){
				setAlertError(false)
				setAlertSuccess(true)
				axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/pagarsaldo/token/${token}`).then(success => {
					if(success.data.status){
						setSaldo(success.data.dados)
						setModalShow(false)
					} else {
						console.log(success.data)
					}
				}).catch(error => {
					console.log(error)
					sessionStorage.removeItem('token')
					let local = window.location
					window.location = local
				})
			} else {
				setAlertSuccess(false)
				setAlertError(true)
				setModalShow(false)
				console.log(success.data)
			}
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	return (
		<Container>
			<Row>
				<Col>
					<div className="card border-primary p-2">
						<h4>{i18n.t('pg_saldo')}</h4>
						{alertSuccess ?
							<Alert variant="success" onClose={() => setAlertSuccess(false)} dismissible><strong>{i18n.t('parabens_td')}</strong> {i18n.t('efetuado_td')} {i18n.t('sucesso_td')}</Alert>
						: ''}
						{alertError ?
							<Alert variant="danger" onClose={() => setAlertError(false)} dismissible><strong>{i18n.t('erro_td')}</strong> {i18n.t('msg_pacote_erro')}</Alert>
						: ''}
						{alertSuccessSenhaSaq ?
							<Alert variant="success" onClose={() => setAlertSuccessSenhaSaq(false)} dismissible>{i18n.t('success_senhaf')}</Alert>
						: ''}
						{alertErrorSenhaSaq ?
							<Alert variant="danger" onClose={() => setAlertErrorSenhaSaq(false)} dismissible> <strong>{i18n.t('atencao_td')}</strong> {i18n.t('senha_valid')}</Alert>
						: ''}
						<Form>
							<Row>
								<Col md="3">
									<Form.Label>{i18n.t('saldo_td')}</Form.Label>
									<InputGroup>
										<FormControl as="select" value={tipo} custom onChange={e => setTipo(e.target.value)}>
											<option>-- {i18n.t('escolha_td')} --</option>
											<option value='d_credito'>{`${i18n.t('saldo_td')} $: ${saldo.d_credito}`}</option>
										</FormControl>
									</InputGroup>
								</Col>
								<Col md="3">
									<Form.Group>
										<Form.Label>{i18n.t('senha_td')} {i18n.t('financeiro_td')}</Form.Label>
										<Form.Control type="password" placeholder={`${i18n.t('senha_td')} ${i18n.t('financeiro_td')}`} value={seg} autoComplete="off" onChange={e => setSeg(e.target.value)} onBlur={() => validPassword()}/>
									</Form.Group>
								</Col>
								<Col md="3">
									<Form.Group>
										<Form.Label>Nº {i18n.t('pedido_td')}</Form.Label>
										<Form.Control type="number" placeholder={`Nº ${i18n.t('pedido_td')}`} autoComplete="off" onChange={e => setPed(e.target.value)} />
									</Form.Group>
								</Col>
								<Col md="3">
									<Form.Group>
										<Form.Label>{i18n.t('pg_saldo')} {i18n.t('agora_td')}</Form.Label>
										<Button variant="warning" disabled={!seg | !ped | !tipo} onClick={() => setModalShow(true)}>{i18n.t('pg_saldo')} {i18n.t('agora_td')}</Button>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</div>
				</Col>
			</Row>
			<Modals
				size="lg"
				title={`${i18n.t('titulo_msg')}`}
				// contentClassName="bg-dark"
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Row>
					<Col md="9">
						<h3>{`${i18n.t('realmente')} ${i18n.t('pagar_td')}?`}</h3>
					</Col>
					<Col md="3">
						<Button variant="primary" size="lg" onClick={() => pagar()}>{i18n.t('pagar_td')}</Button>
					</Col>
				</Row>
			</Modals>
		</Container>
	)
}