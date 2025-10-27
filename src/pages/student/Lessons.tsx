import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { getLessons, getProgress } from '@/lib/mockData';

const StudentLessons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [progress] = useState(getProgress());
  const lessons = getLessons();

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t('recordedLessons')}</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const isCompleted = progress.some(p => p.studentId === user?.id && p.lessonId === lesson.id && p.completed);
            return (
              <Card key={lesson.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/student/lessons/${lesson.id}`)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{language === 'de' ? lesson.title : lesson.titleEn}</CardTitle>
                    {isCompleted && <Badge className="gap-1"><CheckCircle className="h-3 w-3" />{t('completed')}</Badge>}
                  </div>
                  <CardDescription className="line-clamp-2">{language === 'de' ? lesson.description : lesson.descriptionEn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-40 object-cover rounded-md" />
                  <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/student/lessons/${lesson.id}`); }}>
                    View Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
