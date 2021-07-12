import React from 'react'

import { Link } from "react-router-dom"
import { Alert, Container, Form, Col, Row, Card, Badge, Button } from 'react-bootstrap'
import { i18n } from '../Components/Translates/i18n'

export default function NoAuthWithDrawal () {
	document.title = `Withdrawal Authorization | ${process.env.REACT_APP_NAME}`
	
	return (
		<div style={{minHeight:'87vh'}}>
			<Container fluid>
				<Row className="d-flex justify-content-center">
					<Link to="/"><img src="/logos/logodark.png" alt="Logo" className="img-fluid" /></Link>
				</Row>
				<Row>
					<Col lg={{span:6, offset:3}} md={{span:6, offset:3}}>
						<Card>
							<Alert variant="danger">
								<h2><strong>THE WITHDRAWAL WAS NOT ALLOWED!</strong></h2>
								<br/>
								<h4>This link has already expired or is invalid or has already been used!</h4>
								<br/>
								<h4>Request the withdrawal again and authorize in the new email it will arrive!</h4>
							</Alert>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}