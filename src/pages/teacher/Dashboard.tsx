import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Calendar } from 'lucide-react';
import { mockStudents, getProgress, getAppointments } from '@/lib/mockData';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const myStudents = mockStudents.filter(s => s.teacherId === user?.id);
  const progress = getProgress();
  const appointments = getAppointments();
  
  const upcomingAppointments = appointments.filter(
    a => a.teacherId === user?.id && new Date(a.date) >= new Date()
  );

  const stats = [
    {
      title: t('assignedStudents'),
      value: myStudents.length,
      icon: Users,
      color: '#A91D4D'
    },
    {
      title: t('upcomingAppointments'),
      value: upcomingAppointments.length,
      icon: Calendar,
      color: '#2563eb'
    },
    {
      title: 'Avg Progress',
      value: `${Math.round(myStudents.reduce((sum, s) => sum + s.progress, 0) / myStudents.length)}%`,
      icon: CheckCircle,
      color: '#16a34a'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t('welcome')}, {user?.name}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

        <Card>
          <CardHeader>
            <CardTitle>{t('students')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myStudents.map((student) => {
                const completedLessons = progress.filter(
                  p => p.studentId === student.id && p.completed
                ).length;
                
                return (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{student.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">{student.progress}%</p>
                      <p className="text-xs text-muted-foreground">{completedLessons} lessons</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
