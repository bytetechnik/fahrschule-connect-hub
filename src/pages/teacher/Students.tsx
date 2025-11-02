import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  mockStudents, 
  getProgress, 
  mockLessons, 
  getPracticalLessonRecordsByStudent,
  getAppointments,
  getDrivingLessonTicketsForStudent
} from '@/lib/mockData';
import { User, Mail, Calendar, BookOpen, Car, Ticket, Clock } from 'lucide-react';
import { format } from 'date-fns';

const TeacherStudents = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const myStudents = mockStudents.filter(s => s.teacherId === user?.id);
  const progress = getProgress();
  const appointments = getAppointments();
  const now = new Date();

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
            
            const practicalLessons = getPracticalLessonRecordsByStudent(student.id)
              .filter(r => r.teacherId === user?.id);
            const practicalLessonCount = practicalLessons.length;
            
            const studentAppointments = appointments.filter(
              a => a.studentId === student.id && a.teacherId === user?.id
            );
            const upcomingAppointments = studentAppointments.filter(
              a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= now
            ).length;
            
            const remainingTickets = getDrivingLessonTicketsForStudent(student.id);
            
            return (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {student.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {student.status === 'active' 
                        ? (t('active') || 'Active') 
                        : (t('expired') || 'Expired')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {t('progress')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {completedLessons} / {mockLessons.length} {t('lessons')}
                      </span>
                    </div>
                    <Progress value={student.progress} />
                  </div>

                  {/* Main Information Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Car className="h-3 w-3" />
                        License Class
                      </p>
                      <p className="font-medium">{student.licenseClass}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        {t('accountValidity')}
                      </p>
                      <p className="font-medium">
                        {format(new Date(student.validityDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" />
                        Joining Date
                      </p>
                      <p className="font-medium">
                        {format(new Date(student.joiningDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Ticket className="h-3 w-3" />
                        Remaining Tickets
                      </p>
                      <p className="font-medium">{remainingTickets}</p>
                    </div>
                  </div>

                  {/* Lesson Statistics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Theory Lessons</p>
                        <p className="font-semibold text-lg">{completedLessons} completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Car className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Practical Lessons</p>
                        <p className="font-semibold text-lg">{practicalLessonCount} completed</p>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  {upcomingAppointments > 0 && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-900 dark:text-blue-300">
                        {upcomingAppointments} {upcomingAppointments === 1 ? 'upcoming appointment' : 'upcoming appointments'}
                      </span>
                    </div>
                  )}
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
