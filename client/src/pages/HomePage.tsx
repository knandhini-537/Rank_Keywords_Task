import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Bookmark,
  Building,
  Store,
  Trees,
  Layers,
  Home,
  Key,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useWizard } from '../context/WizardContext';
import { getPropertiesApi } from '../services/api';

export const HomePage: React.FC = () => {
  const { hasDraftAvailable, resumeDraft } = useWizard();
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState('Sale');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPropertiesApi()
      .then((res) => {
        if (res.data.success) {
          setProperties(res.data.properties || []);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProperties = properties.filter((p) => {
    if (selectedPurpose && p.purpose?.toLowerCase() !== selectedPurpose.toLowerCase()) return false;
    if (selectedCategory !== 'All' && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.location?.city?.toLowerCase().includes(q) ||
        p.location?.locality?.toLowerCase().includes(q) ||
        p.propertyType?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-12 pb-16 px-4 overflow-hidden border-b border-slate-800">
        {/* Background Glow Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Post Property Faster & <span className="text-rose-500">Sell 3x Quicker</span> on Magicbricks
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            India's premiere real estate platform for Buyers, Tenants, Property Owners, Real Estate Agents & Builders.
          </p>

          {/* Quick Search & Filter Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-slate-800 border border-slate-200 shadow-2xl max-w-3xl mx-auto space-y-4">
            {/* Purpose Toggles */}
            <div className="flex justify-center gap-2 border-b border-slate-100 pb-3">
              {['Sale', 'Rent', 'PG'].map((purp) => (
                <button
                  key={purp}
                  onClick={() => setSelectedPurpose(purp)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPurpose === purp
                      ? 'magic-gradient text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {purp}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, locality, or property type (e.g. HSR Layout, Villa)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <Link
                to="/post-property"
                className="magic-gradient text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Free Property</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Groups / Role Selection Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Explore by Your Role</h2>
          <p className="text-xs text-slate-500">Dedicated solutions for every real estate user group</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Buyer / Tenant */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Buyers & Tenants</h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore 10,000+ verified homes, flats, and PG accommodations with 0% brokerage options.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('featured-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>Search Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Property Owner (Seller) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Property Owners</h3>
              <p className="text-xs text-slate-500 mt-1">
                Post your flat, villa or house for Sale or Rent with AI description and valuation tools.
              </p>
            </div>
            <Link
              to="/post-property"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Post Free Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Real Estate Agent */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Real Estate Agents</h3>
              <p className="text-xs text-slate-500 mt-1">
                Manage client portfolios, post unlimited properties, and get top search placement tags.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Agent Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Builder / Developer */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Builders & Developers</h3>
              <p className="text-xs text-slate-500 mt-1">
                List new residential townships, high-rise towers, or commercial IT SEZ developments.
              </p>
            </div>
            <Link
              to="/post-property"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>List Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Resume Draft Banner Notification (if available) */}
      {hasDraftAvailable && (
        <section className="max-w-5xl mx-auto px-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-amber-900">
              <Bookmark className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Unfinished Property Posting Draft Detected!</h4>
                <p className="text-xs text-amber-800">
                  You have an autosaved property draft stored on cloud. Resume where you left off!
                </p>
              </div>
            </div>

            <Link
              to="/post-property"
              onClick={resumeDraft}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors whitespace-nowrap"
            >
              Resume Draft Now
            </Link>
          </div>
        </section>
      )}

      {/* Property Listings Grid Section */}
      <section id="featured-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Featured Property Listings</h2>
            <p className="text-xs text-slate-500">
              Filter live verified properties by category: Residential (Homes/Flats), Commercial (Offices/Shops), or Agricultural (Lands/Farmlands).
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'All', label: 'All Categories', icon: Layers },
              { id: 'Residential', label: 'Residential', icon: Building },
              { id: 'Commercial', label: 'Commercial', icon: Store },
              { id: 'Agricultural', label: 'Agricultural', icon: Trees },
            ].map((cat) => {
              const isSel = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 shrink-0 ${
                    isSel
                      ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">
              No {selectedCategory !== 'All' ? selectedCategory : ''} properties found
            </h3>
            <p className="text-xs text-slate-500">Be the first to post a listing in this category!</p>
            <Link
              to="/post-property"
              className="inline-flex items-center gap-1.5 magic-gradient text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              <PlusCircle className="w-4 h-4" /> Post Property Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => {
              const isRent = prop.purpose === 'Rent' || prop.purpose === 'PG';
              const formattedPrice = isRent
                ? `₹${prop.pricing?.rentAmount?.toLocaleString('en-IN') || 0}/mo`
                : `₹${((prop.pricing?.expectedPrice || 0) / 100000).toFixed(2)} Lakhs`;

              return (
                <div
                  key={prop._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={
                          prop.media?.[0]?.url ||
                          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
                        }
                        alt={prop.description?.title || 'Property'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {prop.propertyType}
                      </div>
                      <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {prop.purpose}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                          {prop.description?.title || `${prop.propertyInfo?.bedrooms || 2} BHK ${prop.propertyType}`}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">
                            {prop.location?.locality}, {prop.location?.city}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Price</span>
                          <span className="text-lg font-black text-slate-900">{formattedPrice}</span>
                        </div>

                        <div className="text-right text-xs text-slate-600">
                          <span className="font-bold text-slate-900 block">{prop.propertyInfo?.carpetArea || 1200} sq.ft</span>
                          <span className="text-[10px] text-slate-400">Carpet Area</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      to={`/property/${prop._id}`}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
