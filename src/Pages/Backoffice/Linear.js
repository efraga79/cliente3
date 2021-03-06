import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Col, Row } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'
import DynamicTree  from 'react-dynamic-animated-tree'

export default function Linear() {
	// const token = process.env.REACT_APP_USER_TOKEN;
	const token = sessionStorage.getItem('token');
	
	const [treeData, setTreeData] = useState([])
	
	useEffect(() => {
		const getLinear = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/Indicados/Indiretos/token/${token}`).then(success => {
				setTreeData(success.data.res)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
			document.title = `${i18n.t('linear_td')} | ${process.env.REACT_APP_NAME}`
		}
		getLinear()
	}, [token]);
	
	return (
		<Container>
			<Row>
				<Col xl="12">
					<h4>{i18n.t('linear_td')}</h4>
					<div className="card p-2 bg-dark">
						<DynamicTree key="root" id="root" data={treeData} title={i18n.t('linear_td')}  style={{color: '#fff'}}/>
					</div>
				</Col>
			</Row>
		</Container>
	)
}