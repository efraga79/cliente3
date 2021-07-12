import React from 'react'
import { Badge, Card, ListGroup } from 'react-bootstrap'

export default function CardOrder (props){
	return (
		<Card bg={props.bg} text={props.color} className="mb-4">
			<Card.Header className={`bg-${props.status}`}>
				<h5 className="m-1 text-white">{props.title}</h5>
				<h4 className="m-1 text-white">{props.subtitle}</h4>
			</Card.Header>
			{props.list ? 
				<ListGroup variant="flush">
					{props.list.map((item, index) => {
						return (
							item.visible ?
							<ListGroup.Item key={index} className={`bg-${props.bg}`}>
								{item.badge
								? <>{item.title}: <Badge variant={item.badge} style={{fontSize:'1em'}}>{item.valor}</Badge></>
								:<>{item.title}: {item.valor}</>
								}
							</ListGroup.Item>
							: ''
						)
					})}
				</ListGroup>
			:''}
			{props.children}
		</Card>
	)
}
