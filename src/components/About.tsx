import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendUp, Briefcase, Lightning } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: TrendUp,
      title: t('about.highlight1.title'),
      value: t('about.highlight1.value'),
    },
    {
      icon: Briefcase,
      title: t('about.highlight2.title'),
      value: t('about.highlight2.value'),
    },
    {
      icon: Lightning,
      title: t('about.highlight3.title'),
      value: t('about.highlight3.value'),
    },
  ];

  return (
    <section id="about" className="relative py-24" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('about.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Story content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.p2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.p3')}
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="skill-card flex items-center gap-6"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-8 w-8 text-primary" weight="duotone" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gradient">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
