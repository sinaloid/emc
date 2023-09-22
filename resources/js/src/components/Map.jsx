import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import GpsIMG from "./imgs/GpsIMG";
import gps from "../assets/imgs/gps.svg"
import PubCard from "./PubCard";


const Map = () => {
    const markers = [
        { position: [11.1875346, -4.3051642], message: 'Premier marqueur' },
        { position: [11.1875146, -4.305164201], message: 'Premier marqueur' },
        { position: [48.8584, -0.1278], message: 'Deuxième marqueur' }
      ];
  const position = [48.8584, 2.2945];
  const zoomLevel = 13;

  const myIcon = L.icon({
    iconUrl: gps,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  return (
    <MapContainer center={markers[0].position} zoom={zoomLevel} style={{ height: '70vh' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {markers.map((marker, idx) => (
      <Marker key={idx} position={marker.position} icon={myIcon}>
        <Popup>
          <PubCard />
        </Popup>
      </Marker>
    ))}
  </MapContainer>
  );
};

export default Map;
