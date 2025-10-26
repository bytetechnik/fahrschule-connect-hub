import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { getAvailability, saveAvailability, mockTeachers } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const StudentCalendar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState(getAvailability());

  const teacher = mockTeachers.find(t => t.id === user?.assignedTeacher);
  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const dayAvailability = availability.find(
    a => a.teacherId === user?.assignedTeacher && a.date === selectedDateStr
  );

  const handleBook = (time: string) => {
    if (!dayAvailability) return;

    const updated = availability.map(a => {
      if (a.id === dayAvailability.id) {
        return {
          ...a,
          timeSlots: a.timeSlots.map(slot =>
            slot.time === time ? { ...slot, available: false, bookedBy: user?.id } : slot
          )
        };
      }
      return a;
    });

    setAvailability(updated);
    saveAvailability(updated);
    
    toast({
      title: t('book'),
      description: `Appointment booked for ${time}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-muted-foreground">{t('teacherSchedule')}: {teacher?.name}</p>
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
              <CardTitle>{t('availableSlots')}</CardTitle>
              {date && <p className="text-sm text-muted-foreground">{format(date, 'PPP')}</p>}
            </CardHeader>
            <CardContent>
              {!dayAvailability ? (
                <p className="text-muted-foreground">{t('selectDate')}</p>
              ) : (
                <div className="space-y-2">
                  {dayAvailability.timeSlots.map((slot) => (
                    <div key={slot.time} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{slot.time}</span>
                        <Badge variant={slot.available ? 'default' : 'secondary'}>
                          {slot.available ? t('available') : t('booked')}
                        </Badge>
                      </div>
                      {slot.available && (
                        <Button size="sm" onClick={() => handleBook(slot.time)}>
                          {t('book')}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentCalendar;
