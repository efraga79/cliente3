import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { i18n } from '../../Components/Translates/i18n'
import { Container, Col, Row, Table } from 'react-bootstrap';

export default function Extract() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	const token = sessionStorage.getItem('token');
	
	const [extrato, setExtrato] = useState([])
	const [cred, setCred] = useState(0)
	const [deb, setDeb] = useState(0)
	const [total, setTotal] = useState(0)
	
	useEffect(() => {
		const getExtrato = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/ContaCorrente/extrato_ajax/token/${token}`).then(success => {
				setExtrato(success.data.dados)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
	
			document.title = `${i18n.t('extrato_td')} | ${process.env.REACT_APP_NAME}`
		}
		
		getExtrato()
	}, [token])

	useEffect(() => {
		const totais = () => {
			let credito = parseFloat(0)
			let debito = parseFloat(0)
			
			extrato.forEach(item => {
				return (
					<>
						{parseFloat(item.credito) > 0 ? credito += parseFloat(item.credito) : credito}
						{parseFloat(item.debito) > 0 ? debito += parseFloat(item.debito) : debito}
					</>
				)
			})
			setCred(credito)
			setDeb(debito)
			setTotal(parseFloat(credito) - parseFloat(debito))
		}
		totais()
	}, [extrato])
	
	return (
		<Container>
			<Row>
				<Col xl="12">
					<div className="card border-primary p-2">
						<h4>{i18n.t('extrato_td')}</h4>
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>{i18n.t('usuario_td')}</th>
									<th>{i18n.t('data_td')}</th>
									<th>{i18n.t('desc_td')}</th>
									<th>{i18n.t('cred_td')}</th>
									<th>{i18n.t('deb_td')}</th>
									<th>{i18n.t('total_td')}</th>
								</tr>
							</thead>
							<tbody>
								{extrato ? extrato.map((lista, index) => {
										return (
											<tr key={index}>
												<td>{lista.usu_usuario}</td>
												<td>{lista.data}</td>
												<td>{i18n.t(lista.tmv_descricao)}</td>
												<td style={{color: 'green'}}>{lista.credito?lista.credito:''}</td>
												<td style={{color: 'red'}}>{lista.debito?lista.debito:''}</td>
												<td></td>
											</tr>
										)
									}) :<tr><td colSpan="6"></td></tr>
								}
								<tr>
									<td colSpan="3"></td>
									<td style={{color: 'green'}}><strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cred)}</strong></td>
									<td style={{color: 'red'}}><strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(deb)}</strong></td>
									<td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		</Container>
	)
}