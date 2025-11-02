import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { getProgress, mockLessons, getAppointments, getStudentProcessByStudentId, getDrivingLessonTicketsForStudent } from '@/lib/mockData';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const progress = getProgress();
  const appointments = getAppointments();
  
  const myProgress = progress.filter(p => p.studentId === user?.id && p.completed);
  const progressPercent = Math.round((myProgress.length / mockLessons.length) * 100);
  const myAppointments = appointments.filter(a => a.studentId === user?.id);
  const now = new Date();
  const upcomingAppointments = myAppointments.filter(a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= now);
  const theoryAttended = myProgress.length;
  const practicalAttended = myAppointments.filter(a => (a.status === 'scheduled' || a.status === 'completed') && new Date(`${a.date}T${a.time}`) <= now).length;
  const process = user ? getStudentProcessByStudentId(user.id) : undefined;
  const remainingTickets = user ? getDrivingLessonTicketsForStudent(user.id) : 0;

  const stepOrder = ['registration', 'theory', 'practical'] as const;
  const steps = [
    { key: 'registration', title: 'Register at the official department' },
    { key: 'theory', title: 'Theory Class' },
    { key: 'practical', title: 'Practical Class' },
  ] as const;

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

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Theory Classes Attended</CardTitle>
              <BookOpen className="h-5 w-5" style={{ color: '#A91D4D' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{theoryAttended}</div>
              <p className="text-xs text-muted-foreground">of {mockLessons.length} total lessons</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practical Classes Attended</CardTitle>
              <Calendar className="h-5 w-5" style={{ color: '#16a34a' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{practicalAttended}</div>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Practical Tickets</CardTitle>
              <Calendar className="h-5 w-5" style={{ color: '#f59e0b' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{remainingTickets}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm md:text-base">Driving School Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {steps.map((s) => {
                const currentIdx = process ? stepOrder.indexOf(process.currentStep as any) : -1;
                const stepIdx = stepOrder.indexOf(s.key);
                const isCompleted = currentIdx >= stepIdx && currentIdx !== -1;
                return (
                  <div key={s.key} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{s.title}</p>
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

export default StudentDashboard;
