import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import MessagingInterface from '@/components/messaging/MessagingInterface';

const AdminMessages = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('messages')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {t('language') === 'de' ? 'Kommunizieren Sie mit Lehrern und Schülern' : 'Communicate with teachers and students'}
          </p>
        </div>

        <MessagingInterface userRole="admin" />
      </div>
    </Layout>
  );
};

export default AdminMessages;