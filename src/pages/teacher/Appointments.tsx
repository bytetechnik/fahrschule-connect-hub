import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAppointments, saveAppointments, mockStudents } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const TeacherAppointments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(getAppointments());
  
  const myAppointments = appointments.filter(a => a.teacherId === user?.id);

  const handleStatusChange = (id: string, status: 'approved' | 'cancelled') => {
    const updated = appointments.map(a => 
      a.id === id ? { ...a, status } : a
    );
    setAppointments(updated);
    saveAppointments(updated);
    toast({
      title: 'Success',
      description: `Appointment ${status}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('appointments')}</h1>
          <p className="text-muted-foreground">Manage student appointments</p>
        </div>

        <div className="space-y-4">
          {myAppointments.map((appointment) => {
            const student = mockStudents.find(s => s.id === appointment.studentId);
            return (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{student?.name}</CardTitle>
                    <Badge 
                      variant={
                        appointment.status === 'approved' ? 'default' : 
                        appointment.status === 'cancelled' ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {t(appointment.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('date')}: {appointment.date}</p>
                      <p className="text-sm text-muted-foreground">{t('time')}: {appointment.time}</p>
                    </div>
                    {appointment.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'approved')}
                        >
                          {t('approve')}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        >
                          {t('cancel')}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherAppointments;
