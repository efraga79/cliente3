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
	
	const noMsgDropdown = () => {
		document.getElementById('a').classList.remove('d-lg-block')
		document.getElementById('b').classList.remove('d-lg-block')
	}

	return (
		<Container>
			<Row onClick={() => noMsgDropdown()}>
				<Col xl="12">
					<div className="card border-primary p-2">
						<h4>{i18n.t('linear_td')}</h4>
						{console.log(treeData)}
						<DynamicTree key="root" id="root" data={treeData} title={i18n.t('linear_td')} />
					</div>
				</Col>
			</Row>
		</Container>
	)
}