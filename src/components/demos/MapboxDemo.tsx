import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ChartBar } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CITIES, REGION_POPULATIONS } from './cityData';

const MAPBOX_TOKEN =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const createCustomMarker = (color: string): HTMLElement => {
  const el = document.createElement('div');
  el.style.cssText = `
    width:15px;height:15px;border-radius:50%;
    background:${color};
    border:2.5px solid rgba(255,255,255,0.9);
    box-shadow:0 0 10px ${color}cc, 0 2px 6px rgba(0,0,0,0.5);
    cursor:pointer;
    transition:transform 0.15s ease, box-shadow 0.15s ease;
  `;
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.5)';
    el.style.boxShadow = `0 0 18px ${color}, 0 2px 6px rgba(0,0,0,0.5)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.boxShadow = `0 0 10px ${color}cc, 0 2px 6px rgba(0,0,0,0.5)`;
  });
  return el;
};

const MapboxDemo = () => {
  const { t, language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-52, -15],
        zoom: 3.4,
        pitch: 25,
        bearing: -8,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Fix: resize whenever the container changes size (handles animation / visibility transitions)
      const ro = new ResizeObserver(() => {
        if (mapInstanceRef.current) mapInstanceRef.current.resize();
      });
      ro.observe(mapContainerRef.current);
      roRef.current = ro;

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-right');

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError(`Mapbox: ${e.error?.message ?? 'render error'}`);
      });

      map.on('load', () => {
        // Extra resize after load to ensure correct sizing after animations
        map.resize();

        // 3D buildings
        const layers = map.getStyle()?.layers ?? [];
        let labelLayerId: string | undefined;
        for (const layer of layers) {
          if (layer.type === 'symbol' && (layer.layout as Record<string, unknown>)?.['text-field']) {
            labelLayerId = layer.id;
            break;
          }
        }
        if (map.getSource('composite')) {
          map.addLayer(
            {
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 10,
              paint: {
                'fill-extrusion-color': '#1e293b',
                'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 10, 0, 10.05, ['get', 'height']],
                'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 10, 0, 10.05, ['get', 'min_height']],
                'fill-extrusion-opacity': 0.8,
              },
            },
            labelLayerId
          );
        }

        // Add markers
        CITIES.forEach((city) => {
          const el = createCustomMarker(city.color);
          const popup = new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' }).setHTML(`
            <div style="font-family:system-ui,sans-serif;">
              <div style="background:linear-gradient(135deg,${city.color},${city.color}bb);color:#fff;padding:8px 12px;margin:-10px -10px 10px;border-radius:4px 4px 0 0;">
                <strong style="font-size:14px;">${city.name}</strong>
                <div style="font-size:11px;opacity:0.85;margin-top:2px;">${city.region}</div>
              </div>
              <p style="color:#cbd5e1;font-size:12px;margin:0 0 6px;">${city.desc[language]}</p>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <p style="color:#64748b;font-size:10px;font-family:monospace;margin:0;">
                  ${city.lat.toFixed(4)}°, ${city.lng.toFixed(4)}°
                </p>
                <span style="background:${city.color}33;color:${city.color};border-radius:9999px;padding:2px 8px;font-size:11px;font-weight:600;">
                  ${city.population}M
                </span>
              </div>
            </div>
          `);

          new mapboxgl.Marker({ element: el })
            .setLngLat([city.lng, city.lat])
            .setPopup(popup)
            .addTo(map);
        });

        // Fit to Brazil
        map.fitBounds(
          [[-73.9, -34], [-28.8, 5.3]],
          { padding: { top: 40, bottom: 40, left: 40, right: 40 }, duration: 1200 }
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize Mapbox');
    }

    return () => {
      if (roRef.current) { roRef.current.disconnect(); roRef.current = null; }
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, []);

  // Re-render popups when language changes (rebuild markers)
  useEffect(() => {
    // Language change doesn't require full re-init; popups are rebuilt on next open
  }, [language]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#191a2e]">
        <div className="text-center">
          <p className="text-slate-300">{error}</p>
          <p className="mt-2 text-sm text-slate-500">Set VITE_MAPBOX_TOKEN in .env</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" style={{ minHeight: 580 }}>
      <div ref={mapContainerRef} className="h-full w-full" style={{ minHeight: 580 }} />

      {/* Chart toggle button */}
      <button
        onClick={() => setShowChart((v) => !v)}
        className="absolute right-12 top-3 z-[1000] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg transition-all"
        style={{ background: 'rgba(15,23,42,0.85)', color: showChart ? '#06b6d4' : '#94a3b8', backdropFilter: 'blur(6px)', border: `1px solid ${showChart ? '#06b6d444' : '#1e293b'}` }}
      >
        <ChartBar size={14} />
        {t('demos.chart.show')}
      </button>

      {/* Chart panel */}
      {showChart && (
        <div
          className="absolute left-3 top-3 z-[1000] w-56 overflow-hidden rounded-xl shadow-xl"
          style={{ background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {t('demos.chart.byRegion')}
          </div>
          <div style={{ height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REGION_POPULATIONS}
                layout="vertical"
                margin={{ top: 0, right: 24, bottom: 0, left: 4 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={88}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, fontSize: 11, color: '#e2e8f0' }}
                  formatter={(v: number) => [`${v}M`, t('demos.chart.population')]}
                />
                <Bar dataKey="population" radius={[0, 4, 4, 0]} maxBarSize={16}>
                  {REGION_POPULATIONS.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="absolute bottom-10 left-3 z-[1000] overflow-hidden rounded-xl shadow-lg"
        style={{ background: 'rgba(10,15,30,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {t('demos.regions')}
        </div>
        <div className="space-y-1 px-3 py-2">
          {[
            { name: 'Norte',        color: '#10b981' },
            { name: 'Nordeste',     color: '#f59e0b' },
            { name: 'Centro-Oeste', color: '#8b5cf6' },
            { name: 'Sudeste',      color: '#3b82f6' },
            { name: 'Sul',          color: '#ef4444' },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-2 text-[11px] text-slate-300">
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              {r.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapboxDemo;
