import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Dropdown, Accordion, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Fa from 'react-icons/fa'
import { i18n } from './Translates/i18n';

import { SidebarData } from './Sidebar/SidebarData'
import SubMenu from './Sidebar/SubMenu';

export default function NavBar() {
	const token = sessionStorage.getItem('token');
	const [usuarioy, setUsuarioy] = useState([]);
	const [chamado, setChamado] = useState([]);
	
	const I18N_STORAGE_KEY = 'i18nextLng'
	const [language, setLanguage] = useState(localStorage.getItem(I18N_STORAGE_KEY))
	const handleLanguage = e => {
		noMsgDropdown()
		setLanguage(e)
		localStorage.setItem(I18N_STORAGE_KEY, e)
		let location = window.location
		window.location = location
	}

	const msgDropdownA = () => {
		document.getElementById('b').classList.remove('d-lg-block')
		document.getElementById('a').classList.toggle('d-lg-block')
	}
	const msgDropdownB = () => {
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.toggle('d-lg-block')
	}
	
	const noMsgDropdown = () => {
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.remove('d-lg-block')
	}

	useEffect(() => {
		const user = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/main/token/${token}`).then(success => {
				setUsuarioy(success.data.usuarioy)
			}).catch(error => {
				console.log(error)
			})

			axios.get(`${process.env.REACT_APP_URL_API}/Bo/home/token/${token}`).then(success => {
				setChamado(success.data.chamado)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		user()
	}, [token]);

	const ReadCall = (data) => {
		noMsgDropdown()
		sessionStorage.setItem('idCall', data)
		window.location = '/backoffice/readcall'
	}
	
	return (
		<>
			 <header style={{display: 'flex'}}>
				<div className="sticky bg-white header-top d-none d-lg-block">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-5">
								<div className="header-top-navigation">
									<nav>
										<ul>
											<li className="active"><Link to="/backoffice/bo" onClick={() => noMsgDropdown()}>{i18n.t('principal_td')}</Link></li>
											<li className="msg-trigger"><a className="msg-trigger-btn" href="#a" onClick={() => msgDropdownA()}>menu</a>
												<div className="p-0 message-dropdown" id="a">
													<Accordion>
														{SidebarData.map((item, index) =>{
															return <SubMenu item={item} btn={index} key={index}/>
														})}
													</Accordion>
												</div>
											</li>
											<li className="notification-trigger">
												<a className="msg-trigger-btn" href="#b" onClick={() => msgDropdownB()}>{i18n.t('list_chamado')}</a>
												<div className="message-dropdown" id="b">
													<div className="dropdown-title">
														<p className="recent-msg">{i18n.t('list_chamado')}</p>
													</div>
													<ul className="dropdown-msg-list">
														{chamado ? chamado.map((lista, index) => {
																return (
																	<React.Fragment key={index}>
																	{index < 5 ?
																		<li className="msg-list-item d-flex justify-content-between" onClick={e => ReadCall(lista.id)}>
																			<div className="profile-thumb">
																				<h3><Fa.FaEnvelope /></h3>
																			</div>
																			<div className="msg-content notification-content">
																				{lista.status === 1
																				? <p><Badge variant="warning">{i18n.t('aberto')}</Badge></p>
																				: lista.status === 2
																				? <p><Badge variant="info">{i18n.t('respondido')}</Badge></p>
																				: lista.status === 3 
																				? <p><Badge variant="success">{i18n.t('respondido')}</Badge></p>
																				: ''} &nbsp;
																				<p><strong>{lista.assunto}</strong></p>,
																			</div>
																			<div className="msg-time">
																				<p>{lista.datahj}</p>
																			</div>
																		</li>
																	: ''}
																	</React.Fragment>
																)
															}) :''
														}
													</ul>
													<div className="msg-dropdown-footer">
														<Link to="/backoffice/call"  onClick={() => noMsgDropdown()}><Button variant="danger text-light">{i18n.t('todos_td')}</Button></Link>
													</div>
												</div>
											</li>
										</ul>
									</nav>
								</div>								
							</div>
							<div className="col-md-2">
								<div className="text-center brand-logo">
									<Link to="/backoffice/bo" onClick={() => noMsgDropdown()}>
										<img src="/logos/logo.png" style={{maxHeight: '80px'}} alt="brand logo" className=""/>
									</Link>
								</div>
							</div>
							<div className="col-md-5">
								<div className="header-top-right d-flex align-items-center justify-content-end">	
									
									<Dropdown className="ml-auto" style={{width: 'fit-content'}}>
										<Dropdown.Toggle style={{backgroundColor: '#ddd'}} id="dropdown-basic">
											{
												language === 'pt-BR'? <img src="/flags/pt.png" width="30px" alt="Português"/>
												: language === 'es'? <img src="/flags/es.png" width="30px" alt="Español"/>
												: language === 'fr'? <img src="/flags/fr.png" width="30px" alt="Français"/>
												: <img src="/flags/us.png" width="30px" alt="English"/>
											}
										</Dropdown.Toggle>
										
										<Dropdown.Menu align="right">
											<Dropdown.Item onClick={e => handleLanguage('en-US')}><img src="/flags/us.png" width="30px" alt="English"/> English</Dropdown.Item>
											<Dropdown.Item onClick={e => handleLanguage('es')}><img src="/flags/es.png" width="30px" alt="Español"/> Español</Dropdown.Item>
											<Dropdown.Item onClick={e => handleLanguage('fr')}><img src="/flags/fr.png" width="30px" alt="Français"/> Français</Dropdown.Item>
											<Dropdown.Item onClick={e => handleLanguage('pt-BR')}><img src="/flags/pt.png" width="30px" alt="Português"/> Português</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
									<div className="profile-setting-box">
										<div className="profile-thumb-small">
											<Button variant="link" className="p-0 profile-triger">
												<figure>
													<img src={`/fotos/${usuarioy.foto}`} alt="profile picture3"/>
												</figure>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<header style={{display: 'flex'}}>
				<div className="sticky mobile-header-wrapper d-block d-lg-none">
					<div className="mobile-header position-relative ">
						<div className="mobile-logo bg-light">
							<Link to="/backoffice/bo" onClick={() => noMsgDropdown()}>
								<img src="/logos/logosymbol.png" style={{height: 'auto', width: '50px'}} alt="logo"/>
							</Link>
						</div>
						<Dropdown>
							<Dropdown.Toggle style={{backgroundColor: '#ddd', color: '#000'}} id="dropdown-menu"><Fa.FaBars/></Dropdown.Toggle>
							<Dropdown.Menu>
								<Accordion>
									{SidebarData.map((item, index) =>{
										return <SubMenu item={item} btn={index} key={index}/>
									})}
								</Accordion>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown className="ml-auto" style={{width: 'fit-content'}}>
							<Dropdown.Toggle style={{backgroundColor: '#ddd'}} id="dropdown-basic">
								{
									language === 'pt-BR'? <img src="/flags/pt.png" width="30px" alt="Português"/>
									: language === 'es'? <img src="/flags/es.png" width="30px" alt="Español"/>
									: language === 'fr'? <img src="/flags/fr.png" width="30px" alt="Français"/>
									: <img src="/flags/us.png" width="30px" alt="English"/>
								}
							</Dropdown.Toggle>
							
							<Dropdown.Menu align="right">
								<Dropdown.Item onClick={e => handleLanguage('en-US')}><img src="/flags/us.png" width="30px" alt="English"/> English</Dropdown.Item>
								<Dropdown.Item onClick={e => handleLanguage('es')}><img src="/flags/es.png" width="30px" alt="Español"/> Español</Dropdown.Item>
								<Dropdown.Item onClick={e => handleLanguage('fr')}><img src="/flags/fr.png" width="30px" alt="Français"/> Français</Dropdown.Item>
								<Dropdown.Item onClick={e => handleLanguage('pt-BR')}><img src="/flags/pt.png" width="30px" alt="Português"/> Português</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<div className="mobile-header-profile bg-light">
							<div className="profile-thumb profile-setting-box">
								<Button className="p-0 profile-triger">
									<figure className="profile-thumb-middle">
										<img src={`/fotos/${usuarioy.foto}`} alt="profile picture1"/>
									</figure>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}