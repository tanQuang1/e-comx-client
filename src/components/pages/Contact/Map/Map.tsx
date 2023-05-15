import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
const defaultPosition = {
  lat: 10.548208,
  lng: 108.9377336,
  zoom: 15,
};
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

const Map = () => {
  return (
    <MapContainer
      style={{ height: '450px', width: '100%' }}
      center={[defaultPosition.lat, defaultPosition.lng]}
      zoom={defaultPosition.zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[defaultPosition.lat, defaultPosition.lng]} alt='Dukamarket'>
        <Popup>Dukamarket</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
