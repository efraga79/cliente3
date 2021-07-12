import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from "react-router-dom"
import { Alert, Container, Form, Row, Col, Button, Badge, Spinner, Card } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'

export default function Register () {
	document.title = `${i18n.t('cadastrar_td')} | ${process.env.REACT_APP_NAME}`

	const [planos, setPlanos] = useState([])
	const [countries, setCountries] = useState([])
	const [plano, setPlano] = useState(3)
	const [login, setLogin] = useState('')
	const [usuario, setUsuario] = useState('')
	const [carteira, setCarteira] = useState('')
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [confSenha, setConfSenha] = useState('')
	const [seg, setSeg] = useState('')
	const [confSeg, setConfSeg] = useState('')
	const [paises, setPaises] = useState('United States of America')
	const [ddi, setDdi] = useState(55)
	const [whats, setWhats] = useState('')
	const [aceite, setAceite] = useState(false)

	const [erroUsuario, setErroUsuario] = useState(false)
	const [erroCarteira, setErroCarteira] = useState(false)
	const [erroSenha, setErroSenha] = useState(false)
	const [erroSenhaF, setErroSenhaF] = useState(false)
	const [erroEmail, setErroEmail] = useState(false)
	const [waiting, setWaiting] = useState(false)
	const [erroCadastro, setErroCadastro] = useState(false)

	useEffect(() => {
		const verificar = () => {
			let indicante = sessionStorage.getItem('indicant')
			if(indicante){
				axios.get(`${process.env.REACT_APP_URL_API}/Bo/valid_user/user/${indicante}`).then(success => {
					setLogin(success.data.dados)
				}).catch(error => {
					window.location = '/indicant'
				})
				axios.get(`${process.env.REACT_APP_URL_API}/Bo/getPlanos`).then(success => {
					setPlanos(success.data.planos)
					setCountries(success.data.countries)
				}).catch(error => {
					window.location = '/indicant'
				})
			} else {
				window.location = '/indicant'
			}
		}
		verificar()
	}, [])

	const validNewUser = () => {
		let user = {
			usuario : usuario
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/validarusuario`, user).then(success => {
			if(!success.data.status){
				setUsuario('')
				setErroUsuario(true)
			} else {
				setErroUsuario(false)
			}
		}).catch(error => {
			console.log(error)
		})
	}

	const validCarteira = () => {
		let user = {
			carteira : carteira
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/valid_carteira_user`, user).then(success => {
			if(!success.data.status){
				setCarteira('')
				setErroCarteira(true)
			} else {
				setErroCarteira(false)
			}
		}).catch(error => {
			console.log(error)
		})
	}

	const validSenha = () => {
		if (confSenha !== senha){
			setConfSenha('')
			setErroSenha(true)
		} else {
			setErroSenha(false)
		}
	}

	const validSenhaF = () => {
		if (confSeg !== seg){
			setConfSeg('')
			setErroSenhaF(true)
		} else {
			setErroSenhaF(false)
		}
	}

	const validEmail = () => {
		axios.get(`${process.env.REACT_APP_URL_API}/Usuario/ver_email/email/${email}`).then(success => {
			if(!success.data.status){
				setEmail('')
				setErroEmail(true)
			} else {
				setErroEmail(false)
			}
		}).catch(error => {
			console.log(error)
		})
	}

	const signUp = () => {
		setWaiting(true)
		let user = {
			plano : plano,
			email : email,
			carteira : carteira,
			indicante : login,
			ddi : ddi,
			nome : nome,
			paises : paises,
			usuario : usuario,
			conf_senha : confSenha,
			conf_seg : confSeg,
			whats : whats
		}
		user = JSON.stringify(user)
		axios.post(`${process.env.REACT_APP_URL_API}/Usuario/cadastrar_ajax`, user).then(success => {
			if(success.data.status){
				sessionStorage.removeItem('indicant')
				window.location = "/backoffice/login"
			} else {
				setErroCadastro(true)
			}
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<>
			<div style={{minHeight:'87vh'}}>
				<Container>
					<Row className="d-flex justify-content-center my-3">
						<Link to="/"><img src="/logos/logodark.png" width="400" alt="Logo" className="img-fluid" /></Link>
					</Row>
					<Form>
						<Card>
							<Row className="mb-3">
								<Col className="text-center" md={{span:6, offset:3}}>
									<h3 style={{textTransform: 'uppercase'}}>{i18n.t('cadastrar_td')}</h3>
									<Alert variant="dark">{i18n.t('indicado_por')} <strong>{login}</strong> <Link to={`/${login}`} ><Button variant="dark" size="sm">{i18n.t('alterar_td')} {i18n.t('patrocinador_td')}</Button></Link></Alert>
									<Link to="/backoffice/login">{i18n.t('cadastrado_td')}</Link>
								</Col>
							</Row>
							<Row>
								<Col md="4">
									<Form.Group>
										<Form.Label>{i18n.t('plano_td')}</Form.Label>
										<Form.Control as="select" value={plano} custom onChange={e => setPlano(e.target.value)}>
											{planos.map((opt, index) => {
												return <option key={index} value={opt.bn_id}>{opt.bn_nome}</option>
											})}
										</Form.Control>
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('usuario_td')}</Form.Label>
										{erroUsuario? <><br/><Badge variant="danger">{i18n.t('login_ja_tem')}</Badge></> : ''}
										<Form.Control size="lg" type="text" placeholder={i18n.t('login')} onBlur={() => validNewUser()} autoComplete="off" value={usuario} onChange={e => setUsuario(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('carteira_td')}</Form.Label>
										{erroCarteira? <><br/><Badge variant="danger">{i18n.t('msg_btc')}</Badge></> : ''}
										<Form.Control size="lg" type="text" placeholder={i18n.t('carteira_td')} autoComplete="off" value={carteira} onBlur={() => validCarteira()} onChange={e => setCarteira(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('nome_td')}</Form.Label>
										<Form.Control size="lg" type="text" placeholder={i18n.t('nome_td')} autoComplete="off" onChange={e => setNome(e.target.value)} />
									</Form.Group>
								</Col>
								<Col md="4">
									<Form.Group>
										<Form.Label>{i18n.t('email_td')}</Form.Label>
										{erroEmail? <><br/><Badge variant="danger">{i18n.t('email_td')} {i18n.t('invalido_td')}</Badge></> : ''}
										<Form.Control size="lg" type="email" placeholder={i18n.t('email_td')} autoComplete="off" value={email} onBlur={() => validEmail()} onChange={e => setEmail(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('senha_td')}</Form.Label>
										<Form.Control size="lg" type="password" placeholder={i18n.t('senha_td')} autoComplete="off" onChange={e => setSenha(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('confirmar_td')} {i18n.t('senha_td')}</Form.Label>
										{erroSenha? <Badge variant="danger">{i18n.t('senha_nao_confere')}</Badge> : ''}
										<Form.Control size="lg" type="password" placeholder={`${i18n.t('confirmar_td')}  ${i18n.t('senha_td')}`} autoComplete="off" value={confSenha} onBlur={() => validSenha()} onChange={e => setConfSenha(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('senha_td')} {i18n.t('financeiro_td')}</Form.Label>
										<Form.Control size="lg" type="password" placeholder={`${i18n.t('senha_td')} ${i18n.t('financeiro_td')}`} autoComplete="off" onChange={e => setSeg(e.target.value)} />
									</Form.Group>
								</Col>
								<Col md="4">
									<Form.Group>
										<Form.Label>{i18n.t('confirmar_td')} {i18n.t('senha_td')} {i18n.t('financeiro_td')}</Form.Label>
										{erroSenhaF? <Badge variant="danger">{i18n.t('senhaf_nao_confere')}</Badge> : ''}
										<Form.Control size="lg" type="password" placeholder={`${i18n.t('confirmar_td')} ${i18n.t('senha_td')} ${i18n.t('financeiro_td')}`} autoComplete="off" value={confSeg} onBlur={() => validSenhaF()} onChange={e => setConfSeg(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('pais_td')}</Form.Label>
										<Form.Control as="select" value={paises} custom onChange={e => setPaises(e.target.value)}>
											{countries.map((opt, index) => {
												return <option key={index} value={opt.nome}>{opt.nome}</option>
											})}
										</Form.Control>
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('ddi_pais')} (ex.: +44)</Form.Label>
										<Form.Control size="lg" type="number" placeholder={i18n.t('ddi_pais')} autoComplete="off" onChange={e => setDdi(e.target.value)} />
									</Form.Group>
									<Form.Group>
										<Form.Label>{i18n.t('zap_td')}</Form.Label>
										<Form.Control size="lg" type="text" placeholder={i18n.t('zap_td')} autoComplete="off" onChange={e => setWhats(e.target.value)} />
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Check.Label className="p-3"><Form.Check.Input type={'checkbox'} onChange={e => setAceite(e.target.checked)}/>{i18n.t('aceite_td')} </Form.Check.Label>
								</Col>
							</Row>
							<Row>
								<Col>
									{waiting?
										<h1 className="text-center"><Spinner animation="border" variant="primary" /> Loading...</h1>
									:
										<>
											{erroCadastro ? <Alert variant="danger">{i18n.t('erro_td')}</Alert> :''}
											<Button variant="primary" disabled={ !plano | !email | !carteira | !login | !ddi | !nome | !paises | !usuario | !confSenha | !confSeg | !whats | !aceite } onClick={() => signUp()} > {i18n.t('cadastrar_td')} </Button>
										</>
									}
								</Col>
							</Row>
						</Card>
					</Form>
				</Container>
			</div>
		</>
	)
}