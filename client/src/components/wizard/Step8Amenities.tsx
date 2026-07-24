import React from 'react';
import { ShieldCheck, Dumbbell, Zap, Car, Wifi, Flame, Sparkles, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step8Amenities: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { amenities } = formData;

  const essentialAmenities = [
    'Gated Security',
    '24/7 Power Backup',
    'Elevator / Lift',
    '24/7 Water Supply',
    'Covered Parking',
    'CCTV Security',
    'Gas Pipeline',
    'Intercom',
  ];

  const luxuryAmenities = [
    'Gymnasium',
    'Swimming Pool',
    'Clubhouse',
    'Children Play Area',
    'Tennis / Badminton Court',
    'Private Garden',
    'EV Charging Station',
    'Visitor Parking',
    'Waste Disposal',
    'Water Softener Plant',
  ];

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      updateFormData({ amenities: amenities.filter((a) => a !== item) });
    } else {
      updateFormData({ amenities: [...amenities, item] });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Property Amenities
        </h2>
        <p className="text-sm text-slate-500">
          Properties with 5+ listed amenities receive 3x higher buyer inquiries!
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-7">
        {/* Essential Amenities */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 uppercase tracking-wider text-rose-600">
            <ShieldCheck className="w-4 h-4" />
            <span>Essential Amenities</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {essentialAmenities.map((item) => {
              const isSelected = amenities.includes(item);
              return (
                <div
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`cursor-pointer rounded-xl p-3 border text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-50 border-rose-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-rose-600 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium / Lifestyle Amenities */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 uppercase tracking-wider text-amber-600">
            <Sparkles className="w-4 h-4" />
            <span>Luxury & Lifestyle Features</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {luxuryAmenities.map((item) => {
              const isSelected = amenities.includes(item);
              return (
                <div
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`cursor-pointer rounded-xl p-3 border text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
