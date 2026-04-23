import { motion } from 'framer-motion';
import { MapPin, Code, ArrowDown } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-hero-gradient pt-16">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Decorative elements */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-float rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-float rounded-full bg-primary/10 blur-3xl animation-delay-300" />

      <div className="section-container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" weight="fill" />
            <span className="text-muted-foreground">Lucas Marcone - GIS & Full-Stack Developer</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">{t('hero.title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="group gap-2 bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
            asChild
          >
            <a href="#projects">
              <MapPin className="h-5 w-5" weight="bold" />
              {t('hero.cta.projects')}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            asChild
          >
            <a href="#skills">
              <Code className="h-5 w-5" weight="bold" />
              {t('hero.cta.skills')}
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" weight="bold" />
          </motion.div>
        </motion.div>

        {/* Tech badges floating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute left-8 top-1/3 hidden rotate-12 lg:block"
        >
          <div className="tech-badge">PostGIS</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute right-12 top-1/4 hidden -rotate-6 lg:block"
        >
          <div className="tech-badge">React</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-1/3 right-16 hidden rotate-3 lg:block"
        >
          <div className="tech-badge">Python</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-1/4 left-16 hidden -rotate-12 lg:block"
        >
          <div className="tech-badge">Django</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
