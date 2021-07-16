import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer(){
	return(
		<>
			<Container fluid>
				<Row>
					<Col xs="12">© {new Date().getFullYear()}. All right reserved {process.env.REACT_APP_NAME}</Col>
				</Row>
			</Container>
		</>
	)
}