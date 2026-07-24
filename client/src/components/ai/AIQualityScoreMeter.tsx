import React from 'react';
import { Award, CheckCircle, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const AIQualityScoreMeter: React.FC = () => {
  const { qualityScore, qualityTips } = useWizard();

  const getScoreColor = () => {
    if (qualityScore >= 85) return 'text-emerald-500 stroke-emerald-500 bg-emerald-50 border-emerald-200';
    if (qualityScore >= 65) return 'text-amber-500 stroke-amber-500 bg-amber-50 border-amber-200';
    return 'text-rose-500 stroke-rose-500 bg-rose-50 border-rose-200';
  };

  const scoreColorClass = getScoreColor();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (qualityScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Listing Quality Score</h3>
            <p className="text-xs text-slate-500">AI Trust & Lead Accelerator</p>
          </div>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            qualityScore >= 85
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : qualityScore >= 65
              ? 'bg-amber-100 text-amber-800 border-amber-300'
              : 'bg-rose-100 text-rose-800 border-rose-300'
          }`}
        >
          {qualityScore >= 85 ? 'High Perform' : qualityScore >= 65 ? 'Good' : 'Needs Optimization'}
        </span>
      </div>

      {/* Progress Ring & Value */}
      <div className="flex items-center space-x-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-slate-200"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              className={`transition-all duration-700 ease-out ${scoreColorClass}`}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-slate-900 leading-none">{qualityScore}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">/100</span>
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{qualityScore >= 85 ? 'Estimated 4.5x more buyer leads' : 'Complete checklist to hit 100'}</span>
          </p>
          <p className="text-[11px] text-slate-500 leading-snug">
            {qualityScore >= 85
              ? 'Your listing has high visibility and top quality metadata for Magicbricks buyers.'
              : 'Adding photos, carpet area details, and AI description boosts inquiry calls significantly.'}
          </p>
        </div>
      </div>

      {/* Actionable Tips */}
      {qualityTips.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Recommendations to reach 100%:
          </p>
          <ul className="space-y-1.5">
            {qualityTips.slice(0, 3).map((tip, index) => (
              <li
                key={index}
                className="text-xs text-slate-600 flex items-start gap-2 bg-amber-50/60 p-2 rounded-lg border border-amber-100"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
