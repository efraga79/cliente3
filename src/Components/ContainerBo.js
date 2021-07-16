import React from 'react'
import { Link } from 'react-router-dom'

export default function ContainerBo(props) {
	return (
		<div id="main-wrapper">
			{props.children}
		</div>
	)
}
