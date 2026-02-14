import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TUTORIAL_PROMPT_SHOWN_KEY = 'fahrschule_tutorial_prompt_shown';

export interface TutorialStep {
  target: string; // data-tutorial value or CSS selector
  titleKey: string;
  descriptionKey: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    target: '[data-tutorial="main-content"]',
    titleKey: 'tutorialWelcomeTitle',
    descriptionKey: 'tutorialWelcomeDescription',
  },
  {
    target: '[data-tutorial="header-brand"]',
    titleKey: 'tutorialHeaderBrandTitle',
    descriptionKey: 'tutorialHeaderBrandDescription',
  },
  {
    target: '[data-tutorial="sidebar"]',
    titleKey: 'tutorialSidebarTitle',
    descriptionKey: 'tutorialSidebarDescription',
  },
  {
    target: '[data-tutorial="dashboard-stats"]',
    titleKey: 'tutorialDashboardStatsTitle',
    descriptionKey: 'tutorialDashboardStatsDescription',
  },
  {
    target: '[data-tutorial="header-messages"]',
    titleKey: 'tutorialMessagesTitle',
    descriptionKey: 'tutorialMessagesDescription',
  },
  {
    target: '[data-tutorial="header-language"]',
    titleKey: 'tutorialLanguageTitle',
    descriptionKey: 'tutorialLanguageDescription',
  },
  {
    target: '[data-tutorial="header-logout"]',
    titleKey: 'tutorialLogoutTitle',
    descriptionKey: 'tutorialLogoutDescription',
  },
  {
    target: '[data-tutorial="main-content"]',
    titleKey: 'tutorialMainTitle',
    descriptionKey: 'tutorialMainDescription',
  },
  {
    target: '[data-tutorial="main-content"]',
    titleKey: 'tutorialCompleteTitle',
    descriptionKey: 'tutorialCompleteDescription',
  },
];

interface TutorialContextType {
  showPrompt: boolean;
  tutorialActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  acceptTutorial: () => void;
  declineTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const isDashboard = /^\/(admin|teacher|student)\/dashboard$/.test(location.pathname);

  useEffect(() => {
    if (!isDashboard) return;
    const alreadyShown = sessionStorage.getItem(TUTORIAL_PROMPT_SHOWN_KEY) === 'true';
    if (!alreadyShown) {
      setShowPrompt(true);
    }
  }, [isDashboard]);

  const acceptTutorial = useCallback(() => {
    setShowPrompt(false);
    setTutorialActive(true);
    setCurrentStep(0);
    sessionStorage.setItem(TUTORIAL_PROMPT_SHOWN_KEY, 'true');
  }, []);

  const declineTutorial = useCallback(() => {
    setShowPrompt(false);
    sessionStorage.setItem(TUTORIAL_PROMPT_SHOWN_KEY, 'true');
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= TUTORIAL_STEPS.length - 1) {
        setTutorialActive(false);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const endTutorial = useCallback(() => {
    setTutorialActive(false);
    setCurrentStep(0);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        showPrompt,
        tutorialActive,
        currentStep,
        steps: TUTORIAL_STEPS,
        acceptTutorial,
        declineTutorial,
        nextStep,
        prevStep,
        endTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
