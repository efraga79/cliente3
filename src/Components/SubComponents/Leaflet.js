import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

export default function MapLeaflet(props) {
	return (
		<MapContainer center={[0,0]} zoom={1} scrollWheelZoom={true} style={{ width: "100%", height: "300px", overflow: 'hidden', zIndex: '0' }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{props.latlng.map((local, index) => {
				return (
					<Marker position={[local.latitude?local.latitude:0, local.longitude?local.longitude:0]} key={index}>
						<Popup>
							{local.usu_pais}
						</Popup>
					</Marker>
				)
			})}
		</MapContainer>
  	)
}