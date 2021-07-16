import React from 'react'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { Accordion, ListGroup } from 'react-bootstrap'

export default function Sidebar(props) {
	return (
		<>
			<div className="deznav">
				<div className="deznav-scroll">
					<ul className="metismenu" id="menu">
						{SidebarData.map((item, index) =>{
							return <SubMenu item={item} btn={index} key={index}/>
						})}
					</ul>
					<div class="copyright">
						<p>© {new Date().getFullYear()}. All right reserved </p>
						<p>{process.env.REACT_APP_NAME}</p>
					</div>
				</div>
			</div>
		</>
	)
}