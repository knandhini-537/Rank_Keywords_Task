import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step4PropertyType: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const residentialTypes = [
    'Flat/Apartment',
    'Residential House',
    'Villa',
    'Builder Floor Apartment',
    'Residential Plot',
    'Penthouse',
    'Studio Apartment',
  ];

  const commercialTypes = [
    'Office Space',
    'Office in IT Park/SEZ',
    'Shop',
    'Showroom',
    'Commercial Land',
    'Warehouse/Godown',
    'Industrial Land',
    'Industrial Building',
    'Industrial Shed',
  ];

  const agriculturalTypes = ['Agricultural Land', 'Farm House'];

  const getTypesForCategory = () => {
    switch (formData.category) {
      case 'Commercial':
        return commercialTypes;
      case 'Agricultural':
        return agriculturalTypes;
      case 'Residential':
      default:
        return residentialTypes;
    }
  };

  const typesList = getTypesForCategory();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Property Type ({formData.category})
        </h2>
        <p className="text-sm text-slate-500">
          Showing property types tailored specifically for {formData.category} listings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {typesList.map((typeStr) => {
          const isSelected = formData.propertyType === typeStr;
          return (
            <div
              key={typeStr}
              onClick={() => updateFormData({ propertyType: typeStr })}
              className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-rose-600 bg-rose-50/50 shadow-md ring-2 ring-rose-500/20 font-bold text-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected ? 'bg-rose-600' : 'bg-slate-300'
                  }`}
                />
                <span className="text-sm">{typeStr}</span>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
