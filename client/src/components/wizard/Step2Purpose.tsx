import React from 'react';
import { Home, Key, Users, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { PurposeType } from '../../types/property';

export const Step2Purpose: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const options: { id: PurposeType; label: string; desc: string; icon: any }[] = [
    {
      id: 'Sale',
      label: 'Sell Property',
      desc: 'List your property for outright sale to buyers',
      icon: Home,
    },
    {
      id: 'Rent',
      label: 'Rent / Lease',
      desc: 'Find tenants for monthly rental income',
      icon: Key,
    },
    {
      id: 'PG',
      label: 'PG / Paying Guest',
      desc: 'Host students or working professionals',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What is the purpose of your listing?
        </h2>
        <p className="text-sm text-slate-500">
          Select whether you want to Sell, Rent out, or list a Paying Guest accommodation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {options.map((opt) => {
          const isSelected = formData.purpose === opt.id;
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => updateFormData({ purpose: opt.id })}
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
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-rose-600 stroke-[3]" />}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
