import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, AlertCircle, CheckCircle2, Circle, Award, TrendingUp, Clock } from 'lucide-react';
import { getProgress, mockLessons, getAppointments, getStudentProcessByStudentId, getDrivingLessonTicketsForStudent, getAchievementsByStudent, getNotificationsByUser, getWeeklyProgressByStudent } from '@/lib/mockData';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const progress = getProgress();
  const appointments = getAppointments();
  
  const myProgress = progress.filter(p => p.studentId === user?.id && p.completed);
  const progressPercent = Math.round((myProgress.length / mockLessons.length) * 100);
  const myAppointments = appointments.filter(a => a.studentId === user?.id);
  const now = new Date();
  const upcomingAppointments = myAppointments.filter(a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= now).slice(0, 3);
  const theoryAttended = myProgress.length;
  const practicalAttended = myAppointments.filter(a => (a.status === 'scheduled' || a.status === 'completed') && new Date(`${a.date}T${a.time}`) <= now).length;
  const process = user ? getStudentProcessByStudentId(user.id) : undefined;
  const remainingTickets = user ? getDrivingLessonTicketsForStudent(user.id) : 0;
  const achievements = user ? getAchievementsByStudent(user.id) : [];
  const notifications = user ? getNotificationsByUser(user.id).slice(0, 3) : [];
  const weeklyProgress = user ? getWeeklyProgressByStudent(user.id) : [];

  const stepOrder = ['registration', 'theory', 'practical'] as const;
  const steps = [
    { key: 'registration', title: language === 'de' ? 'Bei der Behörde registrieren' : 'Register at the official department' },
    { key: 'theory', title: language === 'de' ? 'Theorieunterricht' : 'Theory Class' },
    { key: 'practical', title: language === 'de' ? 'Praktischer Unterricht' : 'Practical Class' },
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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5" data-tutorial="dashboard-stats">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{language === 'de' ? 'Theoriestunden' : 'Theory Classes'}</CardTitle>
              <BookOpen className="h-5 w-5" style={{ color: '#A91D4D' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{theoryAttended}</div>
              <p className="text-xs text-muted-foreground">{language === 'de' ? `von ${mockLessons.length} Lektionen` : `of ${mockLessons.length} lessons`}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{language === 'de' ? 'Praxisstunden' : 'Practical Classes'}</CardTitle>
              <Calendar className="h-5 w-5" style={{ color: '#16a34a' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{practicalAttended}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('progress')}</CardTitle>
              <TrendingUp className="h-5 w-5" style={{ color: '#2563eb' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{progressPercent}%</div>
              <Progress value={progressPercent} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('upcomingAppointments')}</CardTitle>
              <Clock className="h-5 w-5" style={{ color: '#8b5cf6' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{language === 'de' ? 'Tickets' : 'Tickets'}</CardTitle>
              <Calendar className="h-5 w-5" style={{ color: '#f59e0b' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{remainingTickets}</div>
              <p className="text-xs text-muted-foreground">{t('remainingTickets')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Achievements */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('weeklyProgress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="theoryHours" name={t('theoryHours')} fill="#A91D4D" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="practicalHours" name={t('practicalHours')} fill="#2563eb" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-5 w-5 text-yellow-500" />
                {t('achievements')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">{t('noAchievements')}</p>
              ) : (
                <div className="space-y-2">
                  {achievements.slice(0, 4).map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <span className="text-2xl">{ach.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{language === 'de' ? ach.title : ach.titleEn}</p>
                        <p className="text-xs text-muted-foreground">{language === 'de' ? ach.description : ach.descriptionEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Next Appointments & Process */}
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('upcomingAppointments')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{new Date(apt.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</p>
                        <p className="text-sm text-muted-foreground">{apt.time} - {apt.duration} {t('min')}</p>
                      </div>
                      <Badge>{apt.ticketsUsed} {t('tickets')}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-sm md:text-base">{t('learningPath')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                      <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</p>
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

export default StudentDashboard;