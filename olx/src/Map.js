import React, { Component } from "react"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function MapContainer(props) {
    return (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCnZ1HsF5g-jDxoIwGN9gXR6pJpHqRvoCw"}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          style={{height:"100px", width:"100px"}}
        >
        </GoogleMapReact>
    );
}
 
export default MapContainer