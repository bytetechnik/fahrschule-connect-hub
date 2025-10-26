import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockStudents, getProgress, mockLessons } from '@/lib/mockData';

const TeacherStudents = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const myStudents = mockStudents.filter(s => s.teacherId === user?.id);
  const progress = getProgress();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('students')}</h1>
          <p className="text-muted-foreground">Monitor your assigned students</p>
        </div>

        <div className="grid gap-4">
          {myStudents.map((student) => {
            const completedLessons = progress.filter(
              p => p.studentId === student.id && p.completed
            ).length;
            
            return (
              <Card key={student.id}>
                <CardHeader>
                  <CardTitle>{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('progress')}</span>
                      <span className="text-sm text-muted-foreground">
                        {completedLessons} / {mockLessons.length} {t('lessons')}
                      </span>
                    </div>
                    <Progress value={student.progress} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('accountValidity')}</p>
                      <p className="font-medium">{student.validityDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{student.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherStudents;
