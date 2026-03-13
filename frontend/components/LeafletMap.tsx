"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapHook } from "@/hooks/useMapHook";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fix za defaultne ikone
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LeafletMap() {
  const { location } = useMapHook();

  return (
    <MapContainer
      //Leefleet container - treba napraviti scss
      // Border radius inherit napraviti i tjt
      className="mapRadius"
      center={[45.25167, 19.83694]}
      zoom={3}
      minZoom={2.5}
      maxZoom={20}
      maxBounds={[[-90, -180], [90, 180]]}
  maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {location.map((loc) => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <h4>PROJECT - {loc.name}</h4>
            
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
