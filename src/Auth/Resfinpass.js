import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useParams } from "react-router-dom"
import { Alert, Container, Form, Col, Row, Card, Badge, Button } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'

export default function Resfinpass (props) {
	let { email, token } = useParams();
	const [senha, setSenha] = useState('')
	const [confSenha, setConfSenha] = useState('')
	const [fkId, setFkId] = useState('')
	const [erroMsg, setErroMsg] = useState('')

	const [tokenValid, setTokenValid] = useState(false)

	const [erroSenha, setErroSenha] = useState(false)
	
	useEffect(() => {
		document.title = `${i18n.t('alterar_td')} ${i18n.t('senha_td')} ${i18n.t('de_td')} ${i18n.t('financeiro_td')} | ${process.env.REACT_APP_NAME}`
		
		const doSearch = () => {
			let senhaf = { email, token, senha, confSenha }
			senhaf = JSON.stringify(senhaf)
			axios.post(`${process.env.REACT_APP_URL_API}/Usuario/validTokenSenha/`,senhaf).then(success => {
				console.log(success.data)
				if(success.data.status){
					setTokenValid(true)
					setFkId(success.data.fkId)
				} else {
					setTokenValid(false)
					setErroMsg(success.data.error_msg)
				}
			}).catch(error => {
				console.log(error)
			})
		}
		doSearch()
	}, [confSenha, email, senha, token]);

	const validSenha = () => {
		if (confSenha !== senha){
			setConfSenha('')
			setErroSenha(true)
		} else {
			setErroSenha(false)
		}
	}

	const resetSenha = () => {
		let senhaf = { email, token, senha, confSenha, fkId }
		senhaf = JSON.stringify(senhaf)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/alterFinancialPassword/`, senhaf).then(success => {
			console.log(success.data)
			if(success.data.status){
				alert('FINANCIAL PASSWORD UPDATED SUCCESSFULLY');
				window.location = "/backoffice/login"
			}
		}).catch(error => {
			console.log(error)
		})
	}
	
	return (
		<>
			<div style={{minHeight:'87vh'}}>
				<Container fluid>
					<Row className="d-flex justify-content-center">
						<Link to="/"><img src="/logos/logo.png" alt="Logo" className="img-fluid" /></Link>
					</Row>
					<Row>
						<Col lg={{span:6, offset:3}} md={{span:6, offset:3}}>
							<Card>
								<Row className="d-flex justify-content-center mb-5">
									<Col className="text-center">
										<h2 style={{textTransform: 'uppercase'}}>{`${i18n.t('alterar_td')} ${i18n.t('senha_td')} ${i18n.t('de_td')} ${i18n.t('financeiro_td')}`}</h2>
									</Col>
								</Row>
								{tokenValid ?
									<>
										<Form.Group>
											<Form.Label>{i18n.t('senha_td')}</Form.Label>
											<Form.Control size="lg" type="password" placeholder={i18n.t('senha_td')} autoComplete="off" onChange={e => setSenha(e.target.value)} />
										</Form.Group>
										<Form.Group>
											<Form.Label>{i18n.t('confirmar_td')} {i18n.t('senha_td')}</Form.Label>
											{erroSenha? <Badge variant="danger">{i18n.t('senha_nao_confere')}</Badge> : ''}
											<Form.Control size="lg" type="password" placeholder={`${i18n.t('confirmar_td')}  ${i18n.t('senha_td')}`} autoComplete="off" value={confSenha} onBlur={() => validSenha()} onChange={e => setConfSenha(e.target.value)} />
										</Form.Group>
										<Button variant="primary" disabled={ !senha | !confSenha } onClick={() => resetSenha()} > Reset </Button>
									</>
								:<Alert variant="danger">{erroMsg}</Alert>}
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	)
}