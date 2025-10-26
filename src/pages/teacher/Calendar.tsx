import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAvailability, saveAvailability, mockStudents } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';

const TeacherCalendar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState(getAvailability());
  const [newTimeSlot, setNewTimeSlot] = useState('09:00');

  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const dayAvailability = availability.find(
    a => a.teacherId === user?.id && a.date === selectedDateStr
  );

  const handleAddTimeSlot = () => {
    if (!date) return;

    const updated = [...availability];
    const existingIndex = updated.findIndex(
      a => a.teacherId === user?.id && a.date === selectedDateStr
    );

    if (existingIndex >= 0) {
      updated[existingIndex].timeSlots.push({
        time: newTimeSlot,
        available: true
      });
    } else {
      updated.push({
        id: `avail-${Date.now()}`,
        teacherId: user!.id,
        date: selectedDateStr,
        timeSlots: [{ time: newTimeSlot, available: true }]
      });
    }

    updated.forEach(a => {
      a.timeSlots.sort((a, b) => a.time.localeCompare(b.time));
    });

    setAvailability(updated);
    saveAvailability(updated);
    toast({ title: 'Success', description: t('addTimeSlot') });
  };

  const handleRemoveSlot = (time: string) => {
    const updated = availability.map(a => {
      if (a.id === dayAvailability?.id) {
        return {
          ...a,
          timeSlots: a.timeSlots.filter(slot => slot.time !== time)
        };
      }
      return a;
    });

    setAvailability(updated);
    saveAvailability(updated);
    toast({ title: 'Success', description: t('removeSlot') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('calendar')}</h1>
          <p className="text-muted-foreground">{t('setAvailability')}</p>
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
              <CardTitle>{t('availability')}</CardTitle>
              {date && <p className="text-sm text-muted-foreground">{format(date, 'PPP')}</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddTimeSlot} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {!dayAvailability || dayAvailability.timeSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t('addTimeSlot')}</p>
                ) : (
                  dayAvailability.timeSlots.map((slot) => {
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
                        {slot.available && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveSlot(slot.time)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherCalendar;
