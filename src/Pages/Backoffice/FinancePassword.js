import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function FinancePassword() {
	document.title = `${i18n.t('senha_td')} ${i18n.t('financeiro_td')} | ${process.env.REACT_APP_NAME}`
	window.scrollTo(0, 0)
	const token = sessionStorage.getItem('token');

	const [updateAlertShow, setUpdateAlertShow] = useState(false);
	const [erroAlertShow, setErroAlertShow] = useState(false);

	const doSendToken = function () {
		axios.get(`${process.env.REACT_APP_URL_API}/Usuario/doSendToken/token/${token}`).then(success => {
			if (success.data.status) {
				setUpdateAlertShow(true)
				setErroAlertShow(false)
			} else {
				setUpdateAlertShow(false)
				setErroAlertShow(true)
			}
		}).catch(error => {
			setUpdateAlertShow(false)
			setErroAlertShow(true)
		})
	}
	
	return (
		<Container>
			<Row>
				<Col>
					<div className="card border-primary p-2">
						<Row>
							<Col>
								<h4 className="section-title">{ i18n.t('alterar_td')} { i18n.t('senha_td')} { i18n.t('de_td')} { i18n.t('financeiro_td')}</h4>
								{updateAlertShow ? 
									<Alert variant="success" onClose={() => setUpdateAlertShow(false)} dismissible>
										<strong>{i18n.t('parabens_td')}!</strong> {i18n.t('senha_td')} {i18n.t('update_td')} {i18n.t('visualizar_td')} {i18n.t('email_td')}.
									</Alert> 
								: ''}
								{erroAlertShow ? 
									<Alert variant="danger" onClose={() => setErroAlertShow(false)} dismissible>
										<strong>{i18n.t('erro_td')}!</strong> {i18n.t('update_td')} {i18n.t('senha_td')}.
									</Alert> 
								: ''}
							</Col>
						</Row>
						<Row className="mt-3">
							<Col>
								<Button variant="primary" size="lg" block onClick={e => doSendToken()} >{i18n.t('senha_f')}</Button>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	)
}