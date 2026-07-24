import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { AIPriceRecommendationModal } from '../ai/AIPriceRecommendationModal';

export const Step7Pricing: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const { pricing, purpose, propertyInfo } = formData;
  const isRent = purpose === 'Rent' || purpose === 'PG';

  const updatePricing = (updates: Partial<typeof pricing>) => {
    updateFormData({
      pricing: { ...pricing, ...updates },
    });
  };

  // Auto calculate price per sqft
  useEffect(() => {
    const area = propertyInfo.carpetArea || propertyInfo.superArea;
    const price = isRent ? pricing.rentAmount : pricing.expectedPrice;
    if (area && price) {
      const psqft = Math.round(price / area);
      if (psqft !== pricing.pricePerSqft) {
        updatePricing({ pricePerSqft: psqft });
      }
    }
  }, [pricing.expectedPrice, pricing.rentAmount, propertyInfo.carpetArea]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pricing Details ({purpose})
        </h2>
        <p className="text-sm text-slate-500">
          Enter your price expectations or use our AI valuation engine for market-benchmarked pricing.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Top AI Smart Price Banner CTA */}
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl magic-gradient flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Not sure about market price?</h4>
              <p className="text-xs text-slate-400">
                Let Magicbricks AI analyze {formData.location.locality || 'your locality'} transactions to recommend the best rate.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPriceModalOpen(true)}
            className="w-full sm:w-auto magic-gradient text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-opacity whitespace-nowrap"
          >
            Get AI Smart Price
          </button>
        </div>

        {/* Primary Price Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {isRent ? 'Expected Monthly Rent (₹) *' : 'Expected Total Price (₹) *'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={isRent ? pricing.rentAmount || '' : pricing.expectedPrice || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (isRent) updatePricing({ rentAmount: val });
                  else updatePricing({ expectedPrice: val });
                }}
                placeholder={isRent ? 'e.g. 35000' : 'e.g. 14500000'}
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 font-bold text-lg rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">
              {isRent
                ? pricing.rentAmount
                  ? `₹${pricing.rentAmount.toLocaleString('en-IN')} / month`
                  : ''
                : pricing.expectedPrice
                ? `₹${(pricing.expectedPrice / 100000).toFixed(2)} Lakhs (₹${(pricing.expectedPrice / 10000000).toFixed(2)} Cr)`
                : ''}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Calculated Rate per sq.ft
            </label>
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold text-lg flex items-center justify-between">
              <span>₹{pricing.pricePerSqft || 0}</span>
              <span className="text-xs text-slate-400 font-normal">/ sq.ft</span>
            </div>
            <p className="text-[11px] text-slate-500">Auto-calculated from carpet area ({propertyInfo.carpetArea || 0} sq.ft)</p>
          </div>
        </div>

        {/* Secondary Inputs: Maintenance & Deposit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Monthly Maintenance (₹)</label>
            <input
              type="number"
              value={pricing.maintenance || ''}
              onChange={(e) => updatePricing({ maintenance: Number(e.target.value) })}
              placeholder="e.g. 3000"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            />
          </div>

          {isRent && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Security Deposit (₹)</label>
              <input
                type="number"
                value={pricing.securityDeposit || ''}
                onChange={(e) => updatePricing({ securityDeposit: Number(e.target.value) })}
                placeholder="e.g. 150000"
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Toggles */}
        <div className="flex items-center space-x-6 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={pricing.isNegotiable || false}
              onChange={(e) => updatePricing({ isNegotiable: e.target.checked })}
              className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800">Price is Negotiable</span>
          </label>
        </div>
      </div>

      {/* AI Recommendation Modal */}
      <AIPriceRecommendationModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
      />
    </div>
  );
};
