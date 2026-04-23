import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeafletDemo from '@/components/demos/LeafletDemo';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DemoLeafletContent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="border-b bg-secondary/30">
          <div className="section-container py-4">
            <Link to="/#demos">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('demos.back')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <LeafletDemo />
          </div>
        </div>
        <div className="border-t bg-secondary/30">
          <div className="section-container py-6">
            <h2 className="text-2xl font-bold mb-2">{t('demos.leaflet.title')}</h2>
            <p className="text-muted-foreground">{t('demos.leaflet.desc')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DemoLeaflet = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DemoLeafletContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default DemoLeaflet;
