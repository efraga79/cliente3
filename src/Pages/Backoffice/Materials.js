import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Col, Row, Table, Button, Form, Image, InputGroup } from 'react-bootstrap'
import { i18n } from '../../Components/Translates/i18n'
import Modals from '../../Components/SubComponents/Modals'
import * as FaIcons from 'react-icons/fa'

export default function Materials() {
	document.title = `${i18n.t('materiais_td')} | ${process.env.REACT_APP_NAME}`
	const token = sessionStorage.getItem('token');

	const [files, setFiles] = useState([])
	const [fileDados, setFileDados] = useState([])
	const [embed, setEmbed] = useState([])

	useEffect(() => {
		const getMaterials = () => {
			window.scrollTo(0, 0)
			axios.get(`${process.env.REACT_APP_URL_API}/Arquivos/ver_arquivos/token/${token}`).then(success => {
				setFiles(success.data.files)
			}).catch(error => {
				console.log(error)
				sessionStorage.removeItem('token')
				let local = window.location
				window.location = local
			})
		}
		getMaterials()
	}, [token])

	const [modalShow, setModalShow] = useState(false);

	const verFile = data => {
		axios.post(`${process.env.REACT_APP_URL_API}/Arquivos/getFile/token/${token}`,data).then(success => {
			setFileDados(success.data.fileDados)
			let emb = success.data.fileDados.a_arquivo.split('?v=') 
			setEmbed(emb)
			setModalShow(true)
		}).catch(error => {
			console.log(error)
			/* sessionStorage.removeItem('token')
			let local = window.location
			window.location = local */
		})
	}

	const [copySuccess, setCopySuccess] = useState('');
	
	function copyFileToClipboard(e) {
		const copyLink = document.getElementById('copyLink');
		copyLink.select();
		document.execCommand('copy');
		e.target.focus();
		setCopySuccess('Copied!');
	};

	return (
		<Container>
			<Row>
				<Col>
					<div className="p-2 card border-primary">
						<h4>{i18n.t('materiais_td')}</h4>
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th className="text-left">{i18n.t('nome_td')}</th>
									<th>{i18n.t('tipo_td')}</th>
									<th>{i18n.t('data_td')}</th>
								</tr>
							</thead>
							<tbody>
								{files ? files.map((file, index) => {
									return (
										<tr key={index}>
											<td className="text-left">
												<Button variant="primary" onClick={e => verFile(file.a_id)}>{file.a_nome}</Button>
											</td>
											<td>{file.a_tipo}</td>
											<td>{file.a_data}</td>
										</tr>
									)
								})
								: ''}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
			{modalShow ?
				<Modals
					size="lg"
					title={fileDados.a_nome}
					// contentClassName="bg-dark"
					show={modalShow}
					onHide={() => setModalShow(false)}
				>
					<Row>
						{!fileDados
						? ''
						: fileDados.a_tipo === 'video'
						? <video src={`/files/${fileDados.a_arquivo}`} controls autoplay style={{width:'100%', height:'60vh'}}></video>
						: fileDados.a_tipo === 'application'
						? <iframe src={`/files/${fileDados.a_arquivo}`} title="app" frameBorder="0" style={{width:'100%',height:'60vh'}}></iframe>
						: fileDados.a_tipo === 'youtube'
						? <>
							<iframe src={`https://www.youtube.com/embed/${embed[1]}`} title="yt" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{width:'100%', height:'60vh'}}></iframe>
							<InputGroup>
								<Form.Control type="text" readOnly id={`copyLink`} value={fileDados.a_arquivo} />
								<InputGroup.Append>
									<Button variant="secondary" onClick={copyFileToClipboard}><FaIcons.FaCopy /> {copySuccess?copySuccess:'Copy'}</Button>
								</InputGroup.Append>
							</InputGroup>
						  </>
						: <Image src={`/files/${fileDados.a_arquivo}`} />}
					</Row>
				</Modals>
			: ''}
		</Container>
	)
}