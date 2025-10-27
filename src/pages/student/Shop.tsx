import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Euro } from 'lucide-react';
import { getProducts, getStudents, getProductPriceForStudent, getPayments, savePayments, Payment } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const StudentShop = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const products = getProducts();
  const students = getStudents();
  const currentStudent = students.find(s => s.id === user?.id);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = (productId: string) => {
    if (!currentStudent) return;

    setPurchasing(productId);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const price = getProductPriceForStudent(product, currentStudent);
    
    // Create payment record
    const payments = getPayments();
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      studentId: currentStudent.id,
      amount: price,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: language === 'de' ? product.name : product.nameEn
    };
    
    payments.push(newPayment);
    savePayments(payments);

    toast({
      title: t('success'),
      description: `Purchase request submitted for ${language === 'de' ? product.name : product.nameEn}. Total: €${price}`
    });

    setTimeout(() => setPurchasing(null), 1000);
  };

  if (!currentStudent) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Student profile not found</p>
        </div>
      </Layout>
    );
  }

  const getProductTypeLabel = (type: string) => {
    const labels: Record<string, { de: string; en: string }> = {
      'theory-app': { de: 'Theorie App', en: 'Theory App' },
      'driving-lesson': { de: 'Fahrstunde', en: 'Driving Lesson' },
      'theory-exam': { de: 'Theorieprüfung', en: 'Theory Exam' },
      'practical-exam': { de: 'Praktische Prüfung', en: 'Practical Exam' }
    };
    return language === 'de' ? labels[type]?.de : labels[type]?.en;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('shop')}</h1>
          <p className="text-muted-foreground">
            {language === 'de' 
              ? `Deine Preise basieren auf deinem Beitrittsjahr: ${new Date(currentStudent.joiningDate).getFullYear()}`
              : `Your prices are based on your joining year: ${new Date(currentStudent.joiningDate).getFullYear()}`
            }
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const price = getProductPriceForStudent(product, currentStudent);
            const hasCustomPrice = product.customPrices?.some(cp => cp.studentId === currentStudent.id);

            return (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{getProductTypeLabel(product.type)}</Badge>
                    {hasCustomPrice && (
                      <Badge variant="outline" className="text-xs">Custom Price</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-3">
                    {language === 'de' ? product.name : product.nameEn}
                  </CardTitle>
                  <CardDescription>
                    {language === 'de' ? product.description : product.descriptionEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <Euro className="h-5 w-5 text-primary" />
                      <span className="text-3xl font-bold">{price}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handlePurchase(product.id)}
                    disabled={purchasing === product.id}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {purchasing === product.id ? 'Processing...' : language === 'de' ? 'Kaufen' : 'Buy Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {products.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Derzeit sind keine Produkte verfügbar' 
                  : 'No products available at the moment'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default StudentShop;
