import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Sample locations for demonstration
const locations = [
  { lat: -22.9068, lng: -43.1729, name: 'Rio de Janeiro', description: 'Cidade maravilhosa' },
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo', description: 'Maior cidade do Brasil' },
  { lat: -19.9167, lng: -43.9345, name: 'Belo Horizonte', description: 'Capital de Minas Gerais' },
  { lat: -15.7942, lng: -47.8822, name: 'Brasília', description: 'Capital do Brasil' },
  { lat: -30.0346, lng: -51.2177, name: 'Porto Alegre', description: 'Capital do Rio Grande do Sul' },
];

const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map]);
  
  return null;
};

const LeafletDemo = () => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/50">
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/50">
        <div className="text-center p-6">
          <p className="text-lg font-semibold text-destructive mb-2">Erro ao carregar mapa</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="h-full w-full" style={{ minHeight: '600px' }}>
        <MapContainer
          center={[-22.9068, -43.1729]}
          zoom={5}
          style={{ height: '100%', width: '100%', minHeight: '600px' }}
          scrollWheelZoom={true}
          key="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController />
          {locations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-lg">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Coordenadas: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  } catch (err) {
    console.error('LeafletDemo error:', err);
    setError(err instanceof Error ? err.message : 'Erro desconhecido');
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/50">
        <div className="text-center p-6">
          <p className="text-lg font-semibold text-destructive mb-2">Erro ao carregar mapa</p>
          <p className="text-sm text-muted-foreground">
            {err instanceof Error ? err.message : 'Erro desconhecido'}
          </p>
        </div>
      </div>
    );
  }
};

export default LeafletDemo;
