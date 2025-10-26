import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPayments } from '@/lib/mockData';

const StudentPayments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const payments = getPayments().filter(p => p.studentId === user?.id);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t('payments')}</h1>
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-2xl font-bold">€{payment.amount}</p>
                    <Badge>{t(payment.status)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentPayments;
