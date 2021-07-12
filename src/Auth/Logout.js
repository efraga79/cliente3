import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap';
import { i18n } from '../Components/Translates/i18n'

export default function Logout() {
	document.title = `${i18n.t('sair_td')} | ${process.env.REACT_APP_NAME}`
	
	useEffect(() => {
		const sair = () => {
			sessionStorage.removeItem('token')
			window.location = '/backoffice/login'
		}
		return (
			sair()
		)
	}, []);

	return (
		<>
			<Alert variant="default text-center">
				<img src="/logos/logo.png" alt="Logo" className="img-fluid"/><br/>
				<Spinner animation="border" variant="danger" /> 
				<h1 className="text-white">Loading...</h1>
			</Alert>
		</>
	)
}