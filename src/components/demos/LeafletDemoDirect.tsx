import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ChartBar } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CITIES, REGIONS } from './cityData';

const chartData = [...CITIES]
  .sort((a, b) => b.population - a.population)
  .map((c) => ({ shortCode: c.shortCode, population: c.population, color: c.color, name: c.name }));

const createCircleIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:13px;height:13px;border-radius:50%;
      background:${color};
      border:2.5px solid white;
      box-shadow:0 0 8px ${color}99, 0 2px 4px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [13, 13],
    iconAnchor: [6, 6],
  });

const LeafletDemoDirect = () => {
  const { t, language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const initMap = () => {
      if (!mapRef.current) { setIsLoading(false); return; }

      try {
        const map = L.map(mapRef.current, {
          center: [-15, -52],
          zoom: 4,
          scrollWheelZoom: true,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
            '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }).addTo(map);

        L.control.scale({ metric: true, imperial: false, position: 'bottomright' }).addTo(map);

        mapInstanceRef.current = map;

        CITIES.forEach((city) => {
          const marker = L.marker([city.lat, city.lng], { icon: createCircleIcon(city.color) }).addTo(map);
          marker.bindPopup(
            `<div style="min-width:180px;font-family:system-ui,sans-serif;">
              <div style="background:linear-gradient(135deg,${city.color},${city.color}bb);color:#fff;padding:8px 12px;margin:-8px -12px 10px;border-radius:4px 4px 0 0;">
                <strong style="font-size:14px;">${city.name}</strong>
                <div style="font-size:11px;opacity:0.9;margin-top:2px;">${city.region}</div>
              </div>
              <p style="color:#555;font-size:12px;margin:0 0 8px;">${city.desc[language]}</p>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <p style="color:#aaa;font-size:10px;font-family:monospace;margin:0;">${city.lat.toFixed(4)}°, ${city.lng.toFixed(4)}°</p>
                <span style="background:${city.color}22;color:${city.color};border-radius:9999px;padding:2px 8px;font-size:11px;font-weight:600;">${city.population}M</span>
              </div>
            </div>`,
            { maxWidth: 220 }
          );
        });

        const bounds = L.latLngBounds(CITIES.map((c) => [c.lat, c.lng]));
        map.fitBounds(bounds, { padding: [40, 40] });

        timer = setTimeout(() => setIsLoading(false), 500);
      } catch {
        setIsLoading(false);
      }
    };

    const rafId = requestAnimationFrame(() => setTimeout(initMap, 100));

    return () => {
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full" style={{ minHeight: 580 }}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-muted/60">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">{t('demos.loading')}</p>
        </div>
      )}

      <div ref={mapRef} className="h-full w-full" style={{ minHeight: 580, visibility: isLoading ? 'hidden' : 'visible' }} />

      {!isLoading && (
        <>
          {/* Chart toggle */}
          <button
            onClick={() => setShowChart((v) => !v)}
            className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shadow-md transition-all"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: showChart ? 'hsl(173 80% 30%)' : '#64748b',
              backdropFilter: 'blur(6px)',
              border: `1px solid ${showChart ? 'hsl(173 80% 30% / 0.3)' : '#e2e8f0'}`,
            }}
          >
            <ChartBar size={14} />
            {t('demos.chart.show')}
          </button>

          {/* Chart panel */}
          {showChart && (
            <div
              className="absolute right-3 top-12 z-[1000] w-60 overflow-hidden rounded-xl shadow-xl"
              style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', border: '1px solid #e2e8f0' }}
            >
              <div className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {t('demos.chart.population')}
              </div>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="shortCode"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      width={34}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                      contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 11 }}
                      formatter={(v: number, _k, props) => [
                        `${v}M — ${(props.payload as { name: string }).name}`,
                        t('demos.chart.population'),
                      ]}
                    />
                    <Bar dataKey="population" radius={[0, 4, 4, 0]} maxBarSize={14}>
                      {chartData.map((entry) => (
                        <Cell key={entry.shortCode} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Legend */}
          <div
            className="absolute bottom-8 left-3 z-[1000] overflow-hidden rounded-xl shadow-lg"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
          >
            <div className="bg-slate-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
              {t('demos.regions')}
            </div>
            <div className="space-y-1 px-3 py-2">
              {REGIONS.map((r) => (
                <div key={r.name} className="flex items-center gap-2 text-[11px] text-gray-700">
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                  {r.name}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeafletDemoDirect;
