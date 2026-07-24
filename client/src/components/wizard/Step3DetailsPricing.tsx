import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { AIPriceRecommendationModal } from '../ai/AIPriceRecommendationModal';

export const Step3DetailsPricing: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { propertyInfo, pricing, purpose, category } = formData;

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const isRent = purpose === 'Rent' || purpose === 'PG';
  const isAgricultural = category === 'Agricultural';
  const isCommercial = category === 'Commercial';

  const updateInfo = (updates: Partial<typeof propertyInfo>) => {
    updateFormData({
      propertyInfo: { ...propertyInfo, ...updates },
    });
  };

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
          Property Specifications & Pricing
        </h2>
        <p className="text-sm text-slate-500">
          Enter room configuration, carpet area, and set your price or get AI price benchmarks.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Section A: Features (Bedrooms, Bathrooms, Balconies, Floors) */}
        {!isAgricultural && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
              Property Features
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bedrooms (Residential only) */}
              {!isCommercial && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block">Bedrooms</label>
                  <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isSel = propertyInfo.bedrooms === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateInfo({ bedrooms: num })}
                          className={`px-4 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 ${
                            isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {num === 5 ? '5+' : num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bathrooms */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Bathrooms</label>
                <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex">
                  {[1, 2, 3, 4].map((num) => {
                    const isSel = propertyInfo.bathrooms === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateInfo({ bathrooms: num })}
                        className={`px-4 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 ${
                          isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {num === 4 ? '3+' : num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Balconies */}
              {!isCommercial && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block">Balconies</label>
                  <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex">
                    {[0, 1, 2, 3, 4].map((num) => {
                      const isSel = propertyInfo.balconies === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateInfo({ balconies: num })}
                          className={`px-4 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 ${
                            isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {num === 4 ? '3+' : num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Furnishing Status */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Furnished Status</label>
                <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex">
                  {['Furnished', 'Unfurnished', 'Semi-Furnished'].map((status) => {
                    const isSel = propertyInfo.furnishing === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateInfo({ furnishing: status as any })}
                        className={`px-3 sm:px-4 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 ${
                          isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floor Details */}
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Floor No.</label>
                <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex max-w-full overflow-x-auto">
                  {['Lower Basement', 'Upper Basement', 'Ground', '1', '2', '3', '4', '5', '5+'].map((floor) => {
                    const val = floor === 'Ground' ? 0 : floor === 'Lower Basement' ? -2 : floor === 'Upper Basement' ? -1 : floor === '5+' ? 6 : parseInt(floor);
                    const isSel = propertyInfo.floorNo === val;
                    return (
                      <button
                        key={floor}
                        type="button"
                        onClick={() => updateInfo({ floorNo: val })}
                        className={`px-3 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 whitespace-nowrap ${
                          isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {floor}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Total Floors</label>
                <div className="flex flex-wrap gap-0 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm inline-flex max-w-full overflow-x-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => {
                    const isSel = propertyInfo.totalFloors === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateInfo({ totalFloors: num })}
                        className={`px-3 py-2 text-sm transition-all border-r border-slate-200 last:border-r-0 ${
                          isSel ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {num === 14 ? '13+' : num}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section B: Carpet Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center justify-between">
              <span>Carpet Area *</span>
              <span className="text-[10px] text-rose-600 font-normal lowercase">net usable area</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={propertyInfo.carpetArea || ''}
                onChange={(e) => updateInfo({ carpetArea: Number(e.target.value) })}
                placeholder="e.g. 1450"
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">sq.ft</span>
            </div>
          </div>
        </div>

        {/* Section C: Pricing & AI Price Trigger */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl magic-gradient flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Unsure of market rate?</h4>
                <p className="text-[11px] text-slate-400">Let AI calculate optimal price for {formData.location.locality || 'your area'}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPriceModalOpen(true)}
              className="magic-gradient text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:opacity-95 transition-opacity whitespace-nowrap"
            >
              Get AI Smart Price
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {isRent ? 'Expected Monthly Rent (₹) *' : 'Expected Total Price (₹) *'}
              </label>
              <input
                type="number"
                value={isRent ? pricing.rentAmount || '' : pricing.expectedPrice || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (isRent) updatePricing({ rentAmount: val });
                  else updatePricing({ expectedPrice: val });
                }}
                placeholder={isRent ? 'e.g. 35000' : 'e.g. 14500000'}
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 font-bold text-base rounded-xl px-3.5 py-2.5 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Calculated Rate per sq.ft
              </label>
              <div className="bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm flex items-center justify-between">
                <span>₹{pricing.pricePerSqft || 0}</span>
                <span className="text-xs text-slate-400 font-normal">/ sq.ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIPriceRecommendationModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
      />
    </div>
  );
};
