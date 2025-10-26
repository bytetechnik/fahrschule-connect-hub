import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTeachers, mockStudents } from '@/lib/mockData';

const AdminTeachers = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('teachers')}</h1>
          <p className="text-muted-foreground">Manage driving instructors</p>
        </div>

        <div className="grid gap-4">
          {mockTeachers.map((teacher) => {
            const assignedStudents = mockStudents.filter(s => s.teacherId === teacher.id);
            
            return (
              <Card key={teacher.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{teacher.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    </div>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('assignedStudents')}: {assignedStudents.length}</p>
                    </div>
                    <div className="space-y-1">
                      {assignedStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between text-sm">
                          <span>{student.name}</span>
                          <span className="text-muted-foreground">{student.progress}%</span>
                        </div>
                      ))}
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

export default AdminTeachers;
