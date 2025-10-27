import { ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  CreditCard, 
  LogOut,
  UserCog,
  CalendarDays,
  ShoppingBag,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/bt_logo.png';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const NavItems = () => (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
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
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile Menu Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="py-4">
                    <NavItems />
                  </div>
                </SheetContent>
              </Sheet>

              <img src={logo} alt="ByteTechnik Fahrschule Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">ByteTechnik Fahrschule</h1>
                <p className="text-xs md:text-sm text-muted-foreground truncate">{user.name} - {t(user.role)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <LanguageToggle />
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <NavItems />
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
