import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

export default function CardStatus (props){
	return (
		<>
			<div className="card avtivity-card">
				<div className="card-body">
					<div className="media align-items-center">
						<span className={`activity-icon bgl-dark mr-md-4 mr-3`}>
							<i className={`fa fa-${props.icon} fa-3x text-${props.bg}`} style={{verticalAlign: 'middle'}}/>
						</span>
						<div className="media-body">
							<p className="fs-14 mb-2">{props.nome} {props.subvalor}</p>
							<span className="title text-light font-w600">
								{props.money ? <NumberFormat value={props.valor} displayType={'text'} thousandSeparator={true} prefix={props.money}/> : props.valor}
							</span>
						</div>
					</div>
					<div className="progress" style={{height:'5px'}}>
						{props.perc ? 
							<>
								<small>{props.small}</small>
								<ProgressBar variant="danger" animated now={props.perc}/>
							</>
						: <br/>}
					</div>
				</div>
				<div className={`effect bg-${props.bg}`}></div>
			</div>
		</>
	)
}
