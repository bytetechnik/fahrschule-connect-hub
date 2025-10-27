import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/LanguageToggle';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import logo from '@/assets/bt_logo.png';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const demoUsers = [
    { role: t('admin'), email: 'admin@fahrschule.de', password: 'Admin123!' },
    { role: t('teacher'), email: 'teacher@fahrschule.de', password: 'Teacher123!' },
    { role: t('student'), email: 'student@fahrschule.de', password: 'Student123!' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        const userRole = email.split('@')[0] === 'admin' ? 'admin' : 
                         email.split('@')[0] === 'teacher' ? 'teacher' : 'student';
        navigate(`/${userRole}/dashboard`);
      } else {
        toast({
          variant: 'destructive',
          title: t('loginFailed'),
          description: 'Bitte überprüfen Sie Ihre Anmeldedaten.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="ByteTechnik Fahrschule Logo" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">ByteTechnik Fahrschule</h1>
          <p className="text-muted-foreground">Management System</p>
        </div>

        <div className="flex justify-center">
          <LanguageToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('login')}</CardTitle>
            <CardDescription>{t('selectRole')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('email')}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('password')}</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '...' : t('login')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">{t('demoCredentials')}</p>
              <div className="space-y-1">
                {demoUsers.map((user, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs font-mono"
                    onClick={() => quickLogin(user.email, user.password)}
                  >
                    <span className="font-semibold mr-2">{user.role}:</span>
                    {user.email} / {user.password}
                  </Button>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Login;
