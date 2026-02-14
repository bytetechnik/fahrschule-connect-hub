import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTutorial } from '@/contexts/TutorialContext';
import { BookOpen } from 'lucide-react';

export const TutorialPrompt = () => {
  const { showPrompt, acceptTutorial, declineTutorial } = useTutorial();
  const { t } = useLanguage();

  return (
    <AlertDialog open={showPrompt} onOpenChange={(open) => { if (!open) declineTutorial(); }}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <AlertDialogTitle>{t('tutorialPromptTitle')}</AlertDialogTitle>
              <AlertDialogDescription>{t('tutorialPromptDescription')}</AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel onClick={declineTutorial}>{t('tutorialNoThanks')}</AlertDialogCancel>
          <AlertDialogAction onClick={acceptTutorial}>{t('tutorialShowTour')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
