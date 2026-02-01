import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, 
  Browsers, 
  Database, 
  Cloud, 
  MapPinLine, 
  Desktop 
} from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/data/translations';

interface SkillCategory {
  icon: React.ElementType;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    titleKey: 'skills.programming.title',
    descKey: 'skills.programming.desc',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'REST APIs', 'Git & GitHub'],
  },
  {
    icon: Browsers,
    titleKey: 'skills.frameworks.title',
    descKey: 'skills.frameworks.desc',
    skills: ['Django', 'Next.js', 'React', 'FastAPI', 'Express.js', 'Tailwind CSS'],
  },
  {
    icon: Desktop,
    titleKey: 'skills.gis.title',
    descKey: 'skills.gis.desc',
    skills: ['QGIS', 'ArcGIS Pro', 'ArcGIS Online', 'ArcGIS Enterprise', 'GDAL/OGR', 'FME'],
  },
  {
    icon: Database,
    titleKey: 'skills.databases.title',
    descKey: 'skills.databases.desc',
    skills: ['PostgreSQL', 'PostGIS', 'SQL Server', 'MongoDB', 'Redis', 'TimescaleDB'],
  },
  {
    icon: MapPinLine,
    titleKey: 'skills.webmapping.title',
    descKey: 'skills.webmapping.desc',
    skills: ['OpenLayers', 'Leaflet', 'Mapbox GL JS', 'MapLibre', 'Turf.js', 'deck.gl'],
  },
  {
    icon: Cloud,
    titleKey: 'skills.cloud.title',
    descKey: 'skills.cloud.desc',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
];

const Skills = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('skills.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="skill-card group"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <category.icon className="h-6 w-6 text-primary" weight="duotone" />
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 text-lg font-semibold">{t(category.titleKey)}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t(category.descKey)}</p>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
