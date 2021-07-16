import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function Password() {
	document.title = `${i18n.t('senha_td')} ${i18n.t('de_td')} ${i18n.t('acesso_td')} | ${process.env.REACT_APP_NAME}`
	const token = sessionStorage.getItem('token');

	const [updateAlertShow, setUpdateAlertShow] = useState(false);
	const [erroAlertShow, setErroAlertShow] = useState(false);

	const [antiga, setAntiga] = useState('');
	const [nova, setNova] = useState('');
	const [confNova, setConfNova] = useState('');

	const doPassword = function () {
		if(nova === confNova){
			let user = {
				antiga : antiga,
				nova : nova,
				conf_nova : confNova
			}
			user = JSON.stringify(user)
			axios.post(`${process.env.REACT_APP_URL_API}/MeusDados/alterarsenha_ajax/token/${token}`, user).then(success => {
				if (success.data.status) {
					setAntiga('')
					setNova('')
					setConfNova('')

					setUpdateAlertShow(true)
					setErroAlertShow(false)
				} else if (success.data.response === 'deslogado'){
					sessionStorage.removeItem('token')
					let local = window.location
					window.location = local
				} else {
					setUpdateAlertShow(false)
					setErroAlertShow(true)
				}
			}).catch(error => {
				setUpdateAlertShow(false)
				setErroAlertShow(true)
			})
		} else {
			setUpdateAlertShow(false)
			setErroAlertShow(true)
		}
	}

	return (
		<Container>
			<Row>
				<Col>
					<div className="card border-primary p-2">
						<Row>
							<Col>
								<h4 className="section-title">{ i18n.t('senha_up')}</h4>
								{updateAlertShow ? 
									<Alert variant="success" onClose={() => setUpdateAlertShow(false)} dismissible>
										<strong>{i18n.t('parabens_td')}!</strong> {i18n.t('senha_td')} {i18n.t('update_td')} {i18n.t('sucesso_td')}.
									</Alert> 
								: ''}
								{erroAlertShow ? 
									<Alert variant="danger" onClose={() => setErroAlertShow(false)} dismissible>
										<strong>{i18n.t('erro_td')}!</strong> {i18n.t('update_td')} {i18n.t('senha_td')}.
									</Alert> 
								: ''}
							</Col>
						</Row>
						<Form>
							<Col md="4">
								<Form.Group>
									<Form.Label>{i18n.t('senha_td')} {i18n.t('atual_td')}</Form.Label>
									<Form.Control size="lg" type="password" placeholder={`${i18n.t('senha_td')} ${i18n.t('atual_td')}`} autoComplete="off" value={antiga} onChange={e => setAntiga(e.target.value)} />
								</Form.Group>
							</Col>
							<Col md="4">
								<Form.Group>
									<Form.Label>{i18n.t('senha_td')} {i18n.t('nova_td')}</Form.Label>
									<Form.Control size="lg" type="password" placeholder={`${i18n.t('senha_td')} ${i18n.t('nova_td')}`} autoComplete="off" value={nova} onChange={e => setNova(e.target.value)} />
								</Form.Group>
							</Col>
							<Col md="4">
								<Form.Group>
									<Form.Label>{i18n.t('reescreva_td')} {i18n.t('senha_td')} {i18n.t('nova_td')}</Form.Label>
									<Form.Control size="lg" type="password" placeholder={`${i18n.t('reescreva_td')} ${i18n.t('senha_td')} ${i18n.t('nova_td')}`} autoComplete="off" value={confNova} onChange={e => setConfNova(e.target.value)} />
								</Form.Group>
							</Col>
							<Col>
								<Button variant="primary" onClick={e => doPassword()} >{i18n.t('alterar_td')} {i18n.t('senha_td')}</Button>
							</Col>
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	)
}