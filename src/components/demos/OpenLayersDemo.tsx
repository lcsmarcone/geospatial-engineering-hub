import { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Point, Polygon as OLPolygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import 'ol/ol.css';
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { CITIES, REGIONS, type City } from './cityData';

const makePointStyle = (color: string, radius = 7) =>
  new Style({
    image: new Circle({
      radius,
      fill: new Fill({ color }),
      stroke: new Stroke({ color: '#ffffff', width: 2 }),
    }),
  });

const makeSelectedStyle = (color: string, name: string) =>
  new Style({
    image: new Circle({
      radius: 11,
      fill: new Fill({ color }),
      stroke: new Stroke({ color: '#ffffff', width: 2.5 }),
    }),
    text: new Text({
      text: name,
      font: 'bold 12px system-ui, sans-serif',
      offsetY: -20,
      fill: new Fill({ color: '#1e293b' }),
      stroke: new Stroke({ color: '#ffffff', width: 3 }),
    }),
  });

const OpenLayersDemo = () => {
  const { t, language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const [selected, setSelected] = useState<City | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current = null;
    }

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    // City points
    CITIES.forEach((city) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([city.lng, city.lat])),
        city,
      });
      feature.setStyle(makePointStyle(city.color, city.population > 5 ? 9 : 7));
      vectorSource.addFeature(feature);
    });

    // Approximate region polygons (demo areas)
    const regionPolygons = [
      { name: 'Norte',        color: '#10b981', coords: [[-73.9, 5.3], [-73.9, -14], [-44, -14], [-44, 0], [-50, 4], [-60, 5.3], [-73.9, 5.3]] as [number, number][] },
      { name: 'Nordeste',     color: '#f59e0b', coords: [[-48, 2.5], [-44, 0], [-44, -14], [-35, -14], [-34.5, -7], [-34.8, 0], [-42, 3], [-48, 2.5]] as [number, number][] },
      { name: 'Centro-Oeste', color: '#8b5cf6', coords: [[-60, -7.5], [-44, -14], [-44, -24], [-52, -24], [-58, -16], [-60, -7.5]] as [number, number][] },
      { name: 'Sudeste',      color: '#3b82f6', coords: [[-44, -14], [-35, -14], [-38, -24], [-44, -24], [-44, -14]] as [number, number][] },
      { name: 'Sul',          color: '#ef4444', coords: [[-52, -24], [-44, -24], [-48, -34], [-54, -34], [-54, -27], [-52, -24]] as [number, number][] },
    ];

    regionPolygons.forEach((rp) => {
      const poly = new Feature({
        geometry: new OLPolygon([[rp.coords.map((c) => fromLonLat(c))]]),
        regionName: rp.name,
      });
      poly.setStyle(
        new Style({
          fill: new Fill({ color: rp.color + '1a' }),
          stroke: new Stroke({ color: rp.color + '88', width: 1.5, lineDash: [5, 5] }),
        })
      );
      vectorSource.addFeature(poly);
    });

    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attributions:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
              '&copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 20,
          }),
        }),
        vectorLayer,
      ],
      view: new View({ center: fromLonLat([-52, -15]), zoom: 4 }),
    });

    mapInstanceRef.current = map;
    map.getView().fit(vectorSource.getExtent(), { padding: [60, 60, 60, 60], duration: 800 });

    map.on('click', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f, {
        hitTolerance: 7,
        layerFilter: (l) => l === vectorLayer,
      });

      // Reset all styles
      vectorSource.getFeatures().forEach((f) => {
        const c = f.get('city') as City | undefined;
        if (c) f.setStyle(makePointStyle(c.color, c.population > 5 ? 9 : 7));
      });

      if (feature) {
        const city = feature.get('city') as City | undefined;
        if (city) {
          feature.setStyle(makeSelectedStyle(city.color, city.name));
          setSelected(city);
          return;
        }
      }
      setSelected(null);
    });

    map.on('pointermove', (evt) => {
      const hit = map.hasFeatureAtPixel(evt.pixel, { hitTolerance: 7, layerFilter: (l) => l === vectorLayer });
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.setTarget(undefined); mapInstanceRef.current = null; }
    };
  }, []);

  // Build chart data for selected city's region
  const regionChartData = selected
    ? CITIES
        .filter((c) => c.region === selected.region)
        .sort((a, b) => b.population - a.population)
        .map((c) => ({ shortCode: c.shortCode, population: c.population, color: c.color, isSelected: c.name === selected.name, name: c.name }))
    : null;

  return (
    <div className="relative h-full w-full" style={{ minHeight: 580 }}>
      <div ref={mapRef} className="h-full w-full" style={{ minHeight: 580 }} />

      {/* Info + Chart panel */}
      <div className="absolute right-3 top-3 z-[1000] w-56 space-y-2">
        {selected ? (
          <>
            {/* City info card */}
            <div
              className="overflow-hidden rounded-xl shadow-lg"
              style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
            >
              <div
                className="px-3 py-2"
                style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`, color: '#fff' }}
              >
                <div className="font-semibold">{selected.name}</div>
                <div className="text-xs opacity-90">{selected.region}</div>
              </div>
              <div className="px-3 py-2">
                <p className="text-xs text-gray-600">{selected.desc[language]}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-mono text-[10px] text-gray-400">
                    {selected.lat.toFixed(4)}°, {selected.lng.toFixed(4)}°
                  </p>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ background: selected.color + '22', color: selected.color }}
                  >
                    {selected.population}M
                  </span>
                </div>
              </div>
            </div>

            {/* Region comparison chart */}
            {regionChartData && (
              <div
                className="overflow-hidden rounded-xl shadow-lg"
                style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', border: '1px solid #e2e8f0' }}
              >
                <div className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {t('demos.chart.regionCompare')}
                </div>
                <div style={{ height: regionChartData.length * 26 + 12 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionChartData}
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
                      <ReferenceLine x={0} stroke="#e2e8f0" />
                      <Bar dataKey="population" radius={[0, 4, 4, 0]} maxBarSize={14}>
                        {regionChartData.map((entry) => (
                          <Cell
                            key={entry.shortCode}
                            fill={entry.color}
                            opacity={entry.isSelected ? 1 : 0.45}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className="rounded-xl px-3 py-2.5 shadow-md"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', border: '1px solid #e2e8f0' }}
          >
            <p className="text-center text-[11px] text-gray-500">{t('demos.clickCity')}</p>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default OpenLayersDemo;
