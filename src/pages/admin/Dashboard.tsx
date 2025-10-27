import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCog, BookOpen, CheckCircle } from 'lucide-react';
import { mockStudents, mockTeachers, mockLessons } from '@/lib/mockData';

const AdminDashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalStudents'),
      value: mockStudents.length,
      icon: Users,
      color: '#A91D4D'
    },
    {
      title: t('totalTeachers'),
      value: mockTeachers.length,
      icon: UserCog,
      color: '#2563eb'
    },
    {
      title: t('activeAccounts'),
      value: mockStudents.filter(s => s.status === 'active').length,
      icon: CheckCircle,
      color: '#16a34a'
    },
    {
      title: t('totalLessons'),
      value: mockLessons.length,
      icon: BookOpen,
      color: '#ea580c'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t('welcome')}, Administrator</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('students')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStudents.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{student.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">{student.progress}%</p>
                      <p className="text-xs text-muted-foreground">{t('progress')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('teachers')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockTeachers.map((teacher) => {
                  const assignedCount = mockStudents.filter(s => s.teacherId === teacher.id).length;
                  return (
                    <div key={teacher.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{teacher.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium">{assignedCount}</p>
                        <p className="text-xs text-muted-foreground">{t('assignedStudents')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
