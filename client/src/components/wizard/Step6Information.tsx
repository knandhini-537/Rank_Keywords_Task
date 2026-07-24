import React from 'react';
import { Bed, Bath, Move, Compass, Calendar, Layers, Shield } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step6Information: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { propertyInfo, category } = formData;

  const updateInfo = (updates: Partial<typeof propertyInfo>) => {
    updateFormData({
      propertyInfo: { ...propertyInfo, ...updates },
    });
  };

  const isAgricultural = category === 'Agricultural';
  const isCommercial = category === 'Commercial';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Property Information ({formData.propertyType})
        </h2>
        <p className="text-sm text-slate-500">
          Fields are dynamically customized for your {category.toLowerCase()} listing.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Bedrooms / Room config (Residential only) */}
        {!isAgricultural && !isCommercial && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Bedrooms (BHK) *
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isSel = propertyInfo.bedrooms === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => updateInfo({ bedrooms: num })}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                      isSel
                        ? 'magic-gradient text-white border-rose-600 shadow-md scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {num === 6 ? '5+ BHK' : `${num} BHK`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bathrooms & Balconies Grid */}
        {!isAgricultural && !isCommercial && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Bathrooms
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => updateInfo({ bathrooms: num })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      propertyInfo.bathrooms === num
                        ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {num === 5 ? '4+' : num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Balconies
              </label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => updateInfo({ balconies: num })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      propertyInfo.balconies === num
                        ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {num === 4 ? '3+' : num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Area Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center justify-between">
              <span>Super Built-up Area</span>
              <span className="text-[10px] text-slate-400 font-normal lowercase">includes common area</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={propertyInfo.superArea || ''}
                onChange={(e) => updateInfo({ superArea: Number(e.target.value) })}
                placeholder="e.g. 1750"
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">sq.ft</span>
            </div>
          </div>
        </div>

        {/* Furnishing Status */}
        {!isAgricultural && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Furnishing Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Unfurnished', 'Semi-Furnished', 'Furnished'].map((st) => {
                const isSel = propertyInfo.furnishing === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => updateInfo({ furnishing: st as any })}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                      isSel
                        ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floors & Age of Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {!isAgricultural && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Property Floor</label>
                <input
                  type="number"
                  value={propertyInfo.floorNo ?? ''}
                  onChange={(e) => updateInfo({ floorNo: Number(e.target.value) })}
                  placeholder="e.g. 4"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Floors</label>
                <input
                  type="number"
                  value={propertyInfo.totalFloors ?? ''}
                  onChange={(e) => updateInfo({ totalFloors: Number(e.target.value) })}
                  placeholder="e.g. 12"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Facing Direction</label>
            <select
              value={propertyInfo.facing || 'East'}
              onChange={(e) => updateInfo({ facing: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none"
            >
              <option value="East">East</option>
              <option value="North-East">North-East</option>
              <option value="North">North</option>
              <option value="West">West</option>
              <option value="South">South</option>
              <option value="South-East">South-East</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
