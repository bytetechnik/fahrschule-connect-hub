import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { getAppointments, mockStudents } from '@/lib/mockData';
import { format } from 'date-fns';

const TeacherCalendar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const appointments = getAppointments();
  
  const myAppointments = appointments.filter(a => a.teacherId === user?.id);
  
  // Get appointments for selected date
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dayAppointments = myAppointments.filter(a => a.date === selectedDateStr);
  
  // Get dates with appointments for calendar highlighting
  const datesWithAppointments = myAppointments
    .filter(a => a.status === 'scheduled')
    .map(a => new Date(a.date));

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-muted-foreground">{t('viewYourAppointments')}</p>
        </div>

        {/* Appointments Overview Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('appointmentsCalendar')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasAppointments: datesWithAppointments
                }}
                modifiersClassNames={{
                  hasAppointments: 'bg-primary/20 font-bold'
                }}
              />
              <div className="mt-4 text-xs text-muted-foreground">
                {t('datesWithAppointments')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('appointmentsForSelectedDate')}</CardTitle>
              {selectedDate && (
                <p className="text-sm text-muted-foreground">
                  {format(selectedDate, 'PPP')}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <p className="text-muted-foreground">{t('selectDateToView')}</p>
              ) : dayAppointments.length === 0 ? (
                <p className="text-muted-foreground">{t('noAppointmentsOnDate')}</p>
              ) : (
                <div className="space-y-3">
                  {dayAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => {
                      const student = mockStudents.find(s => s.id === appointment.studentId);
                      return (
                        <Card key={appointment.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{student?.name || t('unknownStudent')}</span>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>
                                    <span className="font-medium">{t('time')}:</span> {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                                  </p>
                                  <p>
                                    <span className="font-medium">{t('duration')}:</span> {appointment.duration} {t('minutes')}
                                  </p>
                                  <p>
                                    <span className="font-medium">{t('ticketsUsed')}:</span> {appointment.ticketsUsed}
                                  </p>
                                  {appointment.status === 'cancelled' && appointment.cancelReason && (
                                    <div className="mt-2 p-2 bg-destructive/10 rounded">
                                      <p className="font-medium text-xs">{t('cancellationReason')}:</p>
                                      <p className="text-xs">{appointment.cancelReason}</p>
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
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>{t('allUpcomingAppointments')}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('totalScheduled').replace('{count}', myAppointments.filter(a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= new Date()).length.toString())}
            </p>
          </CardHeader>
          <CardContent>
            {myAppointments
              .filter(a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= new Date())
              .sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date);
                if (dateCompare !== 0) return dateCompare;
                return a.time.localeCompare(b.time);
              })
              .length === 0 ? (
              <p className="text-muted-foreground">{t('noUpcomingAppointments')}</p>
            ) : (
              <div className="space-y-2">
                {myAppointments
                  .filter(a => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) >= new Date())
                  .sort((a, b) => {
                    const dateCompare = a.date.localeCompare(b.date);
                    if (dateCompare !== 0) return dateCompare;
                    return a.time.localeCompare(b.time);
                  })
                  .map((appointment) => {
                    const student = mockStudents.find(s => s.id === appointment.studentId);
                    return (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {format(new Date(appointment.date), 'PPP')} {t('at')} {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student?.name || t('unknownStudent')} - {appointment.duration} {t('min')} ({appointment.ticketsUsed} {t('tickets')})
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TeacherCalendar;