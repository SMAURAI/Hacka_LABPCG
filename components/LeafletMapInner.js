'use client';

import { memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Este componente NUNCA importa 'leaflet' (L) no topo.
// Só renderiza o MapContainer; React.memo evita re-renders desnecessários.
function LeafletMapInner({ center, zoom, pontos }) {
  return (
    <MapContainer
      key="leaflet-map"               // força novo container se o React tentar reciclar
      center={center}
      zoom={zoom}
      scrollWheelZoom
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {pontos.map((p) => (
        <Marker key={p.id} position={p.pos}>
          <Popup>
            <strong>{p.nome}</strong>
            {p.descricao ? <><br />{p.descricao}</> : null}
            <br />
            <small>Lat: {p.pos[0].toFixed(5)} | Lng: {p.pos[1].toFixed(5)}</small>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default memo(LeafletMapInner);
