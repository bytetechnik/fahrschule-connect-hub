import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, CheckCircle, Calendar, Star, TrendingUp, Clock, BookOpen, Award } from 'lucide-react';
import { mockStudents, getProgress, getAppointments, getPracticalLessonRecordsByStudent, getTeacherMetrics, getNotificationsByUser, getAnnouncementsByAudience } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const myStudents = mockStudents.filter(s => s.teacherId === user?.id);
  const progress = getProgress();
  const appointments = getAppointments();
  const metrics = user ? getTeacherMetrics(user.id) : null;
  const notifications = user ? getNotificationsByUser(user.id).slice(0, 3) : [];
  const announcements = getAnnouncementsByAudience('teachers').slice(0, 2);
  
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const upcomingAppointments = appointments.filter(
    a => a.teacherId === user?.id && a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= now
  );

  const todayAppointments = appointments.filter(
    a => a.teacherId === user?.id && a.date === today && a.status === 'scheduled'
  ).sort((a, b) => a.time.localeCompare(b.time));

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
      title: t('totalLessonsGiven'),
      value: metrics?.totalLessonsGiven || 0,
      icon: BookOpen,
      color: '#16a34a'
    },
    {
      title: t('passRate'),
      value: `${metrics?.passRate || 0}%`,
      icon: Award,
      color: '#f59e0b'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t('welcome')}, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate('/teacher/appointments')}>
              <Calendar className="h-4 w-4 mr-1" />
              {t('appointments')}
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/teacher/students')}>
              <Users className="h-4 w-4 mr-1" />
              {t('students')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-tutorial="dashboard-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
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

        {/* Performance & Rating */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="h-5 w-5 text-yellow-500" />
                {t('performance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('averageRating')}</span>
                  <span className="font-semibold">{metrics?.averageRating}/5.0</span>
                </div>
                <Progress value={(metrics?.averageRating || 0) * 20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('passRate')}</span>
                  <span className="font-semibold">{metrics?.passRate}%</span>
                </div>
                <Progress value={metrics?.passRate || 0} className="h-2" />
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>{language === 'de' ? 'Überdurchschnittliche Leistung' : 'Above average performance'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-primary" />
                {t('todaySchedule')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/calendar')}>
                {t('viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{t('noAppointmentsToday')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayAppointments.map((apt) => {
                    const student = mockStudents.find(s => s.id === apt.studentId);
                    return (
                      <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="text-center min-w-[60px]">
                            <p className="text-lg font-bold">{apt.time}</p>
                            <p className="text-xs text-muted-foreground">{apt.duration} {t('min')}</p>
                          </div>
                          <div className="border-l pl-3">
                            <p className="font-medium">{student?.name || 'Unknown'}</p>
                            <p className="text-sm text-muted-foreground">{t('practicalLessons')}</p>
                          </div>
                        </div>
                        <Badge>{apt.ticketsUsed} {t('tickets')}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Announcements & Notifications */}
        {(announcements.length > 0 || notifications.length > 0) && (
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('announcements')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={ann.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                            {ann.priority}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm">{language === 'de' ? ann.title : ann.titleEn}</p>
                        <p className="text-xs text-muted-foreground">{language === 'de' ? ann.content : ann.contentEn}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {notifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t('notifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-muted/30' : 'bg-muted/50 border-l-2 border-primary'}`}>
                        <p className="font-medium text-sm">{language === 'de' ? notif.title : notif.titleEn}</p>
                        <p className="text-xs text-muted-foreground">{language === 'de' ? notif.message : notif.messageEn}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notif.createdAt).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Students List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('students')}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/students')}>
              {t('viewAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myStudents.map((student) => {
                const completedLessons = progress.filter(
                  p => p.studentId === student.id && p.completed
                ).length;
                const practicalLessonCount = getPracticalLessonRecordsByStudent(student.id)
                  .filter(r => r.teacherId === user?.id).length;
                
                return (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg gap-2 hover:bg-muted/50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{student.name}</p>
                        <Badge variant="outline" className="text-xs">{student.licenseClass}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="text-right shrink-0 space-y-1">
                      <div className="flex items-center gap-2 justify-end">
                        <Progress value={student.progress} className="w-16 h-2" />
                        <span className="text-sm font-medium w-10">{student.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {completedLessons} {t('theoryLessons')} • {practicalLessonCount} {t('practicalLessons')}
                      </p>
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