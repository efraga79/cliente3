import React, { useEffect } from 'react'

import './assets/css/vendor/bicon.min.css'
import './assets/css/vendor/flaticon.css'
import './assets/css/style.css'

export default function ContainerBo(props) {
	useEffect(() => {
		const modernizr = document.createElement('script')
		modernizr.type = 'text/javascript'
		modernizr.src = '/assets/jsbo/vendor/modernizr-3.6.0.min.js'
		document.body.appendChild(modernizr)

		const isotope = document.createElement('script')
		isotope.type = 'text/javascript'
		isotope.src = '/assets/jsbo/plugins/isotope.pkgd.min.js'
		document.body.appendChild(isotope)

		return () => {
			document.body.removeChild(modernizr)
			document.body.removeChild(isotope)
		}
	}, [])

	return (
		<>
			<main>
				<div className="main-wrapper pt-80">
					{props.children}
				</div>
			</main>
			<div className="scroll-top not-visible">
				<i className="bi bi-finger-index"></i>
			</div>
		</>
	)
}
