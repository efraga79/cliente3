import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Alert, Row, Col, Button, InputGroup, FormControl, Table } from 'react-bootstrap';
import Modals from '../../Components/SubComponents/Modals'
import MapLeaflet from '../../Components/SubComponents/Leaflet'
import * as Fa from 'react-icons/fa'
import { PieChart } from 'react-minimal-pie-chart';

import CardStatus from '../../Components/SubComponents/CardStatus'

import { i18n } from '../../Components/Translates/i18n'

export default function Bo() {
	const token = sessionStorage.getItem('token');
	
	const [usuarioy, setUsuarioy] = useState([]);
	const [pais, setPais] = useState([]);
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
	
	const [pieData, setPieData] = useState([])
	
	useEffect(() => {
		const pieChart = () => {
			setPieData([
				{
					title: i18n.t('completo_percent'),
					value: parseFloat(cotas?cotas.ct_valor:0),
					percent: parseFloat(cotas?(cotas.ct_valor/cotas.ct_limite)*100:0).toFixed(0),
					color: '#0f94c0	',
				},
				{
					title: i18n.t('limite_td'), 
					value: parseFloat(cotas?cotas.ct_limite:10),
					percent: parseFloat(cotas?((cotas.ct_limite-cotas.ct_valor)/cotas.ct_limite)*100:100).toFixed(0),
					color: '#c03c0f',
				}
			])
		}
		pieChart()
	},[cotas])
	
	useEffect(() => {
		const getHome = () => {
			document.title = `${i18n.t('principal_td')} | ${process.env.REACT_APP_NAME}`
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/main/token/${token}`).then(success => {
				setPais(success.data.pais)
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
		}
		getHome()
	}, [token]);

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
				idFor.classList.add("bg-primary");
			}
		}
		document.getElementById('card'+data).classList.remove("bg-primary");
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
	return (
		<>
		<section className="section">
			<div className="container-fluid">
				<Row className="mt-0 mb-4">
					<Col lg="12">
						<InputGroup>
							<InputGroup.Prepend>
								<Button variant="primary" onClick={copyLinkToClipboard}>{i18n.t('link_de')}:</Button>
							</InputGroup.Prepend>
							<FormControl defaultValue={linkDeCadastro} id="copyLink" readOnly onClick={copyLinkToClipboard}/>
							<InputGroup.Append>
								<Button variant="primary" onClick={copyLinkToClipboard}><Fa.FaCopy /> {copySuccess}</Button>
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Row>

				<Row>
					<Col md="6">
						<CardStatus 
						bg="info"
						valor={usuarioy.ca_nome}
						nome={i18n.t('plano_al')}
						subvalor={`${usuarioy.menor} pts.`}
						perc={(usuarioy.menor / nextCareer.ca_pontos) *100}
						icon="star"
						imagem={usuarioy.ca_id}
						small={`${parseFloat((usuarioy.menor / nextCareer.ca_pontos) *100).toFixed(1)}% to ${nextCareer.ca_nome}`} />
					</Col>
					<Col md="6">
						<CardStatus
						bg="warning"
						valor={dados.d_indicados}
						nome={i18n.t('total_td')}
						subvalor={i18n.t('direto_td')}
						icon="sitemap"
						/>
					</Col>
					<Col md="6">
						<CardStatus 
						bg="danger"
						valor={dados.d_credito} 
						money="$ " 
						nome={i18n.t('saldo_td')}
						subvalor={i18n.t('Atual')}
						icon="usd" />
					</Col>
					<Col md="6">
						<CardStatus 
						bg={usuariox.alterar === false?'success':'danger'}
						valor={usuariox.alterar === false?i18n.t('sim_td'):i18n.t('nao_td')} 
						nome={i18n.t('ativo_td')}
						subvalor={i18n.t('sys_tb')}
						icon={usuariox.alterar === false?'thumbs-o-up':'thumbs-o-down'} />
					</Col>
					<Col md="6">
						<CardStatus bg="success" valor={money.entrada} money="$ " nome={i18n.t('entrada_et')} subvalor={i18n.t('ate_hj')} icon="money" />
					</Col>
					<Col md="6">
						<CardStatus bg="primary" valor={totalUsu} nome={i18n.t('tb_usuarios')} subvalor={i18n.t('tb_usando_sys')} icon="users" />
					</Col>
				</Row>
				<Row>
					<Col md="7">
						<div className="card">
							<div className="card-header d-sm-flex d-block pb-0 border-0">
								<div className="mr-auto pr-3 mb-sm-0 mb-3">
									<h4 className="text-light fs-20">{usuarioy.usu_pais} - Total: {pais} {i18n.t('paises_td')}</h4>
								</div>
							</div>
							<div className="card-body">
								<MapLeaflet latlng={latlng}></MapLeaflet>
							</div>
						</div>
					</Col>
					<Col md="5">
						{alertoitenta ?
							<Alert variant="warning">
								<strong>{i18n.t('limite_80')}</strong><br/>
								<Link to="/backoffice/order"><Button variant="warning">{i18n.t('pedido_td')}</Button></Link>
							</Alert>
						: ''}
						<div className="card">
							<div className="card-header d-sm-flex d-block pb-0 border-0">
								<div className="mr-auto pr-3 mb-sm-0 mb-3">
									<h4 className="text-light fs-20">{i18n.t('objetivo_td')}</h4>
								</div>
							</div>
							<div className="card-body">
								<h5>{i18n.t('valor_td')} {cotas? new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(cotas.ct_valor):0} ({i18n.t('limite_td')} {cotas?new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(cotas.ct_limite):0})</h5>
								{pieData?
									<PieChart 
										data={pieData}
										radius={PieChart.defaultProps.radius - 7}
										segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
										lineWidth={50}
										style={{ maxHeight: '250px' }}
										label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.percent}%`}
										labelStyle={{
											fontSize: '8px',
											textShadow: '0px 0px 2px #fff'
										}}
									/>
								:''}
							</div>
						</div>
					</Col>
				</Row>
				
				{renew ?
					<Alert variant="danger">
						<h3>{i18n.t('titulo_msg')}!</h3>
						<h4>{bloqueio}</h4>
						<p>{i18n.t('msg_renovacao')}</p>
						<hr/>
						<Alert.Link href="/backoffice/order"><Button variant="danger">{i18n.t('renovar_td')}</Button></Alert.Link>
					</Alert>
				: ''}
				
				{usuariox.alterar && ativaAlterarPlano ?
					<Row>
						<Col xs="12">
							<div className="p-2 card">
								<h4>{i18n.t('plano_main')}</h4>
								<Button variant="primary" size="lg" block onClick={() => setModalShow(true)}>{i18n.t('plano_main2')}</Button>
							</div>
						</Col>
					</Row>
				: ''}

				<Row>
					<Col md="6">
						<div className="p-2 card border-primary">
							<h4>UPGRADE</h4>
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
							<InputGroup> 
								<FormControl as="select" value={selectUpgradePlan} custom onChange={e => setSelectUpgradePlan(e.target.value)}>
									<option>-- {i18n.t('escolha_td')} {i18n.t('plano_td')} --</option>
									{listPlanos.map((opt, index) => {
										return <option key={index} value={opt.bn_id}>{`${opt.bn_nome} $: ${opt.carac_valor}`}</option>
									})}
								</FormControl>
								<InputGroup.Append>
									<Button variant="primary" onClick={() => newPlan()}>Upgrade</Button>
								</InputGroup.Append>
							</InputGroup>
						</div>
					</Col>
					<Col md="6">
						<div className="p-2 card border-primary">
							<h4>{i18n.t('perna_td')} {i18n.t('pref_td')}</h4>
							{pernaAlertShow ?
								<Alert variant="success" onClose={() => setPernaAlertShow(false)} dismissible>
									<strong>{i18n.t('parabens_td')}!</strong> {i18n.t('perna_td')} {legCheck === 'e'?i18n.t('esquerda_td'):i18n.t('direita_td')} {i18n.t('pref_td')}.
								</Alert>
							:''}
							<Row>
								<Col xs="6">
									<Button variant={legCheck === 'e'?'success':'dark'} block onClick={() => selectPerna('e')} id="pernae">{i18n.t('perna_td')} {i18n.t('esquerda_td')}</Button>
								</Col>
								<Col xs="6">
									<Button variant={legCheck === 'd'?'success':'dark'} block onClick={() => selectPerna('d')} id="pernad">{i18n.t('perna_td')} {i18n.t('direita_td')}</Button>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="p-2 card border-primary">
							<h4>{i18n.t('dados_td')}</h4>
							<Table responsive striped bordered hover>
								<thead>
									<tr>
										<th>{i18n.t('pack')}</th>
										<th>{i18n.t('data_ativa')}</th>
										<th>{i18n.t('qualif_binario')}</th>
										<th>{i18n.t('plano_al')}</th>
										<th>{i18n.t('qtd_rede')}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{usuariox.bn_nome}</td>
										<td>{dataPag?new Intl.DateTimeFormat('pt-BR').format(dataPag):''}</td>
										<td>{usuariox.usu_data_qualif?`${i18n.t('sim_td')} - ${new Intl.DateTimeFormat('pt-BR').format(Date.parse(usuariox.usu_data_qualif))}`:i18n.t('nao_td')}</td>
										<td>{usuariox.ca_nome}</td>
										<td>{totalUsu / 5}</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</div>
			
		</section>

		<Modals
			size="lg"
			title={i18n.t('escolha_plano')}
			// contentClassName="bg-dark"
			show={modalShow}
			onHide={() => setModalShow(false)}
		>
			<Button variant="primary mb-3" size="lg" block onClick={() => alterPlan()}>{i18n.t('alterar_td')}</Button>
			<Row>
				{planAlterar.map((el, index) => {
					return (
						<Col md="4" key={index} onClick={() => classPlan(el.bn_id)}>
							<div className="p-2 text-center card bg-primary" id={`card${el.bn_id}`} style={{cursor: 'pointer'}}>
								<h4 className="m-1">{el.bn_nome}</h4>
								<h3 className="m-1">{el.carac_valor}</h3>
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