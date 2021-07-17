import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Fa from 'react-icons/fa'
import { i18n } from './Translates/i18n';

export default function NavBar() {
	const token = sessionStorage.getItem('token');
	const [usuarioy, setUsuarioy] = useState([]);
	const [chamado, setChamado] = useState([]);
	
	const I18N_STORAGE_KEY = 'i18nextLng'
	const [language, setLanguage] = useState(localStorage.getItem(I18N_STORAGE_KEY))
	const handleLanguage = e => {
		setLanguage(e)
		localStorage.setItem(I18N_STORAGE_KEY, e)
		let location = window.location
		window.location = location
	}

	useEffect(() => {
		const user = () => {
			axios.get(`${process.env.REACT_APP_URL_API}/Bo/main/token/${token}`).then(success => {
				setUsuarioy(success.data.usuarioy)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
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
		sessionStorage.setItem('idCall', data)
		window.location = '/backoffice/readcall'
	}
	
	return (
		<>
			 <div className="nav-header">
				<Link to="/backoffice/bo" className="brand-logo">
					<img className="logo-abbr" src="/logos/logo.png" alt=""/>
					<h4 className="brand-title"> {process.env.REACT_APP_NAME}</h4>
				</Link>

				<div className="nav-control">
					<div className="hamburger">
						<span className="line"></span><span className="line"></span><span className="line"></span>
					</div>
				</div>
			</div>
			 <div className="header">
				<div className="header-content">
					<nav className="navbar navbar-expand">
						<div className="collapse navbar-collapse justify-content-between">
							<div className="header-left">
								<div className="dashboard_bar">
									
								</div>
							</div>
							<ul className="navbar-nav header-right">
								<li className="nav-item dropdown notification_dropdown">
									<button className="nav-link ai-icon" data-toggle="dropdown">
										<Fa.FaComment/>
										<div className="pulse-css"></div>
									</button>
									<div className="dropdown-menu rounded dropdown-menu-right">
										<div id="DZ_W_Notification1" className="widget-media dz-scroll p-3 height380">
											<ul className="timeline">
												{chamado ? 
													chamado.map((lista, index) => {
														return (
															<React.Fragment key={index}>
																{index < 4 ?
																	<li onClick={e => ReadCall(lista.id)} style={{cursor: 'pointer'}}>
																		<div className="timeline-panel">
																			<div className="media mr-2">
																				<Fa.FaEnvelope />
																			</div>
																			<div className="media-body">
																				<h6 className="mb-1">{lista.assunto}</h6>
																				<small className="d-block">
																					{lista.datahj}
																					{lista.status === 1
																					? <Badge variant="warning">{i18n.t('aberto')}</Badge>
																					: lista.status === 2
																					? <Badge variant="info">{i18n.t('respondido')}</Badge>
																					: lista.status === 3 
																					? <Badge variant="success">{i18n.t('respondido')}</Badge>
																					: ''}
																				</small>
																			</div>
																		</div>
																	</li>
																: ''}
															</React.Fragment>
														)
													})
												:''}
											</ul>
										</div>
										<Link to="/backoffice/call" className="all-notification">{i18n.t('todos_td')} <Fa.FaArrowRight/> </Link>
									</div>
								</li>
								<li className="nav-item dropdown notification_dropdown">
									<button className="nav-link" data-toggle="dropdown">
										{
											language === 'pt-BR'? <img src="/flags/pt.png" width="20px" alt="Português"/>
											: language === 'es'? <img src="/flags/es.png" width="20px" alt="Español"/>
											: language === 'fr'? <img src="/flags/fr.png" width="20px" alt="Français"/>
											: <img src="/flags/us.png" width="20px" alt="English"/>
										}
									</button>
									<div className="dropdown-menu dropdown-menu-right rounded">
										<div id="DZ_W_TimeLine11Home"
											className="widget-timeline dz-scroll style-1 p-3 ps ps--active-y">
											<ul className="timeline">
												<li onClick={e => handleLanguage('en-US')} style={{cursor: 'pointer'}}><img src="/flags/us.png" width="30px" alt="English"/> English</li>
												<li onClick={e => handleLanguage('es')} style={{cursor: 'pointer'}}><img src="/flags/es.png" width="30px" alt="Español"/> Español</li>
												<li onClick={e => handleLanguage('fr')} style={{cursor: 'pointer'}}><img src="/flags/fr.png" width="30px" alt="Français"/> Français</li>
												<li onClick={e => handleLanguage('pt-BR')} style={{cursor: 'pointer'}}><img src="/flags/pt.png" width="30px" alt="Português"/> Português</li>
											</ul>
										</div>
									</div>
								</li>
								<li className="nav-item header-profile">
									<Link to="/backoffice/profile" className="nav-link" data-toggle="dropdown">
										<img src={`/fotos/${usuarioy.foto}`} width="20" alt="profile picture3"/>
										<div className="header-info">
											<span className="text-light"><strong>{usuarioy.usu_nome}</strong></span>
											<p className="fs-12 mb-0 text-light">{usuarioy.usu_usuario}</p>
										</div>
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}