import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, AlertCircle } from 'lucide-react';
import { getProgress, mockLessons, getAppointments } from '@/lib/mockData';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const progress = getProgress();
  const appointments = getAppointments();
  
  const myProgress = progress.filter(p => p.studentId === user?.id && p.completed);
  const progressPercent = Math.round((myProgress.length / mockLessons.length) * 100);
  const myAppointments = appointments.filter(a => a.studentId === user?.id);
  const upcomingAppointments = myAppointments.filter(a => new Date(a.date) >= new Date());

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t('welcome')}, {user?.name}</p>
        </div>

        {user?.validityDate && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('accountValidity')}: {user.validityDate}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('completedLessons')}</CardTitle>
              <BookOpen className="h-5 w-5" style={{ color: '#A91D4D' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myProgress.length} / {mockLessons.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{progressPercent}%</div>
              <Progress value={progressPercent} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('upcomingAppointments')}</CardTitle>
              <Calendar className="h-5 w-5" style={{ color: '#2563eb' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
