import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import { i18n } from '../Translates/i18n'

export default function Modals(props) {
  return (
    <Modal {...props} size={props.size} aria-labelledby="contained-modal-title-vcenter" >
		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
				{props.title}
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{props.children}
		</Modal.Body>
		<Modal.Footer>
			<Button onClick={props.onHide}>{i18n.t('fechar_td')}</Button>
		</Modal.Footer>
    </Modal>
  );
}
