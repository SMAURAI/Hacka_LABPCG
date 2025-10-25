'use client';

import GeoMap from '../components/GeoMap';
import pontos from '../data/pontos.json';

export default function Page() {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
          Mapa dos Pontos de Coletas
        </h1>
        <p style={{ margin: '0.25rem 0 0', color: '#4b5563' }}>
          Encontre um ponto de coleta (clique nos marcadores).
        </p>
      </header>
      <section style={{ position: 'relative' }}>
        <GeoMap pontos={pontos} style={{ position: 'absolute', inset: 0 }} />
      </section>
    </main>
  );
}
