import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAppointments, mockTeachers } from '@/lib/mockData';
import { format } from 'date-fns';

const StudentAppointments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const appointments = getAppointments();

  const myAppointments = appointments.filter(a => a.studentId === user?.id);

  const calculateEndTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">{t('scheduled')}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">{t('cancelled')}</Badge>;
      case 'completed':
        return <Badge variant="secondary">{t('completed')}</Badge>;
      default:
        return <Badge>{t(status)}</Badge>;
    }
  };

  const scheduledAppointments = myAppointments
    .filter(a => a.status === 'scheduled')
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

  const cancelledAppointments = myAppointments
    .filter(a => a.status === 'cancelled')
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('appointments')}</h1>
          <p className="text-muted-foreground">{t('viewAppointments')}</p>
        </div>

        {scheduledAppointments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('scheduledAppointments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledAppointments.map((appointment) => {
                  const teacher = mockTeachers.find(t => t.id === appointment.teacherId);

                  return (
                    <Card key={appointment.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{teacher?.name || t('unknownTeacher')}</span>
                              {getStatusBadge(appointment.status)}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>
                                <span className="font-medium">{t('date')}:</span> {format(new Date(appointment.date), 'PPP')}
                              </p>
                              <p>
                                <span className="font-medium">{t('time')}:</span> {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                              </p>
                              <p>
                                <span className="font-medium">{t('duration')}:</span> {appointment.duration} {t('minutes')}
                              </p>
                              <p>
                                <span className="font-medium">{t('ticketsUsed')}:</span> {appointment.ticketsUsed}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {cancelledAppointments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('cancelledAppointments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cancelledAppointments.map((appointment) => {
                  const teacher = mockTeachers.find(t => t.id === appointment.teacherId);

                  return (
                    <Card key={appointment.id} className="border-l-4 border-l-destructive opacity-75">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{teacher?.name || t('unknownTeacher')}</span>
                              {getStatusBadge(appointment.status)}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>
                                <span className="font-medium">{t('date')}:</span> {format(new Date(appointment.date), 'PPP')}
                              </p>
                              <p>
                                <span className="font-medium">{t('time')}:</span> {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                              </p>
                              {appointment.cancelReason && (
                                <div className="mt-2 p-2 bg-destructive/10 rounded">
                                  <p className="font-medium">{t('cancellationReason')}:</p>
                                  <p>{appointment.cancelReason}</p>
                                  <p className="text-xs mt-1">
                                    {t('cancelledBy')}: {appointment.cancelledBy === 'teacher' ? t('teacher') : t('student')}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {myAppointments.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t('noAppointmentsFound')}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default StudentAppointments;