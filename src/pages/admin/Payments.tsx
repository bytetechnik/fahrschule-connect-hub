import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { getPayments, mockStudents } from '@/lib/mockData';

const AdminPayments = () => {
  const { t } = useLanguage();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const allPayments = getPayments();

  // Filter payments based on selected student
  const payments = selectedStudentId === 'all'
    ? allPayments
    : allPayments.filter(p => p.studentId === selectedStudentId);

  // Calculate total revenue for filtered payments
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('payments')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">View and export payment records</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            {t('exportReport')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="student-select">Filter by Student</Label>
              <Select value={selectedStudentId} onValueChange={(value) => setSelectedStudentId(value)}>
                <SelectTrigger id="student-select" className="w-full sm:w-[300px]">
                  <SelectValue placeholder="All Students" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedStudentId === 'all'
                ? 'Total Revenue'
                : `Total Revenue - ${mockStudents.find(s => s.id === selectedStudentId)?.name || ''}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">€{totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {payments.map((payment) => {
            const student = mockStudents.find(s => s.id === payment.studentId);
            return (
              <Card key={payment.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="font-medium truncate">{student?.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{payment.description}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="text-left sm:text-right space-y-2 shrink-0">
                      <p className="text-xl md:text-2xl font-bold">€{payment.amount}</p>
                      <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
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

export default AdminPayments;
