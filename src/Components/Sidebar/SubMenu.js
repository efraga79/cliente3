import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Accordion, ListGroupItem } from 'react-bootstrap'

const SubMenu = (props) => {
	const [subnav, setSubnav] = useState(false)
	const showSubnav = () => setSubnav(!subnav)

	return (
		<>
			{props.item.subNav ? 
				<>
					<li key={props.btn} onClick={props.item.subNav && showSubnav}>
						<a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
							{props.item.icon}
							<span className="nav-text"> {props.item.title}</span>
						</a>
						<ul aria-expanded="false">
							{props.item.subNav.map((subItem, indice) => {
								return (<Link to={subItem.path} key={indice}><li>{subItem.icon} {subItem.title}</li></Link>)
							})}
						</ul>
					</li>
				</> 
				:
				<li><Link to={props.item.path} className="ai-icon" aria-expanded="false">{props.item.icon}<span className="nav-text"> {props.item.title}</span></Link></li>
			}
		</>
	)
}

export default SubMenu