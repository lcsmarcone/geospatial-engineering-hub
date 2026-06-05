import { useLanguage } from '@/contexts/LanguageContext';
import BrandMark from '@/components/BrandMark';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BrandMark className="h-9 w-9" />
            <span className="text-lg font-semibold tracking-tight">Lucas Marcone</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Lucas Marcone. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
