import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Button, Alert, Media } from 'react-bootstrap';
import { i18n } from '../../Components/Translates/i18n'

export default function Call() {
	document.title = `${i18n.t('ass_chamado')} | ${process.env.REACT_APP_NAME}`
	const token = sessionStorage.getItem('token');
	const idCall = sessionStorage.getItem('idCall');

	const [ler, setLer] = useState([]);
	const [foto, setFoto] = useState();
	const [txtAssunto, setTxtAssunto] = useState('');
	const [txtData, setTxtData] = useState('');

	const [mensagem, setMensagem] = useState('');
	
	const [msgAlertShow, setMsgAlertShow] = useState(false)
	const [erroMsgAlertShow, setErroMsgAlertShow] = useState(false)
	
	useEffect(() => {
		const lerChamado = props => {
			axios.post(`${process.env.REACT_APP_URL_API}/Bo/readCalled2/token/${token}`,idCall).then(success => {
				setLer(success.data.ler)
				setFoto(success.data.foto)
				setTxtAssunto(success.data.chamado[0].assunto)
				setTxtData(success.data.chamado[0].datahj)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		lerChamado()
	}, [idCall, token])

	const enviarResposta = () => {
		let response = {
			mensagem : mensagem,
			id : idCall
		}
		response = JSON.stringify(response)
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/enviar_resposta/token/${token}`,response).then(success => {
			if (success.data.status) {
				setMensagem('')
				setMsgAlertShow(true)
				setErroMsgAlertShow(false)
				axios.post(`${process.env.REACT_APP_URL_API}/Bo/readCalled2/token/${token}`,idCall).then(success => {
					setLer(success.data.ler)
					setFoto(success.data.foto)
					setTxtAssunto(success.data.chamado[0].assunto)
					setTxtData(success.data.chamado[0].datahj)
				}).catch(error => {
					console.log(error)
					sessionStorage.removeItem('token')
					let local = window.location
					window.location = local
				})
			} else {
				setMsgAlertShow(false)
				setErroMsgAlertShow(true)
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
					<h4>
						{i18n.t('ass_chamado')} - {txtAssunto}
						<span style={{float:'right'}}>{txtData} </span>
					</h4>
					<Form.Group>
						<Form.Label>{i18n.t('res_data')}</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder={i18n.t('res_data')} onChange={e => setMensagem(e.target.value)} value={mensagem} />
					</Form.Group>
					<Button variant="primary" onClick={e => enviarResposta()}>{i18n.t('repod')}</Button>
					{msgAlertShow ? 
						<Alert variant="success" onClose={() => setMsgAlertShow(false)} dismissible>
							<strong>{i18n.t('titulo_sucesso')}!</strong> {i18n.t('succ_chamado')}.
						</Alert> 
					: ''}
					{erroMsgAlertShow ? 
						<Alert variant="danger" onClose={() => setErroMsgAlertShow(false)} dismissible>
							<strong>{i18n.t('titulo_msg')}!</strong> {i18n.t('err_chamado')}.
						</Alert> 
					: ''}
					
					{ler ? ler.map((lista, index) => {
						return (
							<div className={`card border-primary ${!lista.fk_adm ? 'ml-auto' : ''} m-2 p-2 col-md-8`} key={index}>
								<Media>
									{lista.fk_adm
										? <img src="/logos/logo.png" className="mr-2 align-self-center" width={50} height={50} alt="logo"/>
										: <img src={`/fotos/${foto}`} className="mr-2 align-self-center" width={50} height={50} alt={foto}/>
									}
									
									<Media.Body>
										<h5>{i18n.t('data_td')}: {lista.datahj}</h5>
										<p style={{whiteSpace:'pre-line'}}>{lista.mensagem}</p>
									</Media.Body>
								</Media>
							</div>
						)
					})
					:''}
				</div>
				</Col>
			</Row>
		</Container>
	)
}