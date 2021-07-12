import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, Container, Row, Form, Col, Button, Alert } from 'react-bootstrap'
import { isAuthenticated } from './Auth'
import { i18n } from '../Components/Translates/i18n'
import axios from 'axios'

export default function Forget() {
	document.title = `${i18n.t('esqueci_td')} | ${process.env.REACT_APP_NAME}`

	const [email, setEmail] = useState('')
	const [usuario, setUsuario] = useState('')
	const [alertSuccess, setAlertSuccess] = useState(false)
	const [alertError, setAlertError] = useState(false)

	const doForget = () => {
		axios.get(`${process.env.REACT_APP_URL_API}/Usuario/esqueceu_acesso/email/${email}/usuario/${usuario}`).then(success => {
			if(success.data.status){
				setAlertSuccess(true)
				setAlertError(false)
				setEmail('')
				setUsuario('')
			} else {
				console.log(success.data)
				setAlertSuccess(false)
				setAlertError(true)
			}
		}).catch(error => {
			console.log(error)
			setAlertSuccess(false)
			setAlertError(true)
		})
	}
	
	return (
		<>
			{!isAuthenticated() ? 
				<div style={{minHeight:'87vh'}}>
					<Container>
						<Row className="d-flex justify-content-center">
							<Link to="/"><img src="/logos/logodark.png" alt="Logo" className="img-fluid" /></Link>
						</Row>
						<Form>
							<Col lg={{span:4, offset:4}} md={{span:6, offset:3}}>
								<Card>
									<Row className="d-flex justify-content-center mb-3">
										<Col className="text-center">
											<h3 style={{textTransform: 'uppercase'}}>{i18n.t('esqueci_td')}</h3>
										</Col>
									</Row>
									{alertSuccess? <Alert variant="success">{i18n.t('esqueci_td_success')}</Alert> : ''}
									{alertError? <Alert variant="danger">{i18n.t('erro_td')}</Alert> : ''}
									<Form.Group>
										<Form.Label>{i18n.t('email_td')}</Form.Label>
										<Form.Control size="lg" type="email" placeholder={i18n.t('email_td')} autoComplete="off" onChange={e => setEmail(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('usuario_td')}</Form.Label>
										<Form.Control size="lg" type="text" placeholder={i18n.t('usuario_td')} autoComplete="off" onChange={e => setUsuario(e.target.value)} />
									</Form.Group>
									<Button variant="primary" onClick={e => doForget()} >
										{i18n.t('senha_up')}
									</Button>
									<Form.Group>
										<Link to="/backoffice/login">{i18n.t('cadastrado_td')}</Link>
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