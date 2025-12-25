import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserCog, BookOpen, CheckCircle, TrendingUp, Calendar, Bell, Activity, Plus, FileText, ClipboardList } from 'lucide-react';
import { mockStudents, mockTeachers, mockLessons, getRecentActivityLogs, mockAnnouncements, mockUpcomingExams, mockRevenueData } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const activityLogs = getRecentActivityLogs(5);
  const announcements = mockAnnouncements.slice(0, 3);
  const upcomingExams = mockUpcomingExams.slice(0, 4);

  const stats = [
    {
      title: t('totalStudents'),
      value: mockStudents.length,
      icon: Users,
      color: '#A91D4D',
      trend: '+12%'
    },
    {
      title: t('totalTeachers'),
      value: mockTeachers.length,
      icon: UserCog,
      color: '#2563eb',
      trend: '+5%'
    },
    {
      title: t('activeAccounts'),
      value: mockStudents.filter(s => s.status === 'active').length,
      icon: CheckCircle,
      color: '#16a34a',
      trend: '+8%'
    },
    {
      title: t('totalLessons'),
      value: mockLessons.length,
      icon: BookOpen,
      color: '#ea580c',
      trend: '+3%'
    }
  ];

  const chartData = mockRevenueData.map(d => ({
    name: language === 'de' ? d.month : d.monthEn,
    revenue: d.revenue,
    students: d.students
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t('welcome')}, Administrator</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => navigate('/admin/students')}>
              <Plus className="h-4 w-4 mr-1" />
              {t('addStudent')}
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/admin/calendar')}>
              <Calendar className="h-4 w-4 mr-1" />
              {t('scheduleExam')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <span className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                      {stat.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('monthlyRevenue')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#A91D4D" fill="#A91D4D" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('studentGrowth')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="students" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity, Exams and Announcements */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-5 w-5 text-primary" />
                {t('recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{language === 'de' ? log.action : log.actionEn}</p>
                      <p className="text-xs text-muted-foreground truncate">{language === 'de' ? log.details : log.detailsEn}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.createdAt).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Exams */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList className="h-5 w-5 text-primary" />
                {t('upcomingExams')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{exam.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')} - {exam.time}
                      </p>
                    </div>
                    <Badge variant={exam.type === 'theory' ? 'secondary' : 'default'}>
                      {exam.type === 'theory' ? t('theoryExam') : t('practicalExam')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-5 w-5 text-primary" />
                {t('announcements')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={ann.priority === 'high' ? 'destructive' : ann.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                        {ann.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {ann.targetAudience === 'all' ? '👥 All' : ann.targetAudience === 'students' ? '🎓 Students' : '👨‍🏫 Teachers'}
                      </span>
                    </div>
                    <p className="font-medium text-sm">{language === 'de' ? ann.title : ann.titleEn}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{language === 'de' ? ann.content : ann.contentEn}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students and Teachers Quick View */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('students')}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/students')}>
                {t('viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStudents.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{student.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">{student.progress}%</p>
                      <Badge variant={student.progress >= 75 ? 'default' : student.progress >= 50 ? 'secondary' : 'outline'} className="text-xs">
                        {student.licenseClass}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('teachers')}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/teachers')}>
                {t('viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockTeachers.map((teacher) => {
                  const assignedCount = mockStudents.filter(s => s.teacherId === teacher.id).length;
                  return (
                    <div key={teacher.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
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