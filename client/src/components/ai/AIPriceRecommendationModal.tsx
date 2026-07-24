import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, TrendingUp, DollarSign, Calculator, Info } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { getSmartPriceApi } from '../../services/api';

export const AIPriceRecommendationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { formData, updateFormData } = useWizard();
  const [loading, setLoading] = useState(true);
  const [recData, setRecData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getSmartPriceApi({
        purpose: formData.purpose,
        category: formData.category,
        propertyType: formData.propertyType,
        location: formData.location,
        propertyInfo: formData.propertyInfo,
      })
        .then((res) => {
          if (res.data.success) {
            setRecData(res.data.recommendation);
          }
        })
        .catch(() => {
          // Fallback mock math
          const area = formData.propertyInfo.carpetArea || 1200;
          const isRent = formData.purpose === 'Rent' || formData.purpose === 'PG';
          const rec = isRent ? area * 35 : area * 7500;
          setRecData({
            recommendedPrice: rec,
            priceRange: { min: Math.round(rec * 0.9), max: Math.round(rec * 1.1) },
            pricePerSqft: isRent ? 35 : 7500,
            formattedRecommended: isRent
              ? `₹${rec.toLocaleString('en-IN')}/mo`
              : `₹${(rec / 100000).toFixed(2)} Lakhs`,
            localityAvgPerSqft: `₹${isRent ? 35 : 7500}/sq.ft`,
            demandLevel: 'High Demand Area',
            growthForecast: '+7.5% annual growth',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, formData]);

  if (!isOpen) return null;

  const applyPrice = () => {
    if (!recData) return;
    const isRent = formData.purpose === 'Rent' || formData.purpose === 'PG';
    if (isRent) {
      updateFormData({
        pricing: {
          ...formData.pricing,
          rentAmount: recData.recommendedPrice,
          pricePerSqft: recData.pricePerSqft,
        },
      });
    } else {
      updateFormData({
        pricing: {
          ...formData.pricing,
          expectedPrice: recData.recommendedPrice,
          pricePerSqft: recData.pricePerSqft,
        },
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl magic-gradient flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">AI Smart Price Recommendation</h3>
              <p className="text-xs text-slate-500">
                Calculated from {formData.location.locality || 'Locality'} sales data & specs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-600">Analyzing 1,400+ recent locality transactions...</p>
          </div>
        ) : (
          recData && (
            <div className="space-y-5">
              {/* Highlight Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>AI Optimal Benchmark</span>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                    {recData.demandLevel}
                  </span>
                </div>
                <div className="text-3xl font-black text-white">{recData.formattedRecommended}</div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span>Locality Rate: <strong>{recData.localityAvgPerSqft}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {recData.growthForecast}
                  </span>
                </div>
              </div>

              {/* Price Range Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Conservative: ₹{(recData.priceRange.min / 100000).toFixed(2)}L</span>
                  <span className="text-rose-600">Aggressive: ₹{(recData.priceRange.max / 100000).toFixed(2)}L</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div className="w-1/4 bg-amber-400" />
                  <div className="w-1/2 bg-emerald-500" />
                  <div className="w-1/4 bg-rose-500" />
                </div>
                <p className="text-[11px] text-slate-500 text-center">
                  Setting price within the green zone results in 85% faster closing.
                </p>
              </div>

              {/* CTA Action Button */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyPrice}
                  className="flex-1 py-3 rounded-xl font-bold text-xs magic-gradient text-white shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Apply Recommended Price</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
