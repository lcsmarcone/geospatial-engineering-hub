import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Browser, 
  HardDrives, 
  Database, 
  Cloud,
  ArrowRight,
  Check
} from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/data/translations';

interface ArchitectureLayer {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
}

const layers: ArchitectureLayer[] = [
  {
    icon: Browser,
    titleKey: 'architecture.frontend.title',
    descKey: 'architecture.frontend.desc',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: HardDrives,
    titleKey: 'architecture.backend.title',
    descKey: 'architecture.backend.desc',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Database,
    titleKey: 'architecture.database.title',
    descKey: 'architecture.database.desc',
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    icon: Cloud,
    titleKey: 'architecture.cloud.title',
    descKey: 'architecture.cloud.desc',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

const Architecture = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const principles = [
    t('architecture.principles.p1'),
    t('architecture.principles.p2'),
    t('architecture.principles.p3'),
    t('architecture.principles.p4'),
  ];

  return (
    <section id="architecture" className="relative py-24" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('architecture.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('architecture.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {layers.map((layer, index) => (
              <motion.div
                key={layer.titleKey}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <div className={`skill-card bg-gradient-to-r ${layer.color}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/80">
                      <layer.icon className="h-6 w-6 text-primary" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{t(layer.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(layer.descKey)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Connection arrow */}
                {index < layers.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-5 w-5 rotate-90 text-primary/50" weight="bold" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Engineering principles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="skill-card h-full">
              <h3 className="mb-6 text-xl font-semibold">{t('architecture.principles.title')}</h3>
              <div className="space-y-4">
                {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" weight="bold" />
                    </div>
                    <p className="text-muted-foreground">{principle}</p>
                  </motion.div>
                ))}
              </div>

              {/* Visual diagram representation */}
              <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded bg-blue-500/20 px-2 py-1">React/Next.js</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="rounded bg-green-500/20 px-2 py-1">Django/Node</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="rounded bg-orange-500/20 px-2 py-1">PostGIS</span>
                </div>
                <div className="mt-3 flex justify-center">
                  <span className="rounded bg-purple-500/20 px-2 py-1 text-xs">AWS / Azure</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
