import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Col, Row, Table } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'

export default function Profile() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	const token = sessionStorage.getItem('token');
	
	const [pessoais, setPessoais] = useState([])
	
	useEffect(() => {
		const getPessoais = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/MeusDados/dadospessoais_ajax/token/${token}`).then(success => {
				setPessoais(success.data.dados)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			document.title = `${i18n.t('pessoais_td')} | ${process.env.REACT_APP_NAME}`
		}
		getPessoais()
	}, [token]);
	
	const noMsgDropdown = () => {
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.remove('d-lg-block')
	}

	return (
		<Container>
			<Row onClick={() => noMsgDropdown()}>
				<Col xl="12">
					<div className="card border-primary p-2">
						<h4>{i18n.t('dados_td')} {i18n.t('pessoais_td')}</h4>
						<Table responsive hover striped bordered >
							<tbody>
								<tr>
									<th>{i18n.t('nome_td')}</th>
									<td>{pessoais.usu_nome}</td>
								</tr>
								<tr>
									<th>{i18n.t('usuario_td')}</th>
									<td>{pessoais.usu_usuario}</td>
								</tr>
								<tr>
									<th>{i18n.t('email_td')}</th>
									<td>{pessoais.usu_email}</td>
								</tr>
								<tr>
									<th>Whatsapp</th>
									<td>{pessoais.usu_zap}</td>
								</tr>
							</tbody>	
						</Table>
					</div>
				</Col>
			</Row>
		</Container>
	)
}