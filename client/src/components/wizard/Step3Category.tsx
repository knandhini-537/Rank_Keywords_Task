import React from 'react';
import { Building, Store, Trees, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { CategoryType } from '../../types/property';

export const Step3Category: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const categories: { id: CategoryType; label: string; desc: string; icon: any }[] = [
    {
      id: 'Residential',
      label: 'Residential',
      desc: 'Apartments, Houses, Villas, Plots & Studios',
      icon: Building,
    },
    {
      id: 'Commercial',
      label: 'Commercial',
      desc: 'Office space, Shops, Showrooms & Warehouses',
      icon: Store,
    },
    {
      id: 'Agricultural',
      label: 'Agricultural',
      desc: 'Agricultural land, Farmland & Farm houses',
      icon: Trees,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Property Category
        </h2>
        <p className="text-sm text-slate-500">
          This determines the specific options and dynamic fields shown in the next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {categories.map((cat) => {
          const isSelected = formData.category === cat.id;
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              onClick={() => updateFormData({ category: cat.id })}
              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col items-center text-center space-y-4 ${
                isSelected
                  ? 'border-rose-600 bg-rose-50/40 shadow-xl ring-2 ring-rose-500/20 scale-105'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  isSelected ? 'magic-gradient text-white shadow-lg' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center justify-center gap-1.5">
                  <span>{cat.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-rose-600 stroke-[3]" />}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
