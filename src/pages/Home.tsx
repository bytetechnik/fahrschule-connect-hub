import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/bt_logo.png";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const drivingSchoolLinks = [
    { title: t('ourStory'), href: "#story" },
    { title: t('ourInstructors'), href: "#instructors" },
    { title: t('ourLocations'), href: "#our-locations" },
    { title: t('azavCertification'), href: "#certification" },
  ];

  const coursesLinks = [
    { title: t('currentDates'), href: "#dates" },
    { title: t('intensiveHolidayCourses'), href: "#intensive" },
    { title: t('theoryLessonsMenu'), href: "#theory" },
    { title: t('practicalLessonsMenu'), href: "#practical" },
    { title: t('examPreparation'), href: "#exam-prep" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="ByteTechnik" className="h-10 w-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ByteTechnik Fahrschule
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  <NavigationMenuItem>
                    <Link to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                      {t('home')}
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      {t('theDrivingSchool')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {drivingSchoolLinks.map((link) => (
                          <li key={link.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{link.title}</div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="#license" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                      {t('drivingLicense')}
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      {t('coursesAndDates')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {coursesLinks.map((link) => (
                          <li key={link.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{link.title}</div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="#prices" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                      {t('prices')}
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="#locations" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                      {t('locations')}
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="#contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                      {t('contact')}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <LanguageToggle />

              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="#register">{t('onlineRegistration')}</Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/login">{t('login')}</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <div className="flex justify-end mb-4">
                    <LanguageToggle />
                  </div>

                  <Link to="/" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {t('home')}
                  </Link>

                  <div className="space-y-2">
                    <div className="text-lg font-medium">{t('theDrivingSchool')}</div>
                    {drivingSchoolLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        className="block pl-4 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>

                  <Link to="#license" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {t('drivingLicense')}
                  </Link>

                  <div className="space-y-2">
                    <div className="text-lg font-medium">{t('coursesAndDates')}</div>
                    {coursesLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        className="block pl-4 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>

                  <Link to="#prices" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {t('prices')}
                  </Link>

                  <Link to="#locations" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {t('locations')}
                  </Link>

                  <Link to="#contact" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {t('contact')}
                  </Link>

                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="#register" onClick={() => setMobileMenuOpen(false)}>{t('onlineRegistration')}</Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('login')}</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              {t('heroTitle1')}
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {t('heroTitle2')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                <Link to="#register">{t('getStartedNow')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="#contact">{t('contactUs')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('expertInstructors')}</h3>
              <p className="text-muted-foreground">
                {t('expertInstructorsDesc')}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('flexibleSchedules')}</h3>
              <p className="text-muted-foreground">
                {t('flexibleSchedulesDesc')}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('highSuccessRate')}</h3>
              <p className="text-muted-foreground">
                {t('highSuccessRateDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="ByteTechnik" className="h-8 w-8" />
              <span className="text-lg font-semibold">ByteTechnik Fahrschule</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footerCopyright')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('developedBy')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
