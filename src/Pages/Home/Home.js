import React, { useEffect } from 'react'
import { i18n } from '../../Components/Translates/i18n'
import { Container, Alert, Spinner } from 'react-bootstrap'

export default function Home() {
	useEffect(() => {
		document.title = `${i18n.t('bem_vindo')} | ${process.env.REACT_APP_NAME}`
		let token = sessionStorage.getItem('token')
		
		const sair = () => {
			sessionStorage.removeItem('token')
			window.location = '/backoffice/login'
		}
		
		if(token){
			sair()
		}
		window.location = '/backoffice/login'
	}, [])

	return (
		<div style={{minHeight:'87vh'}}>
			<Container>
				<Alert variant="default text-center">
					<img src="/logos/logo.png" alt="Logo" className="img-fluid"/><br/>
					<h1><Spinner animation="border" variant="primary" /></h1>
					<h1 className="text-white">Loading...</h1>
				</Alert>
			</Container>
		</div>
	)
}