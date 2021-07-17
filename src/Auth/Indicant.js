import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useParams } from "react-router-dom"
import { Alert, Container, Form, Col, Button, InputGroup, Row, Card } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'
import { FaSearch } from 'react-icons/fa'

export default function Indicant (props) {
	useEffect(() => {
		document.title = `${i18n.t('indicante_td')} | ${process.env.REACT_APP_NAME}`
		let token = sessionStorage.getItem('token')
		const sair = () => {
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		}
		if(token){
			sair()
		}
	}, []);
	
	let { id } = useParams();
	const [username, setUsername] = useState(id)
	const [alertError, setAlertError] = useState(false)
	
	const doSearch = () => {
		axios.get(`${process.env.REACT_APP_URL_API}/Bo/valid_user/user/${username}`).then(success => {
			if(success.data.retorno === 'sim'){
				setAlertError(false)
				sessionStorage.setItem('indicant', success.data.dados)
				window.location = "/backoffice/register"
			} else {
				sessionStorage.removeItem('indicant')
				setAlertError(true)
			}
		}).catch(error => {
			console.log(error)
		})
	}
	
	return (
		<>
			<div style={{minHeight:'87vh'}}>
				<Container fluid>
					<Row className="d-flex justify-content-center p-3">
						<Link to="/"><img src="/logos/logo.png" style={{maxHeight: '150px'}} alt="Logo" className="img-fluid" /></Link>
					</Row>
					<Row>
						<Col lg={{span:6, offset:3}} md={{span:6, offset:3}}>
							<Card>
								<Row className="d-flex justify-content-center my-3">
									<Col className="text-center">
										<h2 style={{textTransform: 'uppercase'}}>{i18n.t('indicante_td')}</h2>
										<p>{i18n.t('ser_investidor')}</p>
										<h4 className="mt-3">{i18n.t('escreva_indicante')}</h4>
									</Col>
								</Row>
								{alertError ?
									<Alert variant="danger" onClose={() => setAlertError(false)} dismissible> <strong>{i18n.t('atencao_td')}!</strong> {i18n.t('erro_user_msg')}</Alert>
								: ''}
								<InputGroup>
									<Form.Control size="lg" type="text" placeholder={i18n.t('patrocinador_td')} value={username} autoComplete="off" onChange={e => setUsername(e.target.value)} />
									<InputGroup.Append>
										<Button variant="primary" onClick={e => doSearch()}><FaSearch /> {i18n.t('buscar_td')}</Button>
									</InputGroup.Append>
								</InputGroup>
								<Link to="/backoffice/login" className="my-3 mx-auto">{i18n.t('cadastrado_td')}</Link>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	)
}