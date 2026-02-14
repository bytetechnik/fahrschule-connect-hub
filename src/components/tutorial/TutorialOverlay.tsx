import { useEffect, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTutorial } from '@/contexts/TutorialContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const OVERLAY_Z = 9999;

export const TutorialOverlay = () => {
  const { t } = useLanguage();
  const { tutorialActive, currentStep, steps, nextStep, prevStep, endTutorial } = useTutorial();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  useLayoutEffect(() => {
    if (!tutorialActive || !step) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(step.target);
    if (!el) {
      setTargetRect(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setTargetRect(rect);
  }, [tutorialActive, currentStep, step]);

  useEffect(() => {
    if (!tutorialActive || !step) return;
    const el = document.querySelector(step.target);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [tutorialActive, currentStep, step]);

  if (!tutorialActive) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-end sm:justify-center p-4 pb-8"
      style={{ zIndex: OVERLAY_Z }}
      aria-modal
      role="dialog"
      aria-label={t('tutorialStepLabel')}
    >
      {/* Backdrop: full dim when no target, or four panels for spotlight cutout */}
      {!targetRect ? (
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      ) : (
        <>
          <div
            className="absolute left-0 right-0 bg-black/60"
            style={{ top: 0, height: Math.max(0, targetRect.top) }}
          />
          <div
            className="absolute left-0 right-0 bg-black/60"
            style={{ top: targetRect.bottom, bottom: 0 }}
          />
          <div
            className="absolute bg-black/60"
            style={{
              top: targetRect.top,
              left: 0,
              width: targetRect.left,
              height: targetRect.height,
            }}
          />
          <div
            className="absolute bg-black/60"
            style={{
              top: targetRect.top,
              left: targetRect.right,
              right: 0,
              height: targetRect.height,
            }}
          />
          <div
            className="absolute rounded-lg ring-4 ring-primary ring-offset-2 ring-offset-transparent pointer-events-none transition-all duration-200"
            style={{
              left: targetRect.left,
              top: targetRect.top,
              width: targetRect.width,
              height: targetRect.height,
            }}
          />
        </>
      )}

      {/* Step card */}
      <Card className="relative z-10 w-full max-w-md shadow-xl border-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">{step ? t(step.titleKey) : ''}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8"
              onClick={endTutorial}
              aria-label={t('close')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {step && (
            <CardDescription className="text-sm leading-relaxed">
              {t(step.descriptionKey)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2 pt-0">
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={isFirst}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('back')}
            </Button>
            {isLast ? (
              <Button size="sm" onClick={nextStep} className="gap-1">
                {t('tutorialFinish')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={nextStep} className="gap-1">
                {t('tutorialNext')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(overlay, document.body);
};
