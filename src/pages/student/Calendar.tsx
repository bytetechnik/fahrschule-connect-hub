import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { getAppointments, mockTeachers, getDrivingLessonTicketsForStudent } from '@/lib/mockData';
import { format } from 'date-fns';

const StudentCalendar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const appointments = getAppointments();

  const ticketsLeft = user ? getDrivingLessonTicketsForStudent(user.id) : 0;
  const teacher = mockTeachers.find(t => t.id === user?.assignedTeacher);
  
  const myAppointments = appointments.filter(a => a.studentId === user?.id);

  // Get appointments for selected date
  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const dayAppointments = myAppointments.filter(a => a.date === selectedDateStr);

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

  // Get dates with appointments for calendar highlighting
  const datesWithAppointments = myAppointments
    .filter(a => a.status === 'scheduled')
    .map(a => new Date(a.date));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-muted-foreground">
            {t('teacherSchedule')}: {teacher?.name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t('remainingTickets')}: <span className="font-medium">{ticketsLeft}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('selectDate')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
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
              <CardTitle>{t('appointments')}</CardTitle>
              {date && (
                <p className="text-sm text-muted-foreground">
                  {format(date, 'PPP')}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {!date ? (
                <p className="text-muted-foreground">{t('selectDate')}</p>
              ) : dayAppointments.length === 0 ? (
                <p className="text-muted-foreground">{t('noAppointmentsOnDate')}</p>
              ) : (
                <div className="space-y-3">
                  {dayAppointments.map((appointment) => {
                    return (
                      <Card key={appointment.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">
                                  {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                                </span>
                                {getStatusBadge(appointment.status)}
                              </div>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>{t('duration')}: {appointment.duration} {t('minutes')}</p>
                                <p>{t('ticketsUsed')}: {appointment.ticketsUsed}</p>
                                {appointment.status === 'cancelled' && appointment.cancelReason && (
                                  <div className="mt-2 p-2 bg-destructive/10 rounded">
                                    <p className="font-medium">{t('cancellationReason')}:</p>
                                    <p>{appointment.cancelReason}</p>
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
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {format(new Date(appointment.date), 'PPP')} {t('at')} {appointment.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.duration} {t('minutes')} ({appointment.ticketsUsed} {t('tickets')})
                        </p>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentCalendar;