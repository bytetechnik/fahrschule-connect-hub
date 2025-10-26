import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { mockLessons, getProgress, saveProgress } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const StudentLessons = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [progress, setProgress] = useState(getProgress());

  const handleComplete = (lessonId: string) => {
    const updated = [...progress, { studentId: user!.id, lessonId, completed: true, completedDate: new Date().toISOString().split('T')[0] }];
    setProgress(updated);
    saveProgress(updated);
    toast({ title: 'Success', description: t('markComplete') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t('recordedLessons')}</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {mockLessons.map((lesson) => {
            const isCompleted = progress.some(p => p.studentId === user?.id && p.lessonId === lesson.id && p.completed);
            return (
              <Card key={lesson.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{language === 'de' ? lesson.title : lesson.titleEn}</CardTitle>
                    {isCompleted && <Badge className="gap-1"><CheckCircle className="h-3 w-3" />{t('completed')}</Badge>}
                  </div>
                  <CardDescription>{language === 'de' ? lesson.description : lesson.descriptionEn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-48 object-cover rounded-md" />
                  {!isCompleted && <Button onClick={() => handleComplete(lesson.id)} className="w-full">{t('markComplete')}</Button>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default StudentLessons;
