import React from 'react';
import { Check, Sparkles, Home, Key, Users, Building, Store, Trees } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { ListingPackageType, PurposeType, CategoryType } from '../../types/property';

export const Step1BasicInfo: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const packages: { id: ListingPackageType; name: string; price: string; badge?: string }[] = [
    { id: 'Free', name: 'Free Listing', price: '₹0' },
    { id: 'Silver', name: 'Silver AI Pack', price: '₹999', badge: 'POPULAR' },
    { id: 'Gold', name: 'Gold AI Pro', price: '₹1,999', badge: 'BEST VALUE' },
    { id: 'Platinum', name: 'Platinum VIP', price: '₹3,499' },
  ];

  const purposes: { id: PurposeType; label: string; icon: any }[] = [
    { id: 'Sale', label: 'Sell Property', icon: Home },
    { id: 'Rent', label: 'Rent / Lease', icon: Key },
    { id: 'PG', label: 'PG / Hostel', icon: Users },
  ];

  const categories: { id: CategoryType; label: string; icon: any }[] = [
    { id: 'Residential', label: 'Residential', icon: Building },
    { id: 'Commercial', label: 'Commercial', icon: Store },
    { id: 'Agricultural', label: 'Agricultural', icon: Trees },
  ];

  const residentialTypes = ['Flat/Apartment', 'Residential House', 'Villa', 'Builder Floor Apartment', 'Residential Plot', 'Penthouse', 'Studio Apartment'];
  const commercialTypes = ['Office Space', 'Office in IT Park/SEZ', 'Shop', 'Showroom', 'Commercial Land', 'Warehouse/Godown', 'Industrial Shed'];
  const agriculturalTypes = ['Agricultural Land', 'Farm House'];

  const getTypes = () => {
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

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Basic Property Information & Plan
        </h2>
        <p className="text-sm text-slate-500">
          Select your listing package, purpose, property category, and type.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-7">
        {/* Section A: Listing Package */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Select Listing Package *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {packages.map((pkg) => {
              const isSel = formData.listingPackage === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => updateFormData({ listingPackage: pkg.id })}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSel
                      ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-500/20 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-2 right-2 magic-gradient text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="text-xs font-bold text-slate-900">{pkg.name}</div>
                  <div className="text-sm font-black text-rose-600 mt-1">{pkg.price}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section B: Purpose */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            2. Purpose of Listing *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {purposes.map((p) => {
              const isSel = formData.purpose === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => updateFormData({ purpose: p.id })}
                  className={`py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
                    isSel
                      ? 'magic-gradient text-white border-rose-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section C: Category */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            3. Property Category *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => {
              const isSel = formData.category === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateFormData({ category: cat.id, propertyType: '' })}
                  className={`py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
                    isSel
                      ? 'magic-gradient text-white border-rose-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section D: Property Type */}
        {formData.category && (
          <div className="space-y-3 pt-4 border-t border-slate-100 animate-fade-in">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              4. Property Type ({formData.category}) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {getTypes().map((typeStr) => {
                const isSel = formData.propertyType === typeStr;
                return (
                  <button
                    key={typeStr}
                    type="button"
                    onClick={() => updateFormData({ propertyType: typeStr })}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                      isSel
                        ? 'bg-rose-50 border-rose-600 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{typeStr}</span>
                    {isSel && <Check className="w-4 h-4 text-rose-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
