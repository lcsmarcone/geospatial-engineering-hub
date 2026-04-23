import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Polygon, Cube, ArrowRight, X, ArrowsOut } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/data/translations';
import { Button } from '@/components/ui/button';
import LeafletDemoDirect from '@/components/demos/LeafletDemoDirect';
import OpenLayersDemo from '@/components/demos/OpenLayersDemo';
import MapboxDemo from '@/components/demos/MapboxDemo';
import DemoErrorBoundary from '@/components/demos/DemoWrapper';

interface Demo {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  usecaseKey: TranslationKey;
  technologies: string[];
  mapPreview: string;
  demoComponent: React.ComponentType;
  fullscreenPath: string;
  accentColor: string;
}

const demos: Demo[] = [
  {
    icon: Cube,
    titleKey: 'demos.mapbox.title',
    descKey: 'demos.mapbox.desc',
    usecaseKey: 'demos.mapbox.usecase',
    technologies: ['Mapbox GL JS', 'WebGL', '3D Buildings', 'Dark Style'],
    mapPreview: 'mapbox',
    demoComponent: MapboxDemo,
    fullscreenPath: '/demo/mapbox',
    accentColor: '#06b6d4',
  },
  {
    icon: MapPin,
    titleKey: 'demos.leaflet.title',
    descKey: 'demos.leaflet.desc',
    usecaseKey: 'demos.leaflet.usecase',
    technologies: ['Leaflet', 'CartoDB Tiles', 'Custom Markers', 'GeoJSON'],
    mapPreview: 'leaflet',
    demoComponent: LeafletDemoDirect,
    fullscreenPath: '/demo/leaflet',
    accentColor: '#ef4444',
  },
  {
    icon: Polygon,
    titleKey: 'demos.openlayers.title',
    descKey: 'demos.openlayers.desc',
    usecaseKey: 'demos.openlayers.usecase',
    technologies: ['OpenLayers', 'Vector Features', 'Select Interaction', 'CartoDB'],
    mapPreview: 'openlayers',
    demoComponent: OpenLayersDemo,
    fullscreenPath: '/demo/openlayers',
    accentColor: '#8b5cf6',
  },
];

