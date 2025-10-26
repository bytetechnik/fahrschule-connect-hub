import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAvailability, mockTeachers, mockStudents } from '@/lib/mockData';
import { format } from 'date-fns';

const AdminCalendar = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const availability = getAvailability();

  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const dayAvailabilities = availability.filter(a => a.date === selectedDateStr);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-muted-foreground">View all teacher schedules and bookings</p>
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
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Schedules</CardTitle>
              {date && <p className="text-sm text-muted-foreground">{format(date, 'PPP')}</p>}
            </CardHeader>
            <CardContent>
              {dayAvailabilities.length === 0 ? (
                <p className="text-muted-foreground">No availability set for this date</p>
              ) : (
                <Tabs defaultValue={dayAvailabilities[0]?.teacherId} className="w-full">
                  <TabsList className="w-full">
                    {dayAvailabilities.map((avail) => {
                      const teacher = mockTeachers.find(t => t.id === avail.teacherId);
                      return (
                        <TabsTrigger key={avail.teacherId} value={avail.teacherId} className="flex-1">
                          {teacher?.name}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {dayAvailabilities.map((avail) => {
                    const teacher = mockTeachers.find(t => t.id === avail.teacherId);
                    return (
                      <TabsContent key={avail.teacherId} value={avail.teacherId} className="space-y-2 mt-4">
                        {avail.timeSlots.map((slot) => {
                          const student = slot.bookedBy ? mockStudents.find(s => s.id === slot.bookedBy) : null;
                          return (
                            <div key={slot.time} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="font-medium">{slot.time}</span>
                                {slot.available ? (
                                  <Badge variant="default">{t('available')}</Badge>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{t('booked')}</Badge>
                                    {student && (
                                      <span className="text-sm text-muted-foreground">{student.name}</span>
                                    )}
                                  </div>
                                )}
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

        <Card>
          <CardHeader>
            <CardTitle>Overview - All Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeachers.map((teacher) => {
                const teacherAvails = availability.filter(a => a.teacherId === teacher.id);
                const totalSlots = teacherAvails.reduce((sum, a) => sum + a.timeSlots.length, 0);
                const bookedSlots = teacherAvails.reduce(
                  (sum, a) => sum + a.timeSlots.filter(s => !s.available).length, 
                  0
                );
                
                return (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className="font-medium">{bookedSlots}</span> / {totalSlots} slots booked
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {teacherAvails.length} days scheduled
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

export default AdminCalendar;
