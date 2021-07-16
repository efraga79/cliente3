import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Row, Col, Table, Form, Badge } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { i18n } from '../../Components/Translates/i18n'

import Modals from '../../Components/SubComponents/Modals'

export default function Call() {
	document.title = `${i18n.t('chamado')} | ${process.env.REACT_APP_NAME}`
	const token = sessionStorage.getItem('token');

	const [chamado, setChamado] = useState([]);
	const [depart, setDepart] = useState();
	const [assunto, setAssunto] = useState('');
	const [desc, setDesc] = useState('');
	
	useEffect(() => {
		const getChamados = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/home/token/${token}`).then(success => {
				setChamado(success.data.chamado)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		getChamados()
	}, [token])

	const [modalShow, setModalShow] = useState(false);

	const openCall = () => {
		let call = {
			depart : depart,
			assunto : assunto,
			desc : desc
		}
		call = JSON.stringify(call)
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/openCall/token/${token}`,call).then(success => {
			setDepart('')
			setAssunto('')
			setDesc('')
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/home/token/${token}`).then(success => {
				setChamado(success.data.chamado)
				setModalShow(false)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}).catch(error => {
			console.log(error)
			sessionStorage.removeItem('token')
			let local = window.location
			window.location = local
		})
	}

	const ReadCall = (data) => {
		sessionStorage.setItem('idCall', data)
		window.location = '/backoffice/readcall'
	}

	return (
		<Container>
			<Row>
				<Col>
				<div className="p-2 card border-primary">
						<div className="mb-3 d-flex justify-content-between">
							<h4>{i18n.t('list_chamado')}</h4>
							<Button variant="primary" onClick={() => setModalShow(true)}><FaPlus /> {i18n.t('chamado')}</Button>
						</div>
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>{i18n.t('n_chamado')}</th>
									<th>{i18n.t('ass_chamado')}</th>
									<th>{i18n.t('data_td')}</th>
									<th>{i18n.t('status_td')}</th>
									<th>{i18n.t('abrir_td')}</th>
								</tr>
							</thead>
							<tbody>
								{chamado ? chamado.map((lista, index) => {
										return (
											<tr key={index}>
												<td>{lista.id}</td>
												<td>{lista.assunto}</td>
												<td>{lista.datahj}</td>
												<td>{lista.status === 1
													? <p><Badge variant="warning">{i18n.t('aberto')}</Badge></p>
													: lista.status === 2
													? <p><Badge variant="info">{i18n.t('respondido')}</Badge></p>
													: lista.status === 3 
													? <p><Badge variant="success">{i18n.t('respondido')}</Badge></p>
													: ''}</td>
												<td><Button variant="primary" onClick={e => ReadCall(lista.id)}>{i18n.t('abrir_td')}</Button></td>
											</tr>
										)
									}) :<tr><td colSpan="6"></td></tr>
								}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
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
		</Container>
	)
}