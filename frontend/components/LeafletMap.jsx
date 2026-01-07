"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LeafletMap() {
  return (
    <MapContainer
      //Leefleet container - treba napraviti scss
      // Border radius inherit napraviti i tjt
      className="mapRadius"
      center={[45.25167, 19.83694]}
      zoom={3}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[45.25167, 19.83694]}>
        <Popup>Radnik 1</Popup>
      </Marker>
    </MapContainer>
  );
}
