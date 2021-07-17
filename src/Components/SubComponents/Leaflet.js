import React from 'react'
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet'
import * as L from "leaflet"

export default function MapLeaflet(props) {
	
    const LeafIcon = L.Icon.extend({options: {}})

    const icon = new LeafIcon({
		iconUrl: '/logos/favicon.png',
		iconSize: [20, 20]
	})

	return (
		<MapContainer 
			center={[0,0]}
			zoom={1}	
			scrollWheelZoom={true}
			style={{ 
				width: "100%",
				height: "300px", 
				overflow: 'hidden', 
				zIndex: '0' 
			}}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{props.latlng.map((local, index) => {
				return (
					<Marker position={[local.latitude?local.latitude:0, local.longitude?local.longitude:0]} icon={icon} key={index}>
						<Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
							{local.usu_pais}
						</Tooltip>
						<Popup>
							{local.usu_pais}
						</Popup>
					</Marker>
				)
			})}
		</MapContainer>
  	)
}