import React from 'react'
import { Row, Col, ProgressBar } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

export default function CardStatus (props){
	return (
		<>
			<div className="card w-100">
				<Row>
					<Col xs="4">
						<h1><i className={`fa fa-${props.icon}`}/></h1>
					</Col>
					<Col xs="8">
						{props.money ?
							<h6><NumberFormat value={props.valor} displayType={'text'} thousandSeparator={true} prefix={props.money}/></h6> 
						:
							<h6>{props.valor}</h6>
						}<hr/>
						<h6>{props.nome}</h6>
						<h6>{props.subvalor}</h6>
					</Col>
				</Row>
				{props.perc ? 
					<>
						<ProgressBar variant="danger" animated now={props.perc}/>
						<small>{props.small}</small>
					</>
				: <br/>}
			</div>
		</>
	)
}
