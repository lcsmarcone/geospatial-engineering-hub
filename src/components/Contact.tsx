import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactLinks = [
    {
      icon: GithubLogo,
      label: t('contact.github'),
      href: 'https://github.com',
      value: 'github.com/geostack',
    },
    {
      icon: LinkedinLogo,
      label: t('contact.linkedin'),
      href: 'https://linkedin.com',
      value: 'linkedin.com/in/geostack',
    },
    {
      icon: EnvelopeSimple,
      label: t('contact.email'),
      href: 'mailto:contact@geostack.dev',
      value: 'contact@geostack.dev',
    },
  ];

  return (
    <section id="contact" className="relative bg-secondary/30 py-24" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="skill-card flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <link.icon className="h-6 w-6 text-primary" weight="duotone" />
                </div>
                <p className="mb-1 text-sm font-medium">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-3">
              <MapPin className="h-5 w-5 text-primary" weight="fill" />
              <p className="text-sm font-medium text-muted-foreground">
                {t('contact.closing')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
