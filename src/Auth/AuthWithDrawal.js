import React from 'react'

import { Link } from "react-router-dom"
import { Alert, Container, Form, Col, Row, Card, Badge, Button } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'

export default function AuthWithDrawal () {
	document.title = `Withdrawal Authorization | ${process.env.REACT_APP_NAME}`
	
	return (
		<div style={{minHeight:'87vh'}}>
			<Container fluid>
				<Row className="d-flex justify-content-center">
					<Link to="/"><img src="/logos/logo.png" alt="Logo" className="img-fluid" /></Link>
				</Row>
				<Row>
					<Col lg={{span:6, offset:3}} md={{span:6, offset:3}}>
						<Card>
							<Alert variant="success">
								<h2><strong>WITHDRAWAL AUTHORIZED SUCCESSFULLY!</strong></h2>
								<br/>
								<h4>Wait up to 24 hours to receive in your wallet!</h4>
							</Alert>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}