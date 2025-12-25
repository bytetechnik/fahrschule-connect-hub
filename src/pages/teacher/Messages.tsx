import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import MessagingInterface from '@/components/messaging/MessagingInterface';

const TeacherMessages = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('messages')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {t('language') === 'de' ? 'Kommunizieren Sie mit Schülern und der Verwaltung' : 'Communicate with students and administration'}
          </p>
        </div>

        <MessagingInterface userRole="teacher" />
      </div>
    </Layout>
  );
};

export default TeacherMessages;