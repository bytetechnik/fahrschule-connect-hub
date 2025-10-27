import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  CreditCard, 
  LogOut,
  GraduationCap,
  UserCog,
  CalendarDays,
  ShoppingBag
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (!user) return null;

  const getNavItems = () => {
    const baseRoute = `/${user.role}`;
    
    switch (user.role) {
      case 'admin':
        return [
          { path: `${baseRoute}/dashboard`, icon: LayoutDashboard, label: t('dashboard') },
          { path: `${baseRoute}/students`, icon: Users, label: t('students') },
          { path: `${baseRoute}/teachers`, icon: UserCog, label: t('teachers') },
          { path: `${baseRoute}/lessons`, icon: BookOpen, label: t('lessons') },
          { path: `${baseRoute}/calendar`, icon: CalendarDays, label: t('calendar') },
          { path: `${baseRoute}/payments`, icon: CreditCard, label: t('payments') },
          { path: `${baseRoute}/shop`, icon: ShoppingBag, label: t('shop') },
        ];
      case 'teacher':
        return [
          { path: `${baseRoute}/dashboard`, icon: LayoutDashboard, label: t('dashboard') },
          { path: `${baseRoute}/students`, icon: Users, label: t('students') },
          { path: `${baseRoute}/calendar`, icon: CalendarDays, label: t('calendar') },
          { path: `${baseRoute}/appointments`, icon: Calendar, label: t('appointments') },
          { path: `${baseRoute}/payments`, icon: CreditCard, label: t('payments') },
        ];
      case 'student':
        return [
          { path: `${baseRoute}/dashboard`, icon: LayoutDashboard, label: t('dashboard') },
          { path: `${baseRoute}/lessons`, icon: BookOpen, label: t('lessons') },
          { path: `${baseRoute}/calendar`, icon: CalendarDays, label: t('calendar') },
          { path: `${baseRoute}/appointments`, icon: Calendar, label: t('appointments') },
          { path: `${baseRoute}/payments`, icon: CreditCard, label: t('payments') },
          { path: `${baseRoute}/shop`, icon: ShoppingBag, label: t('shop') },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8" style={{ color: '#A91D4D' }} />
              <div>
                <h1 className="text-2xl font-bold text-foreground">ByteTechnik Fahrschule</h1>
                <p className="text-sm text-muted-foreground">{user.name} - {t(user.role)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
