import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLessons } from '@/lib/mockData';

const AdminLessons = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('recordedLessons')}</h1>
          <p className="text-muted-foreground">Manage theory lesson content</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mockLessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle>{language === 'de' ? lesson.title : lesson.titleEn}</CardTitle>
                <CardDescription>
                  {language === 'de' ? lesson.description : lesson.descriptionEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={lesson.thumbnail} 
                  alt={language === 'de' ? lesson.title : lesson.titleEn}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminLessons;
