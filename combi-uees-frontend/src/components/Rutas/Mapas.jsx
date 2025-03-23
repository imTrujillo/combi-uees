import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../css/mapas.css";
import logo from "../../../public/marcador.png";

const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const defaultLat = 13.7060572;
const defaultLng = -89.212397;

export default function Mapas({ propRutaNombre, propLatitud, propLongitud }) {
  const isValidLat =
    !isNaN(propLatitud) && propLatitud >= -90 && propLatitud <= 90;
  const isValidLng =
    !isNaN(propLongitud) && propLongitud >= -180 && propLongitud <= 180;

  const lat = isValidLat ? parseFloat(propLatitud) : defaultLat;
  const lng = isValidLng ? parseFloat(propLongitud) : defaultLng;

  return (
    <MapContainer
      center={{ lat, lng }}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={{ lat, lng }} icon={customIcon}>
        <Popup>{propRutaNombre}</Popup>
      </Marker>
    </MapContainer>
  );
}
