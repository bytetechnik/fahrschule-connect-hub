import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, UserRound } from "lucide-react";
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

  const aboutLinks = [
    { title: t('ourStory'), href: "#story" },
    { title: t('ourInstructors'), href: "#instructors" },
    { title: t('ourLocations'), href: "#our-locations" },
    { title: t('azavCertification'), href: "#certification" },
  ];

  const coursesLinks = [
    { title: t('drivingLicense'), href: "#license" },
    { title: t('theoryLessonsMenu'), href: "#theory" },
    { title: t('practicalLessonsMenu'), href: "#practical" },
    { title: t('intensiveHolidayCourses'), href: "#intensive" },
    { title: t('examPreparation'), href: "#exam-prep" },
    { title: t('currentDates'), href: "#dates" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header with Glass Morphism */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo with Animation */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
                <img src={logo} alt="Fahrschule" className="h-12 w-12 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Fahrschule
                </div>
                <div className="text-xs text-muted-foreground -mt-1">Fahrschule</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  <NavigationMenuItem>
                    <Link 
                      to="/" 
                      className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group"
                    >
                      {t('home')}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10">
                      {t('about')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <ul className="grid w-[450px] gap-2 p-4 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl rounded-xl">
                        {aboutLinks.map((link) => (
                          <li key={link.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className="block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-[1.02] group"
                              >
                                <div className="text-sm font-semibold leading-none mb-1 group-hover:translate-x-1 transition-transform duration-200">
                                  {link.title}
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10">
                      {t('courses')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <ul className="grid w-[450px] gap-2 p-4 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl rounded-xl">
                        {coursesLinks.map((link) => (
                          <li key={link.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className="block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-[1.02] group"
                              >
                                <div className="text-sm font-semibold leading-none mb-1 group-hover:translate-x-1 transition-transform duration-200">
                                  {link.title}
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link 
                      to="#prices" 
                      className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group"
                    >
                      {t('prices')}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link 
                      to="#contact" 
                      className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group"
                    >
                      {t('contact')}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="h-8 w-px bg-border/50 mx-2"></div>

              <LanguageToggle />

              <Button 
                asChild 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <Link to="/register" className="font-semibold">{t('onlineRegistration')}</Link>
              </Button>

              <Button 
                asChild 
                variant="outline" 
                className="border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              >
                <Link to="/login" aria-label={t('login')} className="flex items-center justify-center">
                  <UserRound className="h-5 w-5" />
                </Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <LanguageToggle />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-primary/10 transition-all duration-300"
                  >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50 h-[100dvh] overflow-y-auto"
                >
                  <nav className="flex flex-col space-y-6 mt-12 pb-8">
                    <Link 
                      to="/" 
                      className="text-lg font-semibold hover:text-primary transition-colors px-4 py-2 hover:bg-primary/5 rounded-lg" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('home')}
                    </Link>

                    <div className="space-y-3">
                      <div className="text-lg font-semibold px-4 text-primary">{t('about')}</div>
                      <div className="space-y-1">
                        {aboutLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block pl-8 pr-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-lg font-semibold px-4 text-primary">{t('courses')}</div>
                      <div className="space-y-1">
                        {coursesLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block pl-8 pr-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>

                    <Link 
                      to="#prices" 
                      className="text-lg font-semibold hover:text-primary transition-colors px-4 py-2 hover:bg-primary/5 rounded-lg" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('prices')}
                    </Link>

                    <Link 
                      to="#contact" 
                      className="text-lg font-semibold hover:text-primary transition-colors px-4 py-2 hover:bg-primary/5 rounded-lg" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('contact')}
                    </Link>

                    <div className="pt-6 space-y-3">
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                         <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                          {t('onlineRegistration')}
                        </Link>
                      </Button>

                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full border-2 hover:bg-primary/5 hover:border-primary/50"
                      >
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} aria-label={t('login')} className="flex items-center justify-center py-2">
                          <UserRound className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
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
                <Link to="/register">{t('getStartedNow')}</Link>
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
              <img src={logo} alt="Fahrschule" className="h-8 w-8" />
              <span className="text-lg font-semibold">Fahrschule Management System</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 ByteTechnik Fahrschule. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Developed by the ByteTechnik.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
