import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Award,
} from 'lucide-react';
import { useWizard } from '../context/WizardContext';
import { Step1BasicInfo } from '../components/wizard/Step1BasicInfo';
import { Step5Location } from '../components/wizard/Step5Location';
import { Step3DetailsPricing } from '../components/wizard/Step3DetailsPricing';
import { Step4AmenitiesMedia } from '../components/wizard/Step4AmenitiesMedia';
import { Step5DescriptionContact } from '../components/wizard/Step5DescriptionContact';
import { Step6ReviewPublish } from '../components/wizard/Step6ReviewPublish';
import { AIChatAssistant } from '../components/ai/AIChatAssistant';
import { LiveListingCard } from '../components/preview/LiveListingCard';
import { isStepValid, getMissingStepFields } from '../utils/stepValidation';

export const PostPropertyWizardPage: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    formData,
    qualityScore,
    isAutosaving,
    lastSavedTime,
    showLivePreview,
    setShowLivePreview,
  } = useWizard();

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const stepsList = [
    { num: 1, title: 'Basic Info', short: 'Basic' },
    { num: 2, title: 'Location', short: 'Location' },
    { num: 3, title: 'Specs & Price', short: 'Pricing' },
    { num: 4, title: 'Amenities & Media', short: 'Photos' },
    { num: 5, title: 'Description & Contact', short: 'Contact' },
    { num: 6, title: 'Review & Publish', short: 'Publish' },
  ];

  const handleNextStep = () => {
    const missing = getMissingStepFields(currentStep, formData);
    if (missing.length > 0) {
      setValidationError(`Please fill required fields: ${missing.join(', ')}`);
      setTimeout(() => setValidationError(null), 5000);
      return;
    }
    setValidationError(null);
    nextStep();
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step5Location />;
      case 3:
        return <Step3DetailsPricing />;
      case 4:
        return <Step4AmenitiesMedia />;
      case 5:
        return <Step5DescriptionContact />;
      case 6:
      default:
        return <Step6ReviewPublish />;
    }
  };

  // Contextual AI Tips per step
  const getContextualAITip = () => {
    switch (currentStep) {
      case 1:
        return 'Selecting Silver or Gold package gets 3x higher buyer inquiries!';
      case 2:
        return 'Entering landmark & pincode improves GPS search accuracy.';
      case 3:
        return 'Click "Get AI Smart Price" for algorithmic valuation based on locality sales.';
      case 4:
        return 'Listings with 5+ amenities & photos close 4x faster!';
      case 5:
        return 'Use our AI generator to craft catchy multi-paragraph descriptions.';
      case 6:
        return 'Review your 0-100 quality score before hitting publish!';
      default:
        return 'AI copilot is monitoring your input quality.';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top 6-Step Streamlined Stepper */}
      <div className="bg-slate-900 border-b border-slate-800 text-white sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Stepper Track */}
          <div className="flex items-center justify-between overflow-x-auto pb-1 no-scrollbar space-x-1 sm:space-x-2">
            {stepsList.map((step) => {
              const isFilledGreen = isStepValid(step.num, formData);
              const isCurrent = step.num === currentStep;

              return (
                <button
                  key={step.num}
                  onClick={() => {
                    setValidationError(null);
                    setCurrentStep(step.num);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400/40'
                      : isFilledGreen
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-rose-600'
                        : isFilledGreen
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isFilledGreen ? '✓' : step.num}
                  </div>
                  <span className="hidden md:inline">{step.title}</span>
                  <span className="md:hidden">{step.short}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar & Meta Bar */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 pt-1.5 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-white">Step {currentStep} of 6</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Quality Score: <strong>{qualityScore}/100</strong>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLivePreview(!showLivePreview)}
                className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  showLivePreview ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {/* Validation Warning Alert */}
        {validationError && (
          <div className="bg-rose-500 text-white p-3.5 rounded-2xl shadow-lg text-xs sm:text-sm font-bold flex items-center justify-between max-w-4xl mx-auto animate-bounce">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{validationError}</span>
            </div>
            <button onClick={() => setValidationError(null)} className="text-white hover:text-slate-200">
              ✕
            </button>
          </div>
        )}

        {/* Contextual AI Tip Bar */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between gap-3 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
            <div className="w-7 h-7 rounded-lg magic-gradient flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <p className="text-slate-200">
              <strong className="text-rose-400 font-bold">AI Context Tip:</strong> {getContextualAITip()}
            </p>
          </div>

          <button
            onClick={() => setIsAIChatOpen(true)}
            className="text-xs text-amber-300 hover:text-amber-200 font-bold shrink-0 underline"
          >
            Ask AI Assistant
          </button>
        </div>

        {/* Form Container Grid */}
        <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : ''} gap-8`}>
          {/* Active Step Component */}
          <div className={showLivePreview ? 'lg:col-span-7' : 'w-full'}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {renderStepComponent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side-by-side Live Preview */}
          {showLivePreview && (
            <div className="lg:col-span-5 space-y-4 sticky top-40">
              <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between text-xs font-bold">
                <span>Live Magicbricks Card Preview</span>
                <span className="text-rose-400">Updates Real-time</span>
              </div>
              <LiveListingCard data={formData} />
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Navigation Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
            {isAutosaving ? (
              <span className="text-amber-600 font-semibold animate-pulse">Saving draft...</span>
            ) : (
              <span>Draft saved {lastSavedTime ? `at ${lastSavedTime}` : ''}</span>
            )}
          </div>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm magic-gradient text-white shadow-lg shadow-rose-900/30 hover:opacity-95 transition-all transform active:scale-95"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
            >
              <span>Publish Listing</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating AI Chat Assistant Drawer */}
      <AIChatAssistant isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};
