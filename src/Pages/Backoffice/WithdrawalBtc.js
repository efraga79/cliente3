import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function WithdrawalBtc() {
	document.title = `${i18n.t('sacar_td')} BTC | ${process.env.REACT_APP_NAME}`
	
	const token = sessionStorage.getItem('token')

	const [alertSuccess, setAlertSuccess] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [alertSuccessSenhaSaq, setAlertSuccessSenhaSaq] = useState(false)
	const [alertErrorSenhaSaq, setAlertErrorSenhaSaq] = useState(false)

	const [carteira, setCarteira] = useState([])
	const [seg, setSeg] = useState('')
	const [valor, setValor] = useState(0)
	
	useEffect(() => {
		const getWalletView = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/saque_bitcoin/token/${token}`).then(success => {
				setCarteira(success.data.carteira)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		getWalletView()
	}, [token])

	const validPassword = () => {
		let user = {
			senha : seg
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/valid_senhaf/token/${token}`, user).then(success => {
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

	const doSaqueBtc = () => {
		let post = {
			senha : seg,
			valor : valor
		}
		post = JSON.stringify(post)
		axios.post(`${process.env.REACT_APP_URL_API}/ContaCorrente/saque_bitcoin/token/${token}`,post).then(success => {
			if(success.data.status){
				setAlertError(false)
				setAlertSuccess(true)
				setSeg('')
				setValor('')
			} else {
				setAlertSuccess(false)
				setAlertError(true)
				console.log(success.data)
			}
		}).catch(error => {
			console.log(error)
			/* sessionStorage.removeItem('token')
			let local = window.location
			window.location = local */
		})
	}

	return (
		<Container>
			{carteira.fk_status ?
				<Row>
					<Col>
						<div className="p-2 card border-primary">
							<h4>{i18n.t('sacar_td')} BTC - {i18n.t('taxa')} 5%</h4>
							<p>{i18n.t('carteira_td')}: {carteira.carteira}</p>
							<Row>
								<Col>
									<Form>
										<Alert variant="info"><strong>{i18n.t('atencao_td')}</strong> {i18n.t('msg_saque_dia_td')}</Alert>
										{alertSuccess ?
											<Alert variant="success" onClose={() => setAlertSuccess(false)} dismissible>{i18n.t('saque_email_td')}</Alert>
										: ''}
										{alertError ?
											<Alert variant="danger" onClose={() => setAlertError(false)} dismissible> <strong>{i18n.t('erro_td')}</strong> {i18n.t('saque_td')}</Alert>
										: ''}
										{alertSuccessSenhaSaq ?
											<Alert variant="success" onClose={() => setAlertSuccessSenhaSaq(false)} dismissible>{i18n.t('success_senhaf')}</Alert>
										: ''}
										{alertErrorSenhaSaq ?
											<Alert variant="danger" onClose={() => setAlertErrorSenhaSaq(false)} dismissible> <strong>{i18n.t('atencao_td')}</strong> {i18n.t('senha_valid')}</Alert>
										: ''}
										<Row>
											<Col md="4">
												<Form.Group>
													<Form.Label>{i18n.t('senha_td')} {i18n.t('financeiro_td')}</Form.Label>
													<Form.Control type="password" placeholder={`${i18n.t('senha_td')} ${i18n.t('financeiro_td')}`} value={seg} autoComplete="off" onChange={e => setSeg(e.target.value)} onBlur={() => validPassword()}/>
												</Form.Group>
											</Col>
											<Col md="4">
												<Form.Group>
													<Form.Label>{i18n.t('valor_td')}</Form.Label>
													<Form.Control type="number" placeholder={i18n.t('valor_td')} value={valor} autoComplete="off" onChange={e => setValor(e.target.value)} />
												</Form.Group>
											</Col>
											<Col md="4">
												<Form.Group>
													<Form.Label>{i18n.t('sacar_td')}</Form.Label><br/>
													<Button variant="success" disabled={!seg | !valor } onClick={() => doSaqueBtc()}>{i18n.t('sacar_td')}</Button>
												</Form.Group>
											</Col>
										</Row>
									</Form>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			:
				<Row>
					<Col>
						<Alert variant="warning d-flex justify-content-between">
							<h4><strong>{i18n.t('cadastre_carteira')}</strong></h4>
							<Link to="/backoffice/updatewallet">
								<Button variant="warning">
									{i18n.t('cadastrar_td')} / {i18n.t('update_td')} {i18n.t('carteira_td')}
								</Button>
							</Link>
						</Alert>
					</Col>
				</Row>
			}
		</Container>
	)
}