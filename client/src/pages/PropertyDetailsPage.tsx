import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Move,
  Check,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowLeft,
  Share2,
  Heart,
  Tag,
} from 'lucide-react';
import { getPropertyByIdApi } from '../services/api';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (id) {
      getPropertyByIdApi(id)
        .then((res) => {
          if (res.data.success) setProperty(res.data.property);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Property Not Found</h2>
        <Link to="/" className="inline-flex items-center gap-1 text-rose-600 font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const isRent = property.purpose === 'Rent' || property.purpose === 'PG';
  const formattedPrice = isRent
    ? `₹${property.pricing?.rentAmount?.toLocaleString('en-IN') || 0} / month`
    : `₹${((property.pricing?.expectedPrice || 0) / 100000).toFixed(2)} Lakhs`;

  const images = property.media && property.media.length > 0 ? property.media : [
    { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80', tag: 'Living Room' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Listings
      </Link>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Images, Specs, Description, Amenities) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Hero Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-3 p-3">
            <div className="relative h-72 sm:h-96 bg-slate-100 rounded-2xl overflow-hidden">
              <img
                src={images[activeImageIdx]?.url}
                alt={property.description?.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-400" />
                <span>{property.propertyType}</span>
              </div>

              <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase">
                {property.purpose}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-rose-600 ring-2 ring-rose-500/30' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Specs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {property.description?.title || `${property.propertyInfo?.bedrooms || 2} BHK ${property.propertyType}`}
                </h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Quality Score: {property.qualityScore || 85}/100
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>
                  {property.location?.address ? `${property.location.address}, ` : ''}
                  {property.location?.locality}, {property.location?.city} - {property.location?.pincode}
                </span>
              </p>
            </div>

            {/* Overview Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Bedrooms</span>
                <span className="font-bold text-slate-900 text-sm">{property.propertyInfo?.bedrooms || 'N/A'} BHK</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Carpet Area</span>
                <span className="font-bold text-slate-900 text-sm">{property.propertyInfo?.carpetArea || 1200} sq.ft</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Furnishing</span>
                <span className="font-bold text-slate-900 text-sm">{property.propertyInfo?.furnishing || 'Semi-Furnished'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Facing</span>
                <span className="font-bold text-slate-900 text-sm">{property.propertyInfo?.facing || 'East'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Property Overview & AI Description</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description?.text}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Amenities & Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Pricing & Contact Card Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6 sticky top-24">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Expected Price</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{formattedPrice}</div>
              {property.pricing?.pricePerSqft && (
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  ₹{property.pricing.pricePerSqft} / sq.ft carpet rate
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Magicbricks Verified Listing</span>
              </div>
              <p className="text-slate-500">Owner responds within 15 minutes.</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => alert(`Contacting ${property.contactDetails?.name || 'Owner'} at ${property.contactDetails?.phone || '+91 98765 43210'}`)}
                className="w-full py-3.5 rounded-2xl magic-gradient text-white font-extrabold text-sm shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact {property.contactDetails?.userRole || 'Owner'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
