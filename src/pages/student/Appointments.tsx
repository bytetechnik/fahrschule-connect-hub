import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAppointments, mockTeachers } from '@/lib/mockData';

const StudentAppointments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const appointments = getAppointments().filter(a => a.studentId === user?.id);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t('appointments')}</h1>
        <div className="space-y-4">
          {appointments.map((appointment) => {
            const teacher = mockTeachers.find(t => t.id === appointment.teacherId);
            return (
              <Card key={appointment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{teacher?.name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.date} - {appointment.time}</p>
                    </div>
                    <Badge variant={appointment.status === 'approved' ? 'default' : appointment.status === 'cancelled' ? 'destructive' : 'secondary'}>
                      {t(appointment.status)}
                    </Badge>
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

export default StudentAppointments;