const LeafletPreview = () => (
  <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-[#f2efe9] dark:bg-slate-900">
    {/* Ocean / sea on the right */}
    <div className="absolute right-0 top-0 h-full w-2/5 bg-[#aad3df]/70 dark:bg-blue-900/40" />
    {/* Stylized landmass */}
    <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <path d="M0,0 L140,0 L155,20 L150,50 L165,70 L160,110 L130,140 L80,150 L0,150 Z"
        className="fill-[#c8d9a2] dark:fill-slate-700/60" />
      {/* Roads */}
      <line x1="20" y1="75" x2="145" y2="60" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
      <line x1="70" y1="0" x2="80" y2="150" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
      <line x1="0" y1="100" x2="160" y2="95" stroke="#ffffff" strokeWidth="0.5" opacity="0.35" />
      {/* River */}
      <path d="M40,0 Q50,40 45,80 Q40,110 55,150" stroke="#7ecff0" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
    {/* City markers */}
    <div className="absolute left-[28%] top-[28%] flex h-3.5 w-3.5 items-center justify-center">
      <div className="h-3.5 w-3.5 animate-ping rounded-full bg-red-400 opacity-50" />
      <div className="absolute h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
    </div>
    <div className="absolute left-[48%] top-[50%] flex h-3.5 w-3.5 items-center justify-center animation-delay-150">
      <div className="h-3.5 w-3.5 animate-ping rounded-full bg-red-400 opacity-50 animation-delay-150" />
      <div className="absolute h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
    </div>
    <div className="absolute left-[62%] top-[22%] flex h-3.5 w-3.5 items-center justify-center">
      <div className="h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400 opacity-50 animation-delay-300" />
      <div className="absolute h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
    </div>
    <div className="absolute left-[18%] top-[62%] flex h-3.5 w-3.5 items-center justify-center">
      <div className="h-3.5 w-3.5 animate-ping rounded-full bg-amber-400 opacity-50 animation-delay-500" />
      <div className="absolute h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
    </div>
    <div className="absolute left-[38%] top-[72%] flex h-3.5 w-3.5 items-center justify-center">
      <div className="absolute h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
    </div>
    {/* Attribution */}
    <div className="absolute bottom-1 right-1 rounded bg-white/80 px-1 text-[8px] text-gray-500 dark:bg-black/50 dark:text-gray-400">
      © OpenStreetMap / CARTO
    </div>
    {/* Badge */}
    <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-black/60 dark:text-gray-300">
      13 cidades
    </div>
  </div>
);

const OpenLayersPreview = () => (
  <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-[#f8f9fa] dark:bg-slate-900/90">
    <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      {/* Subtle grid */}
      <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-700" />
      <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-700" />
      <line x1="66" y1="0" x2="66" y2="150" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-700" />
      <line x1="133" y1="0" x2="133" y2="150" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-700" />
      {/* Region polygons */}
      <polygon points="10,10 10,80 40,70 55,40 35,10" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.5" />
      <polygon points="120,5 155,15 160,55 135,60 110,35" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="55,40 40,70 60,100 95,90 100,50 80,30" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5" />
      <polygon points="60,100 95,90 140,105 130,140 50,145" fill="rgba(59,130,246,0.18)" stroke="#3b82f6" strokeWidth="1.5" />
      <polygon points="140,105 95,90 100,50 135,60 160,55 170,80 165,140 130,140" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1.5" />
      {/* City points */}
      <circle cx="24" cy="50" r="5" fill="#10b981" stroke="white" strokeWidth="1.5" />
      <circle cx="138" cy="35" r="5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
      <circle cx="76" cy="65" r="6" fill="#8b5cf6" stroke="white" strokeWidth="1.5" />
      <circle cx="93" cy="110" r="6" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
      <circle cx="108" cy="122" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
      <circle cx="148" cy="120" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
      {/* Scale line */}
      <line x1="10" y1="143" x2="50" y2="143" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" />
      <line x1="10" y1="139" x2="10" y2="143" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" />
      <line x1="50" y1="139" x2="50" y2="143" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" />
    </svg>
    {/* Attribution */}
    <div className="absolute bottom-1 right-1 rounded bg-white/80 px-1 text-[8px] text-gray-500 dark:bg-black/50 dark:text-gray-400">
      © CARTO
    </div>
    {/* Badge */}
    <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-black/60 dark:text-gray-300">
      5 regiões + clique
    </div>
  </div>
);

const MapboxPreview = () => (
  <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-[#191a2e]">
    {/* Dark basemap background */}
    <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
      {/* Road network */}
      <path d="M0,80 Q50,75 100,70 Q150,65 200,72" stroke="#334155" strokeWidth="2.5" fill="none" />
      <path d="M0,105 Q50,98 100,95 Q150,91 200,97" stroke="#334155" strokeWidth="1.5" fill="none" />
      <path d="M65,0 Q68,50 72,100 Q74,130 70,150" stroke="#334155" strokeWidth="2.5" fill="none" />
      <path d="M130,0 Q133,50 128,100 Q125,130 130,150" stroke="#334155" strokeWidth="1.5" fill="none" />
      <path d="M20,55 Q60,62 100,58 Q140,55 180,60" stroke="#1e293b" strokeWidth="1" fill="none" />
    </svg>
    {/* Water body */}
    <div className="absolute right-0 top-0 h-full w-1/4 opacity-40" style={{ background: 'linear-gradient(to left, #172554, transparent)' }} />
    {/* 3D Building extrusions */}
    <div className="absolute" style={{ left: '35%', bottom: '26%', width: 9, height: 32, background: 'linear-gradient(to top, #2563eb88, #1d4ed866)', borderRadius: '2px 2px 0 0', borderTop: '1px solid #3b82f6' }} />
    <div className="absolute" style={{ left: '42%', bottom: '26%', width: 13, height: 50, background: 'linear-gradient(to top, #7c3aed88, #5b21b666)', borderRadius: '2px 2px 0 0', borderTop: '1px solid #8b5cf6' }} />
    <div className="absolute" style={{ left: '52%', bottom: '26%', width: 9, height: 28, background: 'linear-gradient(to top, #0891b288, #0e7490aa)', borderRadius: '2px 2px 0 0', borderTop: '1px solid #06b6d4' }} />
    <div className="absolute" style={{ left: '60%', bottom: '26%', width: 11, height: 40, background: 'linear-gradient(to top, #10b98188, #059669aa)', borderRadius: '2px 2px 0 0', borderTop: '1px solid #10b981' }} />
    <div className="absolute" style={{ left: '46%', bottom: '26%', width: 7, height: 20, background: 'linear-gradient(to top, #f59e0b88, #d9770666)', borderRadius: '2px 2px 0 0', borderTop: '1px solid #f59e0b' }} />
    {/* Glowing data points */}
    <div className="absolute left-[22%] top-[30%] h-3 w-3 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
    <div className="absolute left-[52%] top-[50%] h-3 w-3 animate-pulse rounded-full bg-purple-400 shadow-[0_0_14px_rgba(167,139,250,0.9)] animation-delay-150" />
    <div className="absolute right-[28%] top-[22%] h-3 w-3 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)] animation-delay-300" />
    <div className="absolute left-[72%] top-[65%] h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] animation-delay-500" />
    {/* Attribution */}
    <div className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-[8px] text-gray-400">
      © Mapbox
    </div>
    {/* Badge */}
    <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-gray-300">
      3D · WebGL
    </div>
  </div>
);

const previewComponents: Record<string, React.ComponentType> = {
  leaflet: LeafletPreview,
  openlayers: OpenLayersPreview,
  mapbox: MapboxPreview,
};

const WebGISDemos = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeDemo, setActiveDemo] = useState<string | null>('mapbox');

  const activeData = demos.find(d => d.mapPreview === activeDemo);

  return (
    <section id="demos" className="relative bg-secondary/30 py-24" ref={ref}>
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('demos.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('demos.subtitle')}
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { value: '3',  labelKey: 'demos.stats.libraries' as const },
            { value: '14', labelKey: 'demos.stats.locations' as const },
            { value: '5',  labelKey: 'demos.stats.regions' as const },
            { value: '3D', labelKey: 'demos.stats.webgl' as const },
          ].map((stat) => (
            <div key={stat.labelKey} className="flex items-center gap-2 text-sm">
              <span className="text-lg font-bold text-primary">{stat.value}</span>
              <span className="text-muted-foreground">{t(stat.labelKey)}</span>
            </div>
          ))}
        </motion.div>

        {/* Demos grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {demos.map((demo, index) => {
            const PreviewComponent = previewComponents[demo.mapPreview];
            const isActive = activeDemo === demo.mapPreview;

            return (
              <motion.div
                key={demo.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'border-primary/60 shadow-glow'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
                style={{ background: isActive ? `linear-gradient(145deg, hsl(var(--card)), hsl(var(--card)))` : undefined }}
              >
                {/* Map preview */}
                <PreviewComponent />

                <div className="p-5">
                  {/* Icon & Title */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <demo.icon className="h-5 w-5 text-primary" weight="duotone" />
                      </div>
                      <h3 className="font-semibold">{t(demo.titleKey)}</h3>
                    </div>
                    {isActive && (
                      <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-3 text-xs text-muted-foreground">{t(demo.descKey)}</p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {demo.technologies.map((tech) => (
                      <span key={tech} className="tech-badge text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2 text-sm"
                      variant={isActive ? 'secondary' : 'default'}
                      onClick={() => setActiveDemo(isActive ? null : demo.mapPreview)}
                    >
                      {isActive ? (
                        <>
                          {t('demos.closeDemo')}
                          <X className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {t('demos.viewDemo')}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      asChild
                      title="Abrir em tela cheia"
                    >
                      <a href={demo.fullscreenPath}>
                        <ArrowsOut className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Demo Display */}
        <AnimatePresence mode="wait">
          {activeDemo && activeData && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                {/* Demo chrome header */}
                <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Window dots */}
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400/70" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
                      <div className="h-3 w-3 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex items-center gap-2">
                      <activeData.icon className="h-4 w-4 text-primary" weight="duotone" />
                      <span className="text-sm font-medium">{t(activeData.titleKey)}</span>
                      <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                        Interactive
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 gap-1.5 text-xs text-muted-foreground"
                      asChild
                    >
                      <a href={activeData.fullscreenPath}>
                        <ArrowsOut className="h-3.5 w-3.5" />
                        Tela cheia
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setActiveDemo(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative h-[580px] w-full bg-muted/30">
                  <DemoErrorBoundary>
                    {(() => {
                      const DemoComponent = activeData.demoComponent;
                      return <DemoComponent key={activeDemo} />;
                    })()}
                  </DemoErrorBoundary>
                </div>

                {/* Use case footer */}
                <div className="border-t border-border bg-secondary/30 px-4 py-2.5">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{t('demos.labels.usecase')}: </span>
                    {t(activeData.usecaseKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WebGISDemos;
