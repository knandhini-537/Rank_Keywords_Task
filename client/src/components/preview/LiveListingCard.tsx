import React from 'react';
import { MapPin, Bed, Bath, Move, ShieldCheck, Sparkles, PhoneCall, Check, Tag } from 'lucide-react';
import { PropertyFormData } from '../../types/property';

export const LiveListingCard: React.FC<{ data: PropertyFormData }> = ({ data }) => {
  const isRent = data.purpose === 'Rent' || data.purpose === 'PG';

  const priceValue = isRent
    ? data.pricing?.rentAmount || data.pricing?.expectedPrice || 0
    : data.pricing?.expectedPrice || data.pricing?.rentAmount || 0;

  const formattedPrice = isRent
    ? priceValue > 0
      ? `₹${priceValue.toLocaleString('en-IN')}/mo`
      : '₹0 / mo'
    : priceValue > 0
    ? `₹${(priceValue / 100000).toFixed(2)} Lakhs`
    : '₹0 Lakhs';

  const defaultImg =
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';
  const displayImg = data.media && data.media.length > 0 ? data.media[0].url : defaultImg;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-sm sm:max-w-md mx-auto transition-all hover:shadow-2xl">
      {/* Package Header Badge */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{data.listingPackage || 'Free'} Package</span>
        </div>
        <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
          {data.purpose || 'Sale'}
        </span>
      </div>

      {/* Image Banner */}
      <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
        <img
          src={displayImg}
          alt={data.description?.title || 'Property'}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
          <Tag className="w-3 h-3 text-rose-400" />
          <span>{data.propertyType || 'Property'}</span>
        </div>
        {data.media && data.media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] px-2 py-1 rounded-md">
            +{data.media.length - 1} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Title & Location */}
        <div>
          <h4 className="font-bold text-slate-900 text-base line-clamp-1">
            {data.description?.title || `${data.propertyInfo?.bedrooms || 2} BHK ${data.propertyType || 'Property'}`}
          </h4>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">
              {data.location?.locality
                ? `${data.location.locality}, ${data.location.city || 'Bangalore'}`
                : data.location?.city || 'Location not specified'}
            </span>
          </p>
        </div>

        {/* Pricing */}
        <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">
              {isRent ? 'Monthly Rent' : 'Expected Price'}
            </span>
            <div className="text-xl font-extrabold text-slate-900">{formattedPrice}</div>
          </div>
          {data.pricing?.pricePerSqft ? (
            <div className="text-right">
              <span className="text-[11px] text-slate-500">Rate</span>
              <div className="text-xs font-bold text-slate-700">₹{data.pricing.pricePerSqft}/sq.ft</div>
            </div>
          ) : null}
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-xs text-slate-600">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 text-center">
            <Bed className="w-4 h-4 text-slate-700 mb-1" />
            <span className="font-bold text-slate-900">{data.propertyInfo?.bedrooms || 2} Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 text-center">
            <Bath className="w-4 h-4 text-slate-700 mb-1" />
            <span className="font-bold text-slate-900">{data.propertyInfo?.bathrooms || 2} Baths</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 text-center">
            <Move className="w-4 h-4 text-slate-700 mb-1" />
            <span className="font-bold text-slate-900">{data.propertyInfo?.carpetArea || 1200} sq.ft</span>
          </div>
        </div>

        {/* Top Amenities */}
        {data.amenities && data.amenities.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Amenities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.amenities.slice(0, 4).map((a, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Footer */}
        <div className="pt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{data.contactDetails?.userRole || 'Owner'} Verified</span>
          </div>
          <button className="magic-gradient text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Owner</span>
          </button>
        </div>
      </div>
    </div>
  );
};
