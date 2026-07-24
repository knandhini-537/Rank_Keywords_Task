import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PropertyFormData } from '../types/property';
import { saveDraftApi, getDraftApi, calculateQualityScoreApi } from '../services/api';

const emptyFormData: PropertyFormData = {
  listingPackage: '' as any,
  purpose: '' as any,
  category: '' as any,
  propertyType: '',
  location: {
    city: '',
    locality: '',
    landmark: '',
    address: '',
    pincode: '',
  },
  propertyInfo: {
    areaUnit: 'sq.ft',
  },
  pricing: {
    isNegotiable: false,
  },
  amenities: [],
  media: [],
  description: {
    title: '',
    text: '',
    aiGenerated: false,
    tone: 'Professional',
  },
  contactDetails: {
    userRole: 'Owner',
    name: '',
    email: '',
    phone: '',
    hidePhone: false,
    contactTime: 'Anytime between 9 AM - 9 PM',
  },
  qualityScore: 0,
  qualityTips: [],
  status: 'draft',
};

interface WizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  formData: PropertyFormData;
  updateFormData: (updates: Partial<PropertyFormData>) => void;
  qualityScore: number;
  qualityTips: string[];
  isAutosaving: boolean;
  lastSavedTime: string | null;
  resetWizard: () => void;
  showLivePreview: boolean;
  setShowLivePreview: (show: boolean) => void;
  hasDraftAvailable: boolean;
  resumeDraft: () => void;
  discardDraft: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PropertyFormData>(emptyFormData);
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [qualityTips, setQualityTips] = useState<string[]>([]);
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(false);
  const [hasDraftAvailable, setHasDraftAvailable] = useState<boolean>(false);
  const [savedDraftData, setSavedDraftData] = useState<any>(null);

  // Calculate quality score on formData changes
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await calculateQualityScoreApi(formData);
        if (res.data.success) {
          setQualityScore(res.data.qualityScore);
          setQualityTips(res.data.tips || []);
        }
      } catch (e) {
        let s = 0;
        if (formData.listingPackage) s += 5;
        if (formData.purpose && formData.category && formData.propertyType) s += 15;
        if (formData.location.city && formData.location.locality) s += 20;
        if (formData.pricing.expectedPrice || formData.pricing.rentAmount) s += 20;
        if (formData.media.length > 0) s += 15;
        if (formData.description.text) s += 15;
        if (formData.contactDetails.name && formData.contactDetails.phone) s += 10;
        setQualityScore(s);
      }
    };

    fetchScore();
  }, [formData]);

  // Check for saved draft on load
  useEffect(() => {
    const checkDraft = async () => {
      try {
        const res = await getDraftApi();
        if (res.data.success && res.data.draft) {
          setHasDraftAvailable(true);
          setSavedDraftData(res.data.draft);
        }
      } catch (e) {}
    };
    checkDraft();
  }, []);

  // Autosave trigger
  const updateFormData = useCallback(
    (updates: Partial<PropertyFormData>) => {
      setFormData((prev) => {
        const nextData = { ...prev, ...updates };

        setIsAutosaving(true);
        saveDraftApi(currentStep, nextData)
          .then(() => {
            setLastSavedTime(new Date().toLocaleTimeString());
          })
          .catch(() => {})
          .finally(() => {
            setTimeout(() => setIsAutosaving(false), 600);
          });

        return nextData;
      });
    },
    [currentStep]
  );

  const nextStep = () => {
    if (currentStep < 12) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setFormData(emptyFormData);
  };

  const resumeDraft = () => {
    if (savedDraftData) {
      setFormData(savedDraftData.formData || emptyFormData);
      setCurrentStep(savedDraftData.stepIndex || 1);
      setHasDraftAvailable(false);
    }
  };

  const discardDraft = () => {
    setHasDraftAvailable(false);
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        formData,
        updateFormData,
        qualityScore,
        qualityTips,
        isAutosaving,
        lastSavedTime,
        resetWizard,
        showLivePreview,
        setShowLivePreview,
        hasDraftAvailable,
        resumeDraft,
        discardDraft,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
};
