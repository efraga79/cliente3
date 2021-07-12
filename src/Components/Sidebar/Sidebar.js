import React from 'react'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { Accordion, ListGroup } from 'react-bootstrap'

export default function Sidebar(props) {
	return (
		<>
		<div className="content-wrapper" style={{marginTop: '65px'}}>
			<div className="content-container">
				<div className="left-sidebar fixed-sidebar bg-black-300 box-shadow tour-three" id="smallNav">
					<div className="sidebar-content">
						<div className="user-info closed">
							<img src="http://placehold.it/90/c2c2c2?text=User" alt="John Doe" className="img-circle profile-img"/>
							<h6 className="title">John Doe</h6>
							<small className="info">PHP Developer</small>
						</div>
					</div>
					<div className="sidebar-nav">
						<ListGroup className="side-nav color-gray">
							<Accordion>
								{SidebarData.map((item, index) =>{
									return <SubMenu item={item} btn={index} key={index}/>
								})}
							</Accordion>
						</ListGroup>
					</div>
				</div>
				<div className="main-page">
					{props.children}
				</div>
			</div>
		</div>
		</>
	)
}