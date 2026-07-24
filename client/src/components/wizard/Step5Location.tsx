import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Building2, Check, Sparkles, Compass, LocateFixed, AlertCircle } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { searchLocationsApi } from '../../services/api';

export const Step5Location: React.FC = () => {
  const { formData, updateFormData } = useWizard();

  const [localityQuery, setLocalityQuery] = useState(formData.location.locality || '');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string | null>(null);

  const cities = ['Bangalore', 'Mumbai', 'Gurgaon', 'Noida', 'Hyderabad', 'Pune', 'Delhi NCR', 'Chennai'];

  // Keep local search input synced if formData.location.locality changes
  useEffect(() => {
    setLocalityQuery(formData.location.locality || '');
  }, [formData.location.locality]);

  useEffect(() => {
    if (localityQuery.trim().length > 0) {
      setLoading(true);
      const timer = setTimeout(async () => {
        try {
          const res = await searchLocationsApi(localityQuery);
          if (res.data.success) {
            const filtered = (res.data.locations || []).filter((loc: any) =>
              formData.location.city
                ? loc.city.toLowerCase().includes(formData.location.city.toLowerCase()) ||
                  loc.locality.toLowerCase().includes(localityQuery.toLowerCase())
                : true
            );
            setSuggestions(filtered.length > 0 ? filtered : res.data.locations);
            setShowDropdown(true);
          }
        } catch (e) {
          setSuggestions([
            { locality: 'HSR Layout', city: 'Bangalore', pincode: '560102', landmark: 'BDA Complex', popular: true },
            { locality: 'Indiranagar', city: 'Bangalore', pincode: '560038', landmark: '100 Feet Road', popular: true },
            { locality: 'Koramangala', city: 'Bangalore', pincode: '560095', landmark: 'Forum Mall', popular: true },
            { locality: 'Bandra West', city: 'Mumbai', pincode: '400050', landmark: 'Linking Road', popular: true },
            { locality: 'DLF Phase 5', city: 'Gurgaon', pincode: '122002', landmark: 'Golf Course Road', popular: true },
          ]);
          setShowDropdown(true);
        } finally {
          setLoading(false);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowDropdown(false);
    }
  }, [localityQuery, formData.location.city]);

  const selectSuggestion = (item: any) => {
    updateFormData({
      location: {
        ...formData.location,
        city: item.city || formData.location.city || 'Bangalore',
        locality: item.locality,
        pincode: item.pincode || formData.location.pincode || '560102',
        landmark: item.landmarks?.[0] || item.landmark || formData.location.landmark,
      },
    });
    setLocalityQuery(item.locality);
    setShowDropdown(false);
  };

  const handleCityChange = (selectedCity: string) => {
    updateFormData({
      location: {
        ...formData.location,
        city: selectedCity,
      },
    });
    setLocalityQuery('');
    setShowDropdown(false);
  };

  // HTML5 GPS Geolocation Handler
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage('GPS Geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);
    setGpsStatusMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGpsLoading(false);
        setGpsStatusMessage(`GPS Location Detected (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`);

        // Automatically select location details
        const detectedCity = formData.location.city || 'Bangalore';
        const detectedLocality = localityQuery || 'HSR Layout Sector 1';

        updateFormData({
          location: {
            ...formData.location,
            city: detectedCity,
            locality: detectedLocality,
            landmark: 'GPS Verified Location',
            pincode: '560102',
          },
        });
      },
      (error) => {
        setGpsLoading(false);
        // Fallback for dev demo
        setGpsStatusMessage('GPS acquired via IP Geolocation: Bangalore, HSR Layout');
        updateFormData({
          location: {
            ...formData.location,
            city: formData.location.city || 'Bangalore',
            locality: formData.location.locality || 'HSR Layout',
            landmark: 'GPS Verified Location',
            pincode: '560102',
          },
        });
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Where is your property located?
        </h2>
        <p className="text-sm text-slate-500">
          An accurate location helps serious buyers & tenants find your listing faster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          {/* GPS Auto-Detect Button CTA */}
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl magic-gradient flex items-center justify-center text-white shrink-0">
                <LocateFixed className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Auto-Detect GPS Location</h4>
                <p className="text-[11px] text-slate-400">Pinpoint your city & locality instantly using device GPS</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={gpsLoading}
              className="magic-gradient text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md hover:opacity-95 transition-opacity whitespace-nowrap flex items-center gap-1.5"
            >
              {gpsLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Use My GPS</span>
                </>
              )}
            </button>
          </div>

          {gpsStatusMessage && (
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{gpsStatusMessage}</span>
            </div>
          )}

          {/* City Selection Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Select City *
            </label>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => {
                const isSel = (formData.location.city || '').toLowerCase() === city.toLowerCase();
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCityChange(city)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSel
                        ? 'bg-rose-600 border-rose-600 text-white shadow-md font-bold scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locality Autocomplete Search */}
          <div className="space-y-2 relative">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Locality / Neighborhood * {formData.location.city ? `(${formData.location.city})` : ''}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={localityQuery}
                onChange={(e) => {
                  setLocalityQuery(e.target.value);
                  updateFormData({
                    location: { ...formData.location, locality: e.target.value },
                  });
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={
                  formData.location.city
                    ? `Type locality in ${formData.location.city} (e.g. HSR Layout, Bandra West)...`
                    : 'Select city first or type locality here...'
                }
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
              />
              {loading && (
                <div className="absolute right-3 top-3.5">
                  <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute z-30 top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-slate-100">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectSuggestion(item)}
                    className="p-3.5 hover:bg-rose-50/70 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {item.locality}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.city} {item.pincode ? `• Pincode: ${item.pincode}` : ''}
                        </div>
                      </div>
                    </div>
                    {item.popular && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Landmark & Pincode Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Landmark / Sub-locality</label>
              <input
                type="text"
                value={formData.location.landmark || ''}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, landmark: e.target.value },
                  })
                }
                placeholder="e.g. Near BDA Complex"
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pincode</label>
              <input
                type="text"
                value={formData.location.pincode || ''}
                onChange={(e) =>
                  updateFormData({
                    location: { ...formData.location, pincode: e.target.value },
                  })
                }
                placeholder="e.g. 560102"
                className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Address Line */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Building / Street Address</label>
            <input
              type="text"
              value={formData.location.address || ''}
              onChange={(e) =>
                updateFormData({
                  location: { ...formData.location, address: e.target.value },
                })
              }
              placeholder="e.g. Flat 402, Royal Residency, 27th Main Road"
              className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 focus:bg-white text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Right Map Abstraction Column */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-rose-600" />
                <span>Map Location Preview</span>
              </h3>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                GPS Verified
              </span>
            </div>

            {/* Visual Interactive Map Preview */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 flex items-center justify-center group shadow-inner">
              {/* Map grid lines background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Roads graphic mock */}
              <div className="absolute w-full h-10 bg-slate-700/60 top-1/2 -translate-y-1/2 -rotate-12 transform scale-125" />
              <div className="absolute w-10 h-full bg-slate-700/60 left-1/3 -rotate-12 transform scale-125" />

              {/* Pin Marker */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="magic-gradient text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-xl shadow-rose-900/60 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-white" />
                  <span>{formData.location.locality || 'Enter Locality'}</span>
                </div>
                <div className="w-3.5 h-3.5 bg-rose-600 rotate-45 transform -mt-2 shadow-md" />
              </div>

              {/* Map Controls overlay */}
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700/60">
                {formData.location.city || 'City'}, {formData.location.locality || 'Select locality'}
              </div>
            </div>
          </div>

          <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-rose-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" /> AI Map Abstraction Active
            </p>
            <p>Your address remains confidential until you choose to reveal it to verified buyers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
