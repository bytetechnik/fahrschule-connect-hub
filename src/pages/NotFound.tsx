import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl">404 – {t('notFound')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{t('pageNotFound')}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
            <span>URL</span>
            <span className="truncate max-w-[60%]" title={location.pathname}>{location.pathname}</span>
          </div>
          <div className="flex justify-end">
            <Button asChild>
              <Link to="/">{t('returnHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
