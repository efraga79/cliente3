import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Accordion, ListGroupItem } from 'react-bootstrap'

const SubMenu = (props) => {
	const [subnav, setSubnav] = useState(false)
	const showSubnav = () => setSubnav(!subnav)

	const closeMenu = () => {
		document.getElementById('dropdown-menu').setAttribute('aria-expanded', false);
		let drpdmn = document.getElementsByClassName('dropdown-menu')[0];
		if(drpdmn){
			drpdmn.classList.remove('show');
		}
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.remove('d-lg-block')
	}
	return (
		<>
			{props.item.subNav ? 
				<>
					<Accordion.Toggle as={ListGroupItem} variant="link" eventKey={props.btn} onClick={props.item.subNav && showSubnav}>
						{props.item.icon} {props.item.title}
						<span className="float-right">{props.item.subNav && subnav ? props.item.iconOpened : props.item.subNav ? props.item.iconClosed : null}</span>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={props.btn}>
						<>
							{props.item.subNav.map((subItem, indice) => {
								return (<Link to={subItem.path} key={indice} className="p-0" onClick={() => closeMenu()}><ListGroupItem tag="button" action> <span className="ml-3">{subItem.icon} {subItem.title}</span></ListGroupItem></Link>)
							})}
						</>
					</Accordion.Collapse>
				</> 
				:
				<Link to={props.item.path} className="p-0" onClick={() => closeMenu()}><ListGroupItem tag="button" action>{props.item.icon} {props.item.title}</ListGroupItem></Link>
			}
		</>
	)
}

export default SubMenu