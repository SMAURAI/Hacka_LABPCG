'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// carrega o “inner” só no client; nada de SSR aqui
const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), { ssr: false });

function centerFromPoints(points, fallback = [-12.97, -38.51]) {
  if (!points?.length) return fallback;
  const lat = points.reduce((s, p) => s + p.pos[0], 0) / points.length;
  const lng = points.reduce((s, p) => s + p.pos[1], 0) / points.length;
  return [lat, lng];
}

export default function GeoMap({ pontos = [], zoom = 13, className, style }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const center = useMemo(() => centerFromPoints(pontos), [pontos]);

  // configura ícones do Leaflet somente no client
  useEffect(() => {
    if (!mounted) return;
    (async () => {
      const L = (await import('leaflet')).default;
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    })();
  }, [mounted]);

  if (!mounted) return null; // impede qualquer hidratação dupla

  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <LeafletMapInner center={center} zoom={zoom} pontos={pontos} />
    </div>
  );
}
