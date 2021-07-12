import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import bin from './css/binario.module.css'

import { Chart } from "react-google-charts";

import { Alert, Row, Col, Button, Form, Image } from 'react-bootstrap';
import Modals from '../../Components/SubComponents/Modals'
import MapLeaflet from '../../Components/SubComponents/Leaflet'
import * as Fa from 'react-icons/fa'
import NumberFormat from 'react-number-format';

import CardStatus from '../../Components/SubComponents/CardStatus'

import { i18n } from '../../Components/Translates/i18n'

export default function Bo() {
	const token = sessionStorage.getItem('token');
	
	const [usuarioy, setUsuarioy] = useState([]);
	const [pais, setPais] = useState([]);
	const [totaisPorPais, setTotaisPorPais] = useState([]);
	const [linkDeCadastro, setLinkDeCadastro] = useState('');
	const [dados, setDados] = useState([]);
	const [usuariox, setUsuariox] = useState([]);
	const [money, setMoney] = useState([]);
	const [totalUsu, setTotalUsu] = useState('');
	const [latlng, setLatlng] = useState([]);
	const [bloqueio, setBloqueio] = useState('');
	const [planAlterar, setPlanAlterar] = useState([])
	const [selectPlan, setSelectPlan] = useState('')
	const [renew, setRenew] = useState(false)
	const [ativaAlterarPlano, setAtivaAlterarPlano] = useState(false)
	const [cotas, setCotas] = useState([])
	const [alertoitenta, setAlertoitenta] = useState(false)
	const [nextCareer, setNextCareer] = useState([])
	const [upgradeAlertShow, setUpgradeAlertShow] = useState(false);
	const [noUpgradeAlertShow, setNoUpgradeAlertShow] = useState(false);
	const [listPlanos, setListPlanos] = useState([])
	const [selectUpgradePlan, setSelectUpgradePlan] = useState('')
	const [legCheck, setLegCheck] = useState('e')
	const [pernaAlertShow, setPernaAlertShow] = useState(false)
	const [dataPag, setDataPag] = useState('')
	
	const [pieOptions, setPieOptions] = useState({})
	const [pieData, setPieData] = useState([])

	const [donutOptions, setDonutOptions] = useState({})
	const [donutData, setDonutData] = useState([])

	const [nodes, setNodes] = useState([])
	const [pernaEsquerda, setPernaEsquerda] = useState()
	const [pernaDireita, setPernaDireita] = useState()

	const [files, setFiles] = useState([])
	
	useEffect(() => {
		const getHome = () => {
			document.title = `${i18n.t('principal_td')} | ${process.env.REACT_APP_NAME}`
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/main/token/${token}`).then(success => {
				setPais(success.data.pais)
				setTotaisPorPais(success.data.totaisPorPais)
				setUsuarioy(success.data.usuarioy)
				setLinkDeCadastro(`${window.location.protocol}//${window.location.host}/${success.data.usuarioy.usu_usuario}`)
				setLatlng(success.data.latlng)
				setMoney(success.data.money)
				setTotalUsu(success.data.total_usu)
				setNextCareer(success.data.nextCareer)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/home/token/${token}`).then(success => {
				setDados(success.data.dados)
				setUsuariox(success.data.usuariox)
				setBloqueio(success.data.bloqueio)
				setPlanAlterar(success.data.planToAlter)
				setAtivaAlterarPlano(success.data.ativaAlterarPlano)
				setRenew(success.data.renew)
				setCotas(success.data.cotas[0])
				setAlertoitenta(success.data.alertoitenta)
				setListPlanos(success.data.selectFkBonus)
				setLegCheck(success.data.usuariox.pref)
				setDataPag(Date.parse(success.data.data_pag))
				
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})

			axios.get(`${process.env.REACT_APP_URL_API}/Rede/binario_ajax/token/${token}`).then(success => {
				setNodes(success.data.dados)
				setPernaEsquerda(success.data.total.e)
				setPernaDireita(success.data.total.d)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})

			axios.get(`${process.env.REACT_APP_URL_API}/Arquivos/ver_arquivos/token/${token}`).then(success => {
				setFiles(success.data.files)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		getHome()
	}, [token]);
	
	useEffect(() => {
		const pieChart = () => {
			setPieOptions({
				title: i18n.t('paises_td'),
				is3D: true, pieStartAngle: 90
			})
			let piecdata = [[i18n.t('pais_td'),'total']]
			totaisPorPais.map((ttpais) => piecdata.push([ttpais.usu_pais, ttpais.total * 5]))
			setPieData(piecdata)

			setDonutOptions({
				title: i18n.t('objetivo_td'),
				is3D: true, 
				pieStartAngle: 90,
				pieSliceText: 'value',
				/* slices: {
					1: { offset: 0.2 }
				}, */
			})
			setDonutData([
				['Cota', 'valor'],
				[i18n.t('completo_percent'), parseFloat(cotas?cotas.ct_valor:0)],
				[i18n.t('limite_td'), parseFloat(cotas?cotas.ct_limite:10)]
			])

		}
		pieChart()
	},[cotas, totaisPorPais])

	const [copySuccess, setCopySuccess] = useState('');
	
	function copyLinkToClipboard(e) {
		const copyLink = document.getElementById('copyLink');
		copyLink.select();
		document.execCommand('copy');
		e.target.focus();
		setCopySuccess('Copied!');
	};

	const [modalShow, setModalShow] = useState(false);

	const classPlan = function(data) {
		for(let i = 1; i < 20; i++){
			let idFor = document.getElementById('card'+i)
			if(idFor){
				idFor.classList.remove("bg-success");
			}
		}
		document.getElementById('card'+data).classList.add("bg-success");
		setSelectPlan(data);
	}

	const alterPlan = function () {
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/mudar_plano/token/${token}`,selectPlan).then(success => {
			if (success.data.status) {
				window.location.href = "/backoffice/order";
			} else {
				alert(i18n.t('erro_td')+' '+i18n.t('plano_main'))
			}
		}).catch(error => {
			console.log(error)
			alert(i18n.t('erro_td')+' '+i18n.t('plano_main'))
		})
	}

	const newPlan = function () {
		axios.post(`${process.env.REACT_APP_URL_API}/Bo/upgradePlano/token/${token}`,selectUpgradePlan).then(success => {
			if (success.data.status) {
				setUpgradeAlertShow(true);
				setNoUpgradeAlertShow(false);
			} else {
				setUpgradeAlertShow(false);
				setNoUpgradeAlertShow(true);
			}
		}).catch(error => {
			console.log(error)
			setUpgradeAlertShow(false);
			setNoUpgradeAlertShow(true);
		})
	}

	const selectPerna = function (data) {
		let post = JSON.stringify({perna: data});

		axios.post(`${process.env.REACT_APP_URL_API}/Rede/perna/token/${token}`,post).then(success => {
			if (success.data.status) {
				setLegCheck(success.data.pref);
				setPernaAlertShow(true);
			}
		}).catch(error => {
			console.log(error)
		})
	}

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

	const noMsgDropdown = () => {
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.remove('d-lg-block')
	}

	return (
		<>
			<div className="row" onClick={() => noMsgDropdown()}>
				<div className="order-2 col-lg-3 order-lg-1">
					<aside className="widget-area">
						<div className="p-0 card card-profile widget-item">
							<div className="profile-banner">
								<figure className="profile-banner-small">
									<Link to="/backoffice/profile">
										<img src="/assets/banner/banner-small.jpg" alt='bg'/>
									</Link>
									<Link to="/backoffice/profile" className="profile-thumb-2">
										<img src={`/fotos/${usuarioy.foto}`} alt={usuarioy.foto}/>
									</Link>
								</figure>
								<div className="text-center profile-desc">
									<h6 className="author"><Link to="/backoffice/profile">{usuarioy.usu_nome}</Link></h6>
									<p><strong><Fa.FaCrosshairs/> {usuariox.bn_nome}</strong></p>
									<p><Fa.FaEnvelope/> {usuarioy.usu_email}</p>
									<p><Fa.FaWhatsapp/> {usuarioy.zap}</p>
									<p><Fa.FaHandsHelping/> {i18n.t('patrocinador_td')}: {usuarioy.upline}</p>
									<Link to="/backoffice/logout"><Button variant="danger" size="sm"><Fa.FaSignOutAlt/> {i18n.t('sair_td')}</Button></Link>
								</div>
							</div>
						</div>
						<div className="card widget-item">
							<h4 className="widget-title">{i18n.t('status_td')}</h4>
							<div className="widget-body">
								<ul className="like-page-list-wrapper">
									<li className="unorder-list">
										<CardStatus 
											valor={usuariox.alterar === false?i18n.t('sim_td'):i18n.t('nao_td')} 
											nome={i18n.t('ativo_td')}
											subvalor={i18n.t('sys_tb')}
											icon={usuariox.alterar === false?"thumbs-o-up":"thumbs-o-down"}
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={usuarioy.ca_nome}
											nome={i18n.t('plano_al')}
											subvalor={`${usuarioy.menor} pts.`}
											perc={(usuarioy.menor / nextCareer.ca_pontos) *100}
											icon="star"
											imagem={usuarioy.ca_id}
											small={`${parseFloat((usuarioy.menor / nextCareer.ca_pontos) *100).toFixed(1)}% to ${nextCareer.ca_nome}`}
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={dados.d_indicados}
											nome={i18n.t('total_td')}
											subvalor={i18n.t('direto_td')}
											icon="handshake-o"
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={dados.d_credito} 
											money="$ " 
											nome={i18n.t('saldo_td')}
											subvalor={i18n.t('Atual')}
											icon="usd"
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={totalUsu}
											nome={i18n.t('tb_usuarios')}
											subvalor={i18n.t('tb_usando_sys')}
											icon="users"
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={money.entrada}
											money="$ "
											nome={i18n.t('entrada_et')}
											subvalor={i18n.t('ate_hj')}
											icon="money"
										/>
									</li>
								</ul>
							</div>
						</div>
					</aside>
				</div>
				<div className="order-1 col-lg-6 order-lg-2">
					<div className="card card-small">
						<div className="share-box-inner">
							<h5 className="d-none d-lg-block">{i18n.t('link_de')}</h5>
							<div className="share-content-box w-100">
								<form className="share-text-box">
									<Form.Control defaultValue={linkDeCadastro} className="share-text-field" id="copyLink" readOnly onClick={copyLinkToClipboard}/>
									<Button className="btn-share" onClick={copyLinkToClipboard}><Fa.FaCopy /> {copySuccess}</Button>
								</form>
							</div>
						</div>
					</div>
					{renew ?
						<div className="card">
							<div className="post-content">
								<Alert variant="danger">
									<h3>{i18n.t('titulo_msg')}!</h3>
									<h4>{bloqueio}</h4>
									<p>{i18n.t('msg_renovacao')}</p>
									<hr/>
									<Alert.Link href="/backoffice/order"><Button variant="danger">{i18n.t('renovar_td')}</Button></Alert.Link>
								</Alert>
							</div>
						</div>
					: ''}
					{usuariox.alterar && ativaAlterarPlano ?
						<div className="card">
							<div className="post-title d-flex align-items-center">
							<h4>{i18n.t('plano_main')}</h4>
							</div>
							<div className="post-content">
								<Button variant="primary" size="lg" block onClick={() => setModalShow(true)}>{i18n.t('plano_main2')}</Button>
							</div>
						</div>
					: ''}
					<div className="card">
						<div className="post-title d-flex align-items-center">
							<h4>{i18n.t('valor_td')} {cotas? new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(cotas.ct_valor):0} ({i18n.t('limite_td')} {cotas?new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(cotas.ct_limite):0})</h4>
						</div>
						<div className="post-content">
							{alertoitenta ?
								<Alert variant="warning">
									<strong>{i18n.t('limite_80')}</strong><br/>
									<Link to="/backoffice/order"><Button variant="warning">{i18n.t('pedido_td')}</Button></Link>
								</Alert>
							: ''}
							<Chart
								loader={<div>Loading Chart</div>}
								maxWidth={'100%'}
								maxHeight={'100%'}
								chartType="PieChart"
								data={donutData}
								options={donutOptions}
								style={{margin: 'auto'}}
							/>
						</div>
					</div>
					<div className="card">
						<div className="post-title d-flex align-items-center">
							<h4>{i18n.t('binario_td')}</h4>
						</div>
						<div className="post-content mx-auto">
							<div className="card">
								<h4>{i18n.t('perna_td')} {i18n.t('pref_td')}</h4>
								{pernaAlertShow ?
									<Alert variant="success" onClose={() => setPernaAlertShow(false)} dismissible>
										<strong>{i18n.t('parabens_td')}!</strong> {i18n.t('perna_td')} {legCheck === 'e'?i18n.t('esquerda_td'):i18n.t('direita_td')} {i18n.t('pref_td')}.
									</Alert>
								:''}
								<Row>
									<Col xs="6">
										<Button variant={legCheck === 'e'?'success':'secondary'} block onClick={() => selectPerna('e')} id="pernae">{i18n.t('perna_td')} {i18n.t('esquerda_td')} <span className="badge badge-light">{pernaEsquerda}</span></Button>
									</Col>
									<Col xs="6">
										<Button variant={legCheck === 'd'?'success':'secondary'} block onClick={() => selectPerna('d')} id="pernad">{i18n.t('perna_td')} {i18n.t('direita_td')} <span className="badge badge-light">{pernaDireita}</span></Button>
									</Col>
								</Row>
							</div>
							<div className={`${bin.tree2} d-none d-lg-block`}>
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
										:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
												:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
														:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
														:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
												:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
														:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
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
														:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>:<Button variant="link"><Image src={`/img/vazio.png`} /><br/>{i18n.t('empty_td')}</Button>}
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="post-title d-flex align-items-center">
							<h4>UPGRADE</h4>
						</div>
						<div className="post-content">
							{upgradeAlertShow ? 
								<Alert variant="success" onClose={() => setUpgradeAlertShow(false)} dismissible>
									<strong>{i18n.t('parabens_td')}!</strong> {i18n.t('pedido_td')} {i18n.t('efetuado_td')} {i18n.t('sucesso_td')}. <Link to="/backoffice/order"><Button variant="success">{i18n.t('pedido_td')}</Button></Link>
								</Alert>
							:''}
							{noUpgradeAlertShow ? 
								<Alert variant="danger" onClose={() => setNoUpgradeAlertShow(false)} dismissible>
									<strong>{i18n.t('erro_td')}!</strong> {i18n.t('pedido_td')} {i18n.t('pendente_td')}. <Link to="/backoffice/order"><Button variant="danger">{i18n.t('pedido_td')}</Button></Link>
								</Alert>
							:''}
							<div className="share-box-inner">
								<div className="share-content-box w-100">
									<div className="share-text-box">
										<Form.Control as="select" value={selectUpgradePlan} className="share-text-field" custom onChange={e => setSelectUpgradePlan(e.target.value)}>
											<option>-- {i18n.t('escolha_td')} {i18n.t('plano_td')} --</option>
											{listPlanos.map((opt, index) => {
												return <option key={index} value={opt.bn_id}>{`${opt.bn_nome} $: ${opt.carac_valor}`}</option>
											})}
										</Form.Control>
										<Button className="btn-share" disabled={!selectUpgradePlan} onClick={() => newPlan()}><Fa.FaLevelUpAlt/></Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="post-title d-flex align-items-center">
							<h4>{i18n.t('pais_td')}: {usuarioy.usu_pais} (Total: {pais} {i18n.t('paises_td')})</h4>
						</div>
						<div className="post-content">
							<Chart
								loader={<div>Loading Chart</div>}
								maxWidth={'100%'}
								maxHeight={'100%'}
								chartType="PieChart"
								data={pieData}
								options={pieOptions}
								style={{margin: 'auto', padding: '0px'}}
							/>
						</div>
						<div className="post-content">
							<MapLeaflet latlng={latlng}></MapLeaflet>
						</div>
					</div>
				</div>
				<div className="order-3 col-lg-3">
					<aside className="widget-area">
						{files ? 
							<div className="card widget-item">
								<h4 className="widget-title">{i18n.t('materiais_td')}</h4>
								<div className="widget-body">
									<Link to="/backoffice/materials"><Button variant="danger">{i18n.t('materiais_td')}</Button></Link>
									<ul className="like-page-list-wrapper">
										{files.map((file, index) => {
											return (
												<React.Fragment key={index}>
												<li className="unorder-list">
													<CardStatus 
														valor={file.a_nome}
														nome={file.a_tipo}
														subvalor={file.a_data}
														icon="file"
													/>
												</li>
												</React.Fragment>
											)
										})}
									</ul>
								</div>
							</div>
						: ''}
						<div className="card widget-item">
							<h4 className="widget-title">{i18n.t('info_pessoal')}</h4>
							<div className="widget-body">
								<ul className="like-page-list-wrapper">
									<li className="unorder-list">
										<CardStatus 
											valor={i18n.t('pack')}
											nome={usuariox.bn_nome}
											subvalor={''}
											icon='crosshairs'
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={i18n.t('data_ativa')}
											nome={dataPag?new Intl.DateTimeFormat('pt-BR').format(dataPag):i18n.t('pendente_td')}
											subvalor={''}
											icon='calendar'
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={i18n.t('qualif_binario')}
											nome={usuariox.usu_data_qualif?i18n.t('sim_td'):''}
											subvalor={usuariox.usu_data_qualif?new Intl.DateTimeFormat('pt-BR').format(Date.parse(usuariox.usu_data_qualif)):i18n.t('pendente_td')}
											icon={usuariox.usu_data_qualif?'check':'times'}
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={i18n.t('plano_al')}
											nome={usuariox.ca_nome}
											subvalor=''
											icon='star'
										/>
									</li>
									<li className="unorder-list">
										<CardStatus 
											valor={i18n.t('qtd_rede')}
											nome={totalUsu / 5}
											subvalor=''
											icon='sitemap'
										/>
									</li>
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</div>

			<Modals
				size="lg"
				title={i18n.t('escolha_plano')}
				contentClassName="bg-light"
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Button variant="primary" size="lg" block onClick={() => alterPlan()}>{i18n.t('alterar_td')}</Button>
				<Row>
					{planAlterar.map((el, index) => {
						return (
							<Col md="4" key={index} onClick={() => classPlan(el.bn_id)} style={{cursor: 'pointer'}}>
								<div className="m-2 text-center card" id={`card${el.bn_id}`}>
									<img src="/logos/logo.png" style={{width: '50px', margin: 'auto'}} alt="" />
									<p className="m-1"><strong>{el.bn_nome}</strong></p>
									<p className="m-1"><strong><NumberFormat value={el.carac_valor} displayType={'text'} thousandSeparator={true} prefix={`$ `}/></strong></p>
								</div>
							</Col>
						)
					})}
				</Row>
				<Button variant="primary" size="lg" block onClick={() => alterPlan()}>{i18n.t('alterar_td')}</Button>
			</Modals>
		</>
	)
}