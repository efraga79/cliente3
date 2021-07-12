import React, { useState } from 'react'
import axios from 'axios'

import { isAuthenticated } from './Auth'
import { Redirect, Link } from "react-router-dom"
import { Container, Row, Form, Col, Button, Card } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'

export default function Login () {
	document.title = `LOGIN | ${process.env.REACT_APP_NAME}`

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const doLogin = function () {
		let user = {
			username : username,
			password : password
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/login`, user).then(success => {
			if (success.data.status) {
				sessionStorage.setItem('token', success.data.dados.token)
				let local = window.location
				window.location = local
			} else {
				alert(i18n.t('erro_logar_msg'))
			}
		}).catch(error => {
			alert(i18n.t('erro_logar_msg'))
		})
	}

	return (
		<>
			{!isAuthenticated() ? 
				<div style={{minHeight:'87vh'}}>
					<Container>
						<Row className="d-flex justify-content-center">
							<Link to="/"><img src="/logos/logo.png" alt="Logo" className="img-fluid" /></Link>
						</Row>
						<Form>
							<Col lg={{span:4, offset:4}} md={{span:6, offset:3}}>
								<Card >
									<Row className="d-flex justify-content-center mb-3">
										<Col className="text-center">
											<h3 style={{textTransform: 'uppercase'}}>Login</h3>
										</Col>
									</Row>
									<Form.Group>
										<Form.Label>{i18n.t('usuario_td')}</Form.Label>
										<Form.Control size="lg" type="text" placeholder={i18n.t('log_usu')} autoComplete="off" onChange={e => setUsername(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('senha_td')}</Form.Label>
										<Form.Control size="lg" type="password" placeholder={i18n.t('senha_td')} autoComplete="off" onChange={e => setPassword(e.target.value)} />
									</Form.Group>
									<Form.Group className="d-flex justify-content-between">
										<Button variant="primary" onClick={e => doLogin()} >{i18n.t('enviar_td')}</Button>
										<Link to="/backoffice/register"><Button variant="success">{i18n.t('cadastrar_td')}</Button></Link>
									</Form.Group>
									<Form.Group>
										<Link to="/backoffice/forget">{i18n.t('esqueci_td')}</Link>
									</Form.Group>
								</Card>
							</Col>
						</Form>
					</Container>
				</div>
			: <Redirect to={{pathname:'/backoffice/bo'}} />}
		</>
	)
}