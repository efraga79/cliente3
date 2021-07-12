import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { i18n } from './Translates/i18n';
import Modals from '../Components/SubComponents/Modals'

export default function Footer(){
	const token = sessionStorage.getItem('token');
	const [depart, setDepart] = useState();
	const [assunto, setAssunto] = useState('');
	const [desc, setDesc] = useState('');

	const [modalShow, setModalShow] = useState(false);
	
	const openCall = () => {
		let call = {
			depart : depart,
			assunto : assunto,
			desc : desc
		}
		call = JSON.stringify(call)
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/openCall/token/${token}`,call).then(success => {
			setAssunto('')
			setDesc('')
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/home/token/${token}`).then(success => {
				window.location = "/backoffice/call"
			}).catch(error => {
				console.log(error)
			})
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	return(
		<>
			<footer className="d-none d-lg-block">
				<div className="footer-area reveal-footer">
					<div className="container-fluid">
						<div className="row">
							<div className="col-12">
								<div className="footer-wrapper">
									<div className="mb-0 text-center card card-small active-profile-wrapper">
										{new Date().getFullYear()}. All right reserved {process.env.REACT_APP_NAME}
									</div>
									<div className="footer-card position-relative">
										<div className="live-chat-inner">
											<div className="chat-text-field">
												<Form.Control type="text" className="live-chat-field" placeholder={i18n.t('chamado')} onChange={e => setAssunto(e.target.value)} value={assunto}/>
												<Button className="chat-message-send" onClick={() => setModalShow(true)}>
													<img src="/assets/icons/plane.png" alt={i18n.t('chamado')}/>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<Modals
				size="lg"
				title={i18n.t('chamado')}
				contentClassName="bg-light"
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Row>
					<Col>
						<Form>
							<Form.Group>
								<Form.Control as="select" value={depart} custom onChange={e => setDepart(e.target.value)}>
									<option>-- {i18n.t('depart')} --</option>
									<option value="1">{i18n.t('support')}</option>
									<option value="2">{i18n.t('finan')}</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Control type="text" placeholder={i18n.t('ass_chamado')} onChange={e => setAssunto(e.target.value)} value={assunto}/>
							</Form.Group>
							<Form.Group>
								<Form.Control as="textarea" rows={3} placeholder={i18n.t('desc_td')} onChange={e => setDesc(e.target.value)} value={desc} />
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Button variant="primary" size="lg" block onClick={() => openCall()}>{i18n.t('chamado')}</Button>
			</Modals>
		</>
	)
}