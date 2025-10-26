import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'de' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('de')}
        className="gap-2"
      >
        🇩🇪 DE
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="gap-2"
      >
        🇬🇧 EN
      </Button>
    </div>
  );
};
