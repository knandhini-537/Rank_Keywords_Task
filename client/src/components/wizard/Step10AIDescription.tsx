import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Wand2, Type } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { generateAIDescriptionApi } from '../../services/api';

export const Step10AIDescription: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { description } = formData;
  const [generating, setGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string>(description.tone || 'Professional');
  const [copied, setCopied] = useState(false);

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
      // Fallback AI description generator
      const bhk = formData.propertyInfo.bedrooms ? `${formData.propertyInfo.bedrooms} BHK` : '';
      const loc = `${formData.location.locality || 'prime locality'}, ${formData.location.city}`;
      const title = `${bhk} ${formData.propertyType} available for ${formData.purpose} in ${loc}`;
      const desc = `Beautiful and spacious ${bhk} ${formData.propertyType} situated in the heart of ${loc}. Featuring ${formData.propertyInfo.carpetArea || 1200} sq.ft of carpet area with ${formData.propertyInfo.furnishing || 'modern'} interiors.\n\nKey Highlights:\n- Strategic location with easy access to main roads and metro\n- Equipped with top amenities: ${formData.amenities.slice(0, 4).join(', ') || 'Security, Power Backup'}\n- Excellent cross ventilation and natural lighting throughout the day.\n\nSchedule a visit today!`;

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Property Description Generator
        </h2>
        <p className="text-sm text-slate-500">
          Craft high-converting, SEO-optimized titles & descriptions tailored for your listing in one click!
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Tone Selector & AI Generate Trigger */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <Wand2 className="w-5 h-5 text-amber-300" />
              <h4 className="font-bold text-white text-sm sm:text-base">Select AI Tone & Style</h4>
            </div>

            <button
              type="button"
              onClick={() => handleGenerateAI()}
              disabled={generating}
              className="magic-gradient text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Writing Description...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Description</span>
                </>
              )}
            </button>
          </div>

          {/* Tone Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            {tones.map((t) => {
              const isSel = selectedTone === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setSelectedTone(t);
                    handleGenerateAI(t);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isSel
                      ? 'bg-rose-600 border-rose-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Listing Title */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center justify-between">
            <span>Listing Title *</span>
            <span className="text-[10px] text-slate-400 font-normal lowercase">Catchy search headline</span>
          </label>
          <input
            type="text"
            value={description.title || ''}
            onChange={(e) =>
              updateFormData({
                description: { ...description, title: e.target.value },
              })
            }
            placeholder="e.g. Luxury 3 BHK Furnished Apartment in HSR Layout Sector 1"
            className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 font-bold rounded-xl px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Property Overview & Description *
            </label>
            <div className="flex items-center space-x-2">
              {description.aiGenerated && (
                <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Generated
                </span>
              )}
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={7}
            value={description.text || ''}
            onChange={(e) =>
              updateFormData({
                description: { ...description, text: e.target.value, aiGenerated: false },
              })
            }
            placeholder="Detailed description of property highlights, ventilation, nearby landmarks, and amenities..."
            className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl p-4 text-xs sm:text-sm focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
