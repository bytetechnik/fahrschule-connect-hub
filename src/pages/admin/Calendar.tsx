import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAppointments, mockTeachers, mockStudents, getDrivingLessonTicketsForStudent } from '@/lib/mockData';
import { format } from 'date-fns';
import type { Appointment } from '@/types';

const AdminCalendar = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const appointments = getAppointments();

  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const dayAppointments = appointments.filter(a => a.date === selectedDateStr);

  // Group appointments by teacher
  const appointmentsByTeacher = dayAppointments.reduce<Record<string, Appointment[]>>((acc, apt) => {
    if (!acc[apt.teacherId]) {
      acc[apt.teacherId] = [];
    }
    acc[apt.teacherId].push(apt);
    return acc;
  }, {});

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

  // Statistics
  const totalAppointments = appointments.length;
  const scheduledAppointments = appointments.filter(a => a.status === 'scheduled').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const totalTicketsUsed = appointments
    .filter(a => a.status === 'scheduled' || a.status === 'completed')
    .reduce((sum, a) => sum + a.ticketsUsed, 0);

  // Student statistics
  const studentStats = mockStudents.map(student => {
    const studentAppointments = appointments.filter(a => a.studentId === student.id);
    const scheduled = studentAppointments.filter(a => a.status === 'scheduled').length;
    const cancelled = studentAppointments.filter(a => a.status === 'cancelled').length;
    const completed = studentAppointments.filter(a => a.status === 'completed').length;
    const ticketsUsed = studentAppointments
      .filter(a => a.status === 'scheduled' || a.status === 'completed')
      .reduce((sum, a) => sum + a.ticketsUsed, 0);
    const remainingTickets = getDrivingLessonTicketsForStudent(student.id);
    
    return {
      student,
      scheduled,
      cancelled,
      completed,
      ticketsUsed,
      remainingTickets,
      totalAppointments: studentAppointments.length
    };
  });

  // Get dates with appointments for calendar highlighting
  const datesWithAppointments = appointments
    .filter(a => a.status === 'scheduled')
    .map(a => new Date(a.date));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t('viewAllAppointments')}</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('totalAppointments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('scheduled')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{scheduledAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('cancelled')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{cancelledAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('totalTicketsUsed')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTicketsUsed}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('selectDate')}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
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
              <CardTitle>{t('appointmentsForSelectedDate')}</CardTitle>
              {date && <p className="text-sm text-muted-foreground">{format(date, 'PPP')}</p>}
            </CardHeader>
            <CardContent>
              {dayAppointments.length === 0 ? (
                <p className="text-muted-foreground">{t('noAppointmentsOnDate')}</p>
              ) : (
                <Tabs 
                  defaultValue={Object.keys(appointmentsByTeacher)[0] || ''} 
                  className="w-full"
                >
                  <TabsList className="w-full flex-wrap h-auto gap-1">
                    {Object.keys(appointmentsByTeacher).map((teacherId) => {
                      const teacher = mockTeachers.find(t => t.id === teacherId);
                      return (
                        <TabsTrigger key={teacherId} value={teacherId} className="flex-1 min-w-[100px]">
                          {teacher?.name || t('unknown')}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {Object.entries(appointmentsByTeacher).map(([teacherId, teacherAppointments]) => {
                    const teacher = mockTeachers.find(t => t.id === teacherId);
                    return (
                      <TabsContent key={teacherId} value={teacherId} className="space-y-2 mt-4">
                        {teacherAppointments
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map((appointment) => {
                            const student = mockStudents.find(s => s.id === appointment.studentId);
                            return (
                              <div 
                                key={appointment.id} 
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-2"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium">
                                      {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                                    </span>
                                    {getStatusBadge(appointment.status)}
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    <p>{student?.name || t('unknownStudent')}</p>
                                    <p>{appointment.duration} {t('min')} ({appointment.ticketsUsed} {t('tickets')})</p>
                                    {appointment.status === 'cancelled' && appointment.cancelReason && (
                                      <p className="text-xs mt-1 text-destructive">
                                        {t('reason')}: {appointment.cancelReason}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Student Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>{t('studentStatistics')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('overviewAppointmentsTickets')}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentStats.map(({ student, scheduled, cancelled, completed, ticketsUsed, remainingTickets, totalAppointments }) => {
                const teacher = mockTeachers.find(t => t.id === student.teacherId);
                return (
                  <Card key={student.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{student.name}</span>
                            <Badge variant="outline">{student.licenseClass}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t('teacher')}: {teacher?.name || t('unassigned')} | {t('email')}: {student.email}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">{t('scheduled')}:</span>
                              <p className="font-medium text-blue-600">{scheduled}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{t('cancelled')}:</span>
                              <p className="font-medium text-red-600">{cancelled}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{t('ticketsUsed')}:</span>
                              <p className="font-medium">{ticketsUsed}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{t('remaining')}:</span>
                              <p className="font-medium text-green-600">{remainingTickets}</p>
                            </div>
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
      </div>
    </Layout>
  );
};

export default AdminCalendar;