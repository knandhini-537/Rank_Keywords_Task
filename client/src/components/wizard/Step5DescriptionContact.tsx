import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, EyeOff, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { generateAIDescriptionApi } from '../../services/api';

export const Step5DescriptionContact: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { description, contactDetails } = formData;
  const [generating, setGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string>(description.tone || 'Professional');

  const tones = ['Professional', 'Luxury', 'Family-Friendly', 'Concise'];

  const handleGenerateAI = async (toneOverride?: string) => {
    setGenerating(true);
    const toneToUse = toneOverride || selectedTone;

    try {
      const res = await generateAIDescriptionApi({
        purpose: formData.purpose,
        category: formData.category,
        propertyType: formData.propertyType,
        location: formData.location,
        propertyInfo: formData.propertyInfo,
        pricing: formData.pricing,
        amenities: formData.amenities,
        tone: toneToUse,
      });

      if (res.data.success) {
        updateFormData({
          description: {
            title: res.data.generatedTitle,
            text: res.data.generatedDescription,
            aiGenerated: true,
            tone: toneToUse,
          },
        });
      }
    } catch (e) {
      const bhk = formData.propertyInfo?.bedrooms ? `${formData.propertyInfo.bedrooms} BHK` : '';
      const loc = `${formData.location?.locality || 'prime locality'}, ${formData.location?.city || 'Bangalore'}`;
      const title = `${bhk} ${formData.propertyType || 'Property'} available for ${formData.purpose || 'Sale'} in ${loc}`;
      const desc = `Beautiful and spacious ${bhk} ${formData.propertyType || 'property'} situated in the heart of ${loc}. Featuring ${formData.propertyInfo?.carpetArea || 1200} sq.ft carpet area with ${formData.propertyInfo?.furnishing || 'modern'} interiors.\n\nHighlights:\n- Strategic location near major transit hubs\n- Premium amenities including ${formData.amenities.slice(0, 3).join(', ') || 'Security, Power Backup'}\n\nSchedule a visit today!`;

      updateFormData({
        description: {
          title,
          text: desc,
          aiGenerated: true,
          tone: toneToUse,
        },
      });
    } finally {
      setGenerating(false);
    }
  };

  const updateContact = (updates: Partial<typeof contactDetails>) => {
    updateFormData({
      contactDetails: { ...contactDetails, ...updates },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Description & Contact Preferences
        </h2>
        <p className="text-sm text-slate-500">
          Generate an SEO-optimized description and set your contact preferences.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Section A: AI Description Generator */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <Wand2 className="w-5 h-5 text-amber-300" />
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">AI Description Generator</h4>
                <p className="text-[11px] text-slate-400">Creates rich property summary in 1 click</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleGenerateAI()}
              disabled={generating}
              className="magic-gradient text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Description</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Listing Title *
            </label>
            <input
              type="text"
              value={description.title || ''}
              onChange={(e) =>
                updateFormData({
                  description: { ...description, title: e.target.value },
                })
              }
              placeholder="e.g. Spacious 3 BHK Flat in HSR Layout"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 font-bold rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Property Description *
            </label>
            <textarea
              rows={5}
              value={description.text || ''}
              onChange={(e) =>
                updateFormData({
                  description: { ...description, text: e.target.value },
                })
              }
              placeholder="Detailed description of property features, landmarks, and highlights..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section B: Contact Info */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Contact Information *
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={contactDetails.name || ''}
              onChange={(e) => updateContact({ name: e.target.value })}
              placeholder="Full Name *"
              className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none"
            />
            <input
              type="email"
              value={contactDetails.email || ''}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="Email Address *"
              className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none"
            />
            <input
              type="tel"
              value={contactDetails.phone || ''}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="Phone Number *"
              className="bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none"
            />
          </div>

          <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-700">
              <EyeOff className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Hide phone number on public listing</span>
            </div>
            <input
              type="checkbox"
              checked={contactDetails.hidePhone || false}
              onChange={(e) => updateContact({ hidePhone: e.target.checked })}
              className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
