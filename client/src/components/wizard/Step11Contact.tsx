import React from 'react';
import { UserCheck, Shield, Phone, Mail, Clock, EyeOff, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step11Contact: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { contactDetails } = formData;

  const updateContact = (updates: Partial<typeof contactDetails>) => {
    updateFormData({
      contactDetails: { ...contactDetails, ...updates },
    });
  };

  const userRoles: ('Owner' | 'Agent' | 'Builder')[] = ['Owner', 'Agent', 'Builder'];

  const timeSlots = [
    'Anytime between 9 AM - 9 PM',
    'Morning (9 AM - 12 PM)',
    'Afternoon (12 PM - 4 PM)',
    'Evening (4 PM - 9 PM)',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Details & Preferences
        </h2>
        <p className="text-sm text-slate-500">
          Buyers and tenants will use these details to contact you directly.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* User Role Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            I am posting as *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {userRoles.map((role) => {
              const isSel = contactDetails.userRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => updateContact({ userRole: role })}
                  className={`py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-1.5 ${
                    isSel
                      ? 'magic-gradient text-white border-rose-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{role}</span>
                  {isSel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Info Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Full Name *</label>
            <input
              type="text"
              value={contactDetails.name || ''}
              onChange={(e) => updateContact({ name: e.target.value })}
              placeholder="e.g. Sriram Owner"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Email Address *</label>
            <input
              type="email"
              value={contactDetails.email || ''}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="e.g. owner@example.com"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Mobile Phone Number *</label>
            <input
              type="tel"
              value={contactDetails.phone || ''}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Preferred Contact Time</label>
            <select
              value={contactDetails.contactTime || timeSlots[0]}
              onChange={(e) => updateContact({ contactTime: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            >
              {timeSlots.map((ts, idx) => (
                <option key={idx} value={ts}>
                  {ts}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Privacy Toggle */}
        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <EyeOff className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Hide Phone Number on Public Listing</h4>
              <p className="text-[11px] text-slate-500">
                Interested buyers will connect via Magicbricks chat/lead form without seeing your raw phone number.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={contactDetails.hidePhone || false}
            onChange={(e) => updateContact({ hidePhone: e.target.checked })}
            className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
