import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Col, Row, Table, Badge } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function Directs() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	const token = sessionStorage.getItem('token');
	
	const [diretos, setDiretos] = useState([])

	useEffect(() => {
		const getDirects = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/Indicados/meusIndicados/token/${token}`).then(success => {
				setDiretos(success.data.res)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			document.title = `${i18n.t('direto_td')} | ${process.env.REACT_APP_NAME}`
		}
		getDirects()
	}, [token]);
	
	return (
		<Container>
			<Row>
				<Col xl="12">
					<div className="p-2 card border-primary">
						<h4>{i18n.t('direto_td')}</h4>
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>{i18n.t('nome_td')}</th>
									<th>{i18n.t('usuario_td')}</th>
									<th>{i18n.t('plano_td')}</th>
									<th>{i18n.t('perna_td')}</th>
									<th>{i18n.t('tipo_td')}</th>
									<th>{i18n.t('email_td')}</th>
									<th>WhatsApp</th>
									<th>{i18n.t('data_td')}</th>
									<th>{i18n.t('status_td')}</th>
								</tr>
							</thead>
							<tbody>
								{diretos?
									diretos.map((lista, index) => {
										return (
											<tr key={index}>
												<td>{lista.usu_nome}</td>
												<td>{lista.usu_usuario}</td>
												<td>{lista.bn_nome}</td>
												<td>{i18n.t(lista.perna)}</td>
												<td>{i18n.t(lista.tipo)}</td>
												<td>{lista.usu_email}</td>
												<td><a target="_blank" href={`https://web.whatsapp.com/send?phone=${lista.usu_ddi}${lista.usu_zap}`} rel="noreferrer noopener">{lista.usu_ddi} {lista.usu_zap}</a></td>
												<td>{new Intl.DateTimeFormat('pt-BR').format(new Date(lista.data))}</td>
												<td>
													{lista.fk_status === 2
													?<h5><Badge variant="success">{i18n.t('ativo_td')}</Badge></h5>
													:<h5><Badge variant="danger">{i18n.t('pendente_td')}</Badge></h5>
													}
												</td>
											</tr>
										)
									})
								:''}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		</Container>
	)
}