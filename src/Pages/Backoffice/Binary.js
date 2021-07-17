import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Col, Image, Row, Table } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'
import bin from './css/binario.module.css'

export default function Binary() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	const token = sessionStorage.getItem('token');
	
	const [nodes, setNodes] = useState([])
	const [binarios, setBinarios] = useState([])
	const [pernaEsquerda, setPernaEsquerda] = useState()
	const [pernaDireita, setPernaDireita] = useState()
	
	useEffect(() => {
		const getBinarios = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/Rede/binario_ajax/token/${token}`).then(success => {
				setNodes(success.data.dados)
				setBinarios(success.data.binario)
				setPernaEsquerda(success.data.total.e)
				setPernaDireita(success.data.total.d)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			document.title = `${i18n.t('binario_td')} | ${process.env.REACT_APP_NAME}`
		}
		getBinarios()
	}, [token]);

	const novoUser = data => {
		let user = {
			username : data
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Rede/binario_ajax/token/${token}`, user).then(success => {
			if(success.data.status){
				setNodes(success.data.dados)
			}
		})
	}

	return (
		<Container>
			<Row>
				<Col xl="12">
					<div className="card border-primary p-2">
						<h4>{i18n.t('binario_td')}</h4>
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>{i18n.t('data_b')}</th>
									<th>{i18n.t('total_ee')}</th>
									<th>{i18n.t('total_dd')}</th>
									<th>{i18n.t('limit_b')}</th>
								</tr>
							</thead>
							<tbody>
								{binarios?
									binarios.map((lista, index) => {
										return (
											<tr key={index}>
												<td>{new Intl.DateTimeFormat('pt-BR').format(new Date(lista.bi_data))}</td>
												<td>{lista.bi_perna_e}</td>
												<td>{lista.bi_perna_d}</td>
												<td>{lista.bi_limit}</td>
											</tr>
										)
									})
								:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
								<tr>
									<td colSpan="4"></td>
								</tr>
								<tr>
									<th colSpan="4" className="text-center">
										<Button variant="primary" className="mb-md-0 mb-3">
											{i18n.t('total_e')} <span className="badge badge-light">{pernaEsquerda}</span>
										</Button>
										<Button variant="warning" className="mb-md-0 mb-3">
											{i18n.t('total_d')} <span className="badge badge-light">{pernaDireita}</span>
										</Button>
									</th>
								</tr>
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				<div className={bin.tree2} style={{width: 'fit-content'}}>
					<ul>
						<li>
							{nodes[0] ?
							<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0].uprede)}>
								<Image src={`/img/${nodes[0].fk_bonus}.png`} />
								<br/>{nodes[0].usu_usuario}
								<span className={bin.tooltiptext}>
									User: {nodes[0].usu_usuario}<br/>
									Sponsor: {nodes[0].upline}<br/>
									Directs: {nodes[0].d_diretos}<br/>
									Points E: {nodes[0].d_equipe_e}<br/>
									Points D: {nodes[0].d_equipe_d}<br/>
									Active: {nodes[0].ativo}<br/>
								</span>
							</Button>
							:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
							<ul>
								<li>
									{nodes[0]?nodes[0]['children']?nodes[0]['children']['e']?
									<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['e'].usu_usuario)}>
										<Image src={`/img/${nodes[0]['children']['e'].fk_bonus}.png`} />
										<br/>
										{nodes[0]['children']['e'].usu_usuario}
										<span className={bin.tooltiptext}>
											User: {nodes[0]['children']['e'].usu_usuario}<br/>
											Sponsor: {nodes[0]['children']['e'].upline}<br/>
											Directs: {nodes[0]['children']['e'].d_diretos}<br/>
											Points E: {nodes[0]['children']['e'].d_equipe_e}<br/>
											Points D: {nodes[0]['children']['e'].d_equipe_d}<br/>
											Active: {nodes[0]['children']['e'].ativo}
										</span>
									</Button>
									:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
									<ul>
										<li>
											{nodes[0]?nodes[0]['children']?nodes[0]['children']['e']?nodes[0]['children']['e']['children']?nodes[0]['children']['e']['children']['e']?
											<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['e']['children']['e'].usu_usuario)}>
												<Image src={`/img/${nodes[0]['children']['e']['children']['e'].fk_bonus}.png`} />
												<br/>
												{nodes[0]['children']['e']['children']['e'].usu_usuario}
												<span className={bin.tooltiptext}>
													User:
													{nodes[0]['children']['e']['children']['e'].usu_usuario}<br/>
													Sponsor:
													{nodes[0]['children']['e']['children']['e'].upline}<br/>
													Directs:
													{nodes[0]['children']['e']['children']['e'].d_diretos}<br/>
													Points E:
													{nodes[0]['children']['e']['children']['e'].d_equipe_e}<br/>
													Points D:
													{nodes[0]['children']['e']['children']['e'].d_equipe_d}<br/>
													Active: {nodes[0]['children']['e']['children']['e'].ativo}
												</span>
											</Button>
											:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
										</li>
										<li>
											{nodes[0]?nodes[0]['children']?nodes[0]['children']['e']?nodes[0]['children']['e']['children']?nodes[0]['children']['e']['children']['d']?
											<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['e']['children']['d'].usu_usuario)}>
												<Image src={`/img/${nodes[0]['children']['e']['children']['d'].fk_bonus}.png`} />
												<br/>
												{nodes[0]['children']['e']['children']['d'].usu_usuario}
												<span className={bin.tooltiptext}>
													User:
													{nodes[0]['children']['e']['children']['d'].usu_usuario}<br/>
													Sponsor:
													{nodes[0]['children']['e']['children']['d'].upline}<br/>
													Directs:
													{nodes[0]['children']['e']['children']['d'].d_diredos}<br/>
													Points E:
													{nodes[0]['children']['e']['children']['d'].d_equipe_e}<br/>
													Points D:
													{nodes[0]['children']['e']['children']['d'].d_equipe_d}<br/>
													Active: {nodes[0]['children']['e']['children']['d'].ativo}
												</span>
											</Button>
											:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
										</li>
									</ul>
								</li>
								<li>
									{nodes[0]?nodes[0]['children']?nodes[0]['children']['d']?
									<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['d'].usu_usuario)}>
										<Image src={`/img/${nodes[0]['children']['d'].fk_bonus}.png`} />
										<br/>
										{nodes[0]['children']['d'].usu_usuario}
										<span className={bin.tooltiptext}>
											User: {nodes[0]['children']['d'].usu_nome}<br/>
											Sponsor: {nodes[0]['children']['d'].upline}<br/>
											Directs: {nodes[0]['children']['d'].d_diretos}<br/>
											Points E: {nodes[0]['children']['d'].d_equipe_e}<br/>
											Points D: {nodes[0]['children']['d'].d_equipe_d}<br/>
											Active: {nodes[0]['children']['d'].ativo}
										</span>
									</Button>
									:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
									<ul>
										<li>
											{nodes[0]?nodes[0]['children']?nodes[0]['children']['d']?nodes[0]['children']['d']['children']?nodes[0]['children']['d']['children']['e']?
											<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['d']['children']['e'].usu_usuario)}>
												<Image src={`/img/${nodes[0]['children']['d']['children']['e'].fk_bonus}.png`} />
												<br/>
												{nodes[0]['children']['d']['children']['e'].usu_usuario}
												<span className={bin.tooltiptext}>
													User:
													{nodes[0]['children']['d']['children']['e'].usu_usuario}<br/>
													Sponsor:
													{nodes[0]['children']['d']['children']['e'].upline}<br/>
													Directs:
													{nodes[0]['children']['d']['children']['e'].d_diretos}<br/>
													Points E:
													{nodes[0]['children']['d']['children']['e'].d_equipe_e}<br/>
													Points D:
													{nodes[0]['children']['d']['children']['e'].d_equipe_d}<br/>
													Active: {nodes[0]['children']['d']['children']['e'].ativo}
												</span>
											</Button>
											:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
										</li>
										<li>
										{nodes[0]?nodes[0]['children']?nodes[0]['children']['d']?nodes[0]['children']['d']['children']?nodes[0]['children']['d']['children']['d']?
											<Button variant="link" style={{width: '110px', height: '110px'}} onClick={e => novoUser(nodes[0]['children']['d']['children']['d'].usu_usuario)}>
												<Image src={`/img/${nodes[0]['children']['d']['children']['d'].fk_bonus}.png`}/>
												<br/>
												{nodes[0]['children']['d']['children']['d'].usu_usuario}

												<span className={bin.tooltiptext}>
													User:
													{nodes[0]['children']['d']['children']['d'].usu_nome}<br/>
													Sponsor:
													{nodes[0]['children']['d']['children']['d'].upline}<br/>
													Directs:
													{nodes[0]['children']['d']['children']['d'].d_diretos}<br/>
													Points E:
													{nodes[0]['children']['d']['children']['d'].d_equipe_e}<br/>
													Points D:
													{nodes[0]['children']['d']['children']['d'].d_equipe_d}<br/>
													Active: {nodes[0]['children']['d']['children']['d'].ativo}
												</span>
											</Button>
											:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link text-white"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</Row>
		</Container>
	)
}