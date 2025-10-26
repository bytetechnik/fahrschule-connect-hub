import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudents, mockTeachers, getProgress, mockLessons } from '@/lib/mockData';

const AdminStudents = () => {
  const { t } = useLanguage();
  const progress = getProgress();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('students')}</h1>
          <p className="text-muted-foreground">Manage and monitor student accounts</p>
        </div>

        <div className="grid gap-4">
          {mockStudents.map((student) => {
            const teacher = mockTeachers.find(t => t.id === student.teacherId);
            const completedLessons = progress.filter(
              p => p.studentId === student.id && p.completed
            ).length;
            
            return (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
                      {student.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('teacher')}</p>
                      <p className="font-medium">{teacher?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('completedLessons')}</p>
                      <p className="font-medium">{completedLessons} / {mockLessons.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('progress')}</p>
                      <p className="font-medium">{student.progress}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('accountValidity')}</p>
                      <p className="font-medium">{student.validityDate}</p>
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

export default AdminStudents;
