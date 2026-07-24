import React from 'react';
import { Check, Sparkles, Zap, Shield, Star } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { ListingPackageType } from '../../types/property';

export const Step1Package: React.FC = () => {
  const { formData, updateFormData, nextStep } = useWizard();

  const packages: {
    id: ListingPackageType;
    name: string;
    badge?: string;
    price: string;
    views: string;
    features: string[];
    recommended?: boolean;
  }[] = [
    {
      id: 'Free',
      name: 'Free Listing',
      price: '₹0',
      views: 'Standard Visibility',
      features: ['Basic Property Search Listing', 'Direct Owner Contact', 'Valid for 30 Days', 'Standard Photos'],
    },
    {
      id: 'Silver',
      name: 'Silver AI Pack',
      price: '₹999',
      views: '3x Higher Responses',
      recommended: true,
      badge: 'POPULAR',
      features: [
        'AI Description & Smart Price Estimator',
        'Featured Tag on Search Results',
        'Highlighted in Locality Email Alerts',
        'Valid for 60 Days',
        'Listing Quality Score Boost',
      ],
    },
    {
      id: 'Gold',
      name: 'Gold AI Pro',
      price: '₹1,999',
      badge: 'BEST VALUE',
      views: '6x Premium Leads',
      features: [
        'Top 3 Rank Placement in Search',
        'AI Copilot Priority Recommendation',
        'Dedicated Relationship Manager',
        'Social Media Campaign Ads',
        'Valid for 90 Days',
      ],
    },
    {
      id: 'Platinum',
      name: 'Platinum VIP',
      price: '₹3,499',
      views: '10x Fast Sale Guarantee',
      features: [
        'Homepage Banner Spotlight',
        'Professional Photographer Visit',
        '3D Virtual Tour Integration',
        'Unlimited Verified Buyer Leads',
        'Valid Until Sold/Rented',
      ],
    },
  ];

  const handleSelect = (pkgId: ListingPackageType) => {
    updateFormData({ listingPackage: pkgId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Listing Package
        </h2>
        <p className="text-sm text-slate-500">
          Choose a plan that fits your property goals. All packages include AI-powered tools!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => {
          const isSelected = formData.listingPackage === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-600 bg-white shadow-xl ring-2 ring-rose-500/20 scale-[1.02]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 magic-gradient text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">{pkg.name}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <span className="text-2xl font-black text-slate-900">{pkg.price}</span>
                  <span className="text-xs text-slate-400 font-medium block">{pkg.views}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full mt-5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                  isSelected
                    ? 'magic-gradient text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected ? 'Package Selected' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
