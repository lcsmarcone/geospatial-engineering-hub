import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Polygon, Cube } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/data/translations';

interface Demo {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  usecaseKey: TranslationKey;
  technologies: string[];
  mapPreview: string;
}

const demos: Demo[] = [
  {
    icon: MapPin,
    titleKey: 'demos.leaflet.title',
    descKey: 'demos.leaflet.desc',
    usecaseKey: 'demos.leaflet.usecase',
    technologies: ['Leaflet', 'React-Leaflet', 'GeoJSON', 'OpenStreetMap'],
    mapPreview: 'leaflet',
  },
  {
    icon: Polygon,
    titleKey: 'demos.openlayers.title',
    descKey: 'demos.openlayers.desc',
    usecaseKey: 'demos.openlayers.usecase',
    technologies: ['OpenLayers', 'Vector Tiles', 'WFS', 'GML'],
    mapPreview: 'openlayers',
  },
  {
    icon: Cube,
    titleKey: 'demos.mapbox.title',
    descKey: 'demos.mapbox.desc',
    usecaseKey: 'demos.mapbox.usecase',
    technologies: ['Mapbox GL JS', 'WebGL', 'Mapbox Studio', '3D Terrain'],
    mapPreview: 'mapbox',
  },
];

const WebGISDemos = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const renderMapPreview = (type: string) => {
    // Stylized map preview representation
    const baseClasses = 'relative h-48 w-full overflow-hidden rounded-lg';
    
    if (type === 'leaflet') {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-green-900/20 to-blue-900/30`}>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,hsl(var(--border)/0.3)_50%,transparent_51%)] bg-[length:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,hsl(var(--border)/0.3)_50%,transparent_51%)] bg-[length:20px_20px]" />
          <div className="absolute left-1/4 top-1/3 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animation-delay-150" />
          <div className="absolute left-2/3 top-1/4 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animation-delay-300" />
        </div>
      );
    }
    
    if (type === 'openlayers') {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-slate-900/40 to-slate-800/30`}>
          <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 200 100">
            <polygon 
              points="20,80 40,30 80,50 60,90" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1"
              className="opacity-70"
            />
            <polygon 
              points="100,20 130,40 120,80 90,60" 
              fill="hsl(var(--primary)/0.2)" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1"
            />
            <polygon 
              points="140,50 180,30 190,70 160,90 130,70" 
              fill="hsl(var(--primary)/0.1)" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1"
              className="opacity-80"
            />
          </svg>
        </div>
      );
    }
    
    if (type === 'mapbox') {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-blue-900/30`}>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent" />
          <div className="absolute bottom-4 left-1/4 h-16 w-6 bg-gradient-to-t from-primary/40 to-primary/10 rounded-t" />
          <div className="absolute bottom-4 left-1/3 h-24 w-6 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t" />
          <div className="absolute bottom-4 left-1/2 h-20 w-6 bg-gradient-to-t from-primary/45 to-primary/15 rounded-t" />
          <div className="absolute bottom-4 left-2/3 h-28 w-6 bg-gradient-to-t from-primary/60 to-primary/25 rounded-t" />
        </div>
      );
    }
    
    return null;
  };

  return (
    <section id="demos" className="relative bg-secondary/30 py-24" ref={ref}>
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('demos.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('demos.subtitle')}
          </p>
        </motion.div>

        {/* Demos grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="skill-card overflow-hidden p-0"
            >
              {/* Map preview */}
              {renderMapPreview(demo.mapPreview)}
              
              <div className="p-6">
                {/* Icon & Title */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <demo.icon className="h-5 w-5 text-primary" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-semibold">{t(demo.titleKey)}</h3>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground">{t(demo.descKey)}</p>

                {/* Use case */}
                <div className="mb-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('demos.labels.usecase')}
                  </p>
                  <p className="text-sm text-muted-foreground">{t(demo.usecaseKey)}</p>
                </div>

                {/* Technologies */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {t('demos.labels.tech')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {demo.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebGISDemos;
