import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function UpdateWallet() {
	document.title = `${i18n.t('update_td')} ${i18n.t('carteira_td')} | ${process.env.REACT_APP_NAME}`

	const token = sessionStorage.getItem('token')

	const [alertSuccess, setAlertSuccess] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [alertSuccessSenha, setAlertSuccessSenha] = useState(false)
	const [alertErrorSenha, setAlertErrorSenha] = useState(false)
	const [alertErrorWallet, setAlertErrorWallet] = useState(false)

	const [carteira, setCarteira] = useState([])
	const [seg, setSeg] = useState('')
	const [newCarteira, setNewCarteira] = useState('')
	
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
				setAlertErrorSenha(true)
				setAlertSuccessSenha(false)
			} else {
				setAlertErrorSenha(false)
				setAlertSuccessSenha(true)
			}
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	const validCarteira = () => {
		let user = {
			senha : seg,
			carteira : newCarteira
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/valid_carteira_user/token/${token}`, user).then(success => {
			if(!success.data.status){
				setNewCarteira('')
				setAlertErrorWallet(true)
			} else {
				setAlertErrorWallet(false)
			}
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	const doRegBtc = () => {
		let user = {
			senha : seg,
			carteira : newCarteira
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/ContaCorrente/registro_carteira/token/${token}`, user).then(success => {
			if(success.data.status){
				setNewCarteira('')
				setSeg('')
				setAlertError(false)
				setAlertSuccess(true)
				axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/saque_bitcoin/token/${token}`).then(success => {
					setCarteira(success.data.carteira)
				})
			} else {
				setAlertSuccess(false)
				setAlertError(true)
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
					<div className="p-2 card border-primary">
						<h4>{i18n.t('update_td')} {i18n.t('carteira_td')}</h4>
						<p>{i18n.t('carteira_td')} {i18n.t('atual_td')}: {i18n.t(carteira.carteira)}</p>
						<Row>
							<Col>
								<Form>
									{alertSuccess ?
										<Alert variant="success" onClose={() => setAlertSuccess(false)} dismissible><strong>{i18n.t('parabens_td')}!</strong> {i18n.t('carteira_td_succss')}</Alert>
									: ''}
									{alertError ?
										<Alert variant="danger" onClose={() => setAlertError(false)} dismissible> <strong>{i18n.t('atencao_td')}!</strong> {i18n.t('carteira_td_erro')}</Alert>
									: ''}
									{alertSuccessSenha ?
										<Alert variant="success" onClose={() => setAlertSuccessSenha(false)} dismissible>{i18n.t('success_senhaf')}</Alert>
									: ''}
									{alertErrorSenha ?
										<Alert variant="danger" onClose={() => setAlertErrorSenha(false)} dismissible> <strong>{i18n.t('atencao_td')}!</strong> {i18n.t('senha_valid')}</Alert>
									: ''}
									{alertErrorWallet ?
										<Alert variant="danger" onClose={() => setAlertErrorWallet(false)} dismissible> <strong>{i18n.t('atencao_td')}!</strong> {i18n.t('msg_btc')}</Alert>
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
												<Form.Label>{i18n.t('carteira_td')}</Form.Label>
												<Form.Control type="text" placeholder={i18n.t('carteira_td')} value={newCarteira} autoComplete="off" onBlur={e => validCarteira()} onChange={e => setNewCarteira(e.target.value)} />
											</Form.Group>
										</Col>
										<Col md="4">
											<Form.Group>
												<Form.Label>{i18n.t('cadastrar_td')}</Form.Label><br/>
												<Button variant="success" disabled={!seg | !newCarteira } onClick={() => doRegBtc()}>{i18n.t('cadastrar_td')}</Button>
											</Form.Group>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	)
}