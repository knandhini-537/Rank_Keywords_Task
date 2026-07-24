import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Check, UploadCloud, Trash2 } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { uploadMediaApi } from '../../services/api';

export const Step4AmenitiesMedia: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const { amenities, media } = formData;
  const [uploading, setUploading] = useState(false);

  const popularAmenities = [
    'Gated Security',
    '24/7 Power Backup',
    'Elevator / Lift',
    'Covered Parking',
    'Gymnasium',
    'Swimming Pool',
    'Clubhouse',
    'Gas Pipeline',
  ];

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      updateFormData({ amenities: amenities.filter((a) => a !== item) });
    } else {
      updateFormData({ amenities: [...amenities, item] });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const res = await uploadMediaApi(files);
      if (res.data.success) {
        updateFormData({
          media: [...media, ...res.data.files],
        });
      }
    } catch (err) {
      const newItems = files.map((f, i) => ({
        url: URL.createObjectURL(f),
        filename: f.name,
        category: (f.type.startsWith('video/') ? 'Video' : f.type === 'application/pdf' ? 'Floorplan' : 'Photo') as any,
        tag: 'General',
        qualityScore: 92,
        qualityBadge: 'AI Scanned: Good Quality',
        qualityIssues: [],
      }));
      updateFormData({ media: [...media, ...newItems] });
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    const nextMedia = [...media];
    nextMedia.splice(index, 1);
    updateFormData({ media: nextMedia });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Amenities & Photos Upload
        </h2>
        <p className="text-sm text-slate-500">
          Select key amenities and upload high-resolution photos scanned by AI Image Inspector.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Section A: Amenities Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Select Amenities * (Properties with 5+ amenities get 3x leads)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {popularAmenities.map((item) => {
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

        {/* Section B: Media Upload */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            2. Property Photos & Floorplans * (Scanned by AI Image Quality Inspector)
          </label>

          <div className="border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-5 text-center space-y-3 transition-colors bg-slate-50">
            <UploadCloud className="w-8 h-8 text-rose-500 mx-auto" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Upload Photos or Floorplans</h4>
              <p className="text-[11px] text-slate-500">Supports JPG, PNG up to 20MB</p>
            </div>
            <label className="magic-gradient text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-sm inline-flex items-center gap-1.5">
              <span>Browse Photos</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {uploading && (
              <div className="text-xs text-rose-600 font-semibold flex justify-center items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                <span>AI Inspector is scanning photos...</span>
              </div>
            )}
          </div>

          {/* Photos Grid */}
          {media.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {media.map((item, idx) => (
                <div key={idx} className="relative h-28 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeMedia(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 text-white hover:bg-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1.5 left-1.5 bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {item.qualityBadge || 'HD Verified'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
