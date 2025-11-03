import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    street: '',
    zip: '',
    city: '',
    phone: '',
    email: '',
    branch: '',
    licenseClass: '',
    registrationType: '',
    comments: '',
    gdprConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast({
        title: t('error'),
        description: t('gdprRequired'),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t('registrationSuccess'),
      description: t('registrationSuccessMessage'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">{t('backToHome')}</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="container py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{t('onlineRegistration')}</CardTitle>
            <CardDescription className="text-base mt-4">
              <div className="space-y-2">
                <p className="font-semibold">{t('registrationSteps')}</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>{t('step1')}</li>
                  <li>{t('step2')}</li>
                  <li>{t('step3')}</li>
                  <li>{t('step4')}</li>
                  <li>{t('step5')}</li>
                  <li>{t('step6')}</li>
                </ol>
                <p className="text-sm mt-4 text-muted-foreground">{t('dataPrivacyNote')}</p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Data */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">{t('personalData')}</h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="salutation">{t('salutation')}</Label>
                    <Select value={formData.salutation} onValueChange={(value) => setFormData({ ...formData, salutation: value })}>
                      <SelectTrigger id="salutation">
                        <SelectValue placeholder={t('pleaseSelect')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mrs">{t('mrs')}</SelectItem>
                        <SelectItem value="mr">{t('mr')}</SelectItem>
                        <SelectItem value="diverse">{t('diverse')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('firstName')} *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('lastName')} *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="birthDate">{t('birthDate')}</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthPlace">{t('birthPlace')}</Label>
                      <Input
                        id="birthPlace"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nationality">{t('nationality')}</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Data */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">{t('contactData')}</h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="street">{t('street')} *</Label>
                    <Input
                      id="street"
                      required
                      placeholder={t('streetPlaceholder')}
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zip">{t('zip')} *</Label>
                      <Input
                        id="zip"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">{t('city')} *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{t('phone')} *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver's License */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">{t('driversLicense')}</h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="branch">{t('branch')} *</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })} required>
                      <SelectTrigger id="branch">
                        <SelectValue placeholder={t('pleaseSelect')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frankfurt-ost">Frankfurt Ost</SelectItem>
                        <SelectItem value="frankfurt-bockenheim">Frankfurt Bockenheim</SelectItem>
                        <SelectItem value="offenbach">Offenbach</SelectItem>
                        <SelectItem value="neu-isenburg">Neu-Isenburg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="licenseClass">{t('licenseClass')} *</Label>
                    <Select value={formData.licenseClass} onValueChange={(value) => setFormData({ ...formData, licenseClass: value })} required>
                      <SelectTrigger id="licenseClass">
                        <SelectValue placeholder={t('pleaseSelect')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class-b">Klasse B</SelectItem>
                        <SelectItem value="class-be">Klasse BE</SelectItem>
                        <SelectItem value="class-a">Klasse A</SelectItem>
                        <SelectItem value="class-a1">Klasse A1</SelectItem>
                        <SelectItem value="class-a2">Klasse A2</SelectItem>
                        <SelectItem value="class-ab">Klasse A & B</SelectItem>
                        <SelectItem value="class-c">Klasse C</SelectItem>
                        <SelectItem value="class-ce">Klasse CE</SelectItem>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="b96">B96</SelectItem>
                        <SelectItem value="b196">B196</SelectItem>
                        <SelectItem value="b197">B197</SelectItem>
                        <SelectItem value="mofa">Mofa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="registrationType">{t('registrationType')} *</Label>
                    <Select value={formData.registrationType} onValueChange={(value) => setFormData({ ...formData, registrationType: value })} required>
                      <SelectTrigger id="registrationType">
                        <SelectValue placeholder={t('pleaseSelect')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-time">{t('firstTime')}</SelectItem>
                        <SelectItem value="extension">{t('extension')}</SelectItem>
                        <SelectItem value="conversion">{t('conversion')}</SelectItem>
                        <SelectItem value="school-change">{t('schoolChange')}</SelectItem>
                        <SelectItem value="upgrade">{t('upgrade')}</SelectItem>
                        <SelectItem value="refresher">{t('refresher')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="comments">{t('commentsFeld')}</Label>
                    <Textarea
                      id="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* GDPR Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                  <Checkbox
                    id="gdpr"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: checked as boolean })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="gdpr" className="text-sm font-normal cursor-pointer">
                      {t('gdprConsent')} *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t('gdprText')}
                    </p>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                {t('submitRegistration')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fahrschule Butterfly GmbH - {t('allRightsReserved')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
