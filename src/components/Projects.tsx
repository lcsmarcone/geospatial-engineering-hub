import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/data/translations';

interface Project {
  id: number;
  titleKey: TranslationKey;
  contextKey: TranslationKey;
  challengeKey: TranslationKey;
  solutionKey: TranslationKey;
  impactKey: TranslationKey;
  stack: string[];
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: 'projects.project1.title',
    contextKey: 'projects.project1.context',
    challengeKey: 'projects.project1.challenge',
    solutionKey: 'projects.project1.solution',
    impactKey: 'projects.project1.impact',
    stack: ['React', 'PostGIS', 'TimescaleDB', 'Django', 'WebSocket'],
  },
  {
    id: 2,
    titleKey: 'projects.project2.title',
    contextKey: 'projects.project2.context',
    challengeKey: 'projects.project2.challenge',
    solutionKey: 'projects.project2.solution',
    impactKey: 'projects.project2.impact',
    stack: ['OpenLayers', 'Django REST', 'PostGIS', 'MapProxy', 'Docker'],
  },
  {
    id: 3,
    titleKey: 'projects.project3.title',
    contextKey: 'projects.project3.context',
    challengeKey: 'projects.project3.challenge',
    solutionKey: 'projects.project3.solution',
    impactKey: 'projects.project3.impact',
    stack: ['Python', 'GDAL', 'Rasterio', 'Celery', 'AWS ECS', 'Vector Tiles'],
  },
  {
    id: 4,
    titleKey: 'projects.project4.title',
    contextKey: 'projects.project4.context',
    challengeKey: 'projects.project4.challenge',
    solutionKey: 'projects.project4.solution',
    impactKey: 'projects.project4.impact',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Mapbox GL JS', 'Redis'],
  },
];

const Projects = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<number | null>(1);

  return (
    <section id="projects" className="relative bg-secondary/30 py-24" ref={ref}>
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
            {t('projects.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`skill-card cursor-pointer ${
                expandedProject === project.id ? 'border-primary/50 shadow-glow' : ''
              }`}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              {/* Project header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t(project.titleKey)}</h3>
                <ArrowRight 
                  className={`h-5 w-5 text-primary transition-transform ${
                    expandedProject === project.id ? 'rotate-90' : ''
                  }`} 
                  weight="bold" 
                />
              </div>

              {/* Stack badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedProject === project.id ? 'auto' : 0,
                  opacity: expandedProject === project.id ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 border-t border-border pt-4">
                  {/* Context */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('projects.labels.context')}
                    </p>
                    <p className="text-sm text-muted-foreground">{t(project.contextKey)}</p>
                  </div>

                  {/* Challenge */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('projects.labels.challenge')}
                    </p>
                    <p className="text-sm text-muted-foreground">{t(project.challengeKey)}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {t('projects.labels.solution')}
                    </p>
                    <p className="text-sm text-muted-foreground">{t(project.solutionKey)}</p>
                  </div>

                  {/* Impact */}
                  <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" weight="fill" />
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {t('projects.labels.impact')}
                      </p>
                      <p className="text-sm font-medium">{t(project.impactKey)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
