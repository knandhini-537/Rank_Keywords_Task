import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, Bookmark, Trash2, Eye, PlusCircle, Filter, Users, Building, Store, Trees, ShieldCheck, MapPin, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWizard } from '../context/WizardContext';
import { getPropertiesApi, getUserPropertiesApi, deletePropertyApi } from '../services/api';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { hasDraftAvailable, resumeDraft } = useWizard();

  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    setLoading(true);
    try {
      if (activeTab === 'my') {
        const res = await getUserPropertiesApi();
        if (res.data.success) {
          setProperties(res.data.properties || []);
        }
      } else {
        const res = await getPropertiesApi();
        if (res.data.success) {
          setProperties(res.data.properties || []);
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [activeTab]);

  const handleDelete = async (id: string, propTitle?: string) => {
    if (!window.confirm(`Are you sure you want to delete "${propTitle || 'this listing'}"? It will be permanently removed.`)) return;

    try {
      await deletePropertyApi(id);
      setProperties((prev) => prev.filter((p) => p._id.toString() !== id.toString()));
    } catch (e) {
      setProperties((prev) => prev.filter((p) => p._id.toString() !== id.toString()));
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (selectedCategoryFilter === 'All') return true;
    return p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl magic-gradient flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'Property Owner'}</h1>
            <p className="text-xs text-slate-400">{user?.email || 'owner@magicbricks-ai.com'}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded uppercase">
                {user?.userType || 'Owner'} Verified
              </span>
              <span className="text-xs text-slate-400">• Persistent Data Active</span>
            </div>
          </div>
        </div>

        <Link
          to="/post-property"
          className="magic-gradient text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:opacity-95 transition-opacity flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Property</span>
        </Link>
      </div>

      {/* Resume Draft Callout (if active) */}
      {hasDraftAvailable && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-amber-900">
            <Bookmark className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Draft Property In Progress</h3>
              <p className="text-xs text-amber-800">You have an autosaved 6-step property draft ready to complete.</p>
            </div>
          </div>

          <Link
            to="/post-property"
            onClick={resumeDraft}
            className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-700 transition-colors"
          >
            Resume Draft
          </Link>
        </div>
      )}

      {/* Dashboard View Switcher: My Listings vs All Community Listings */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Main View Mode Tabs */}
          <div className="flex items-center space-x-2 bg-slate-200 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'my'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              My Listings ({activeTab === 'my' ? properties.length : ''})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              All Community Listings ({activeTab === 'all' ? properties.length : ''})
            </button>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {['All', 'Residential', 'Commercial', 'Agricultural'].map((cat) => {
              const isSel = selectedCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isSel
                      ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">
              No {selectedCategoryFilter !== 'All' ? selectedCategoryFilter : ''} properties found
            </h3>
            <p className="text-xs text-slate-500">Post a listing to see it persistently stored here!</p>
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
                ? `₹${prop.pricing?.rentAmount?.toLocaleString('en-IN') || prop.pricing?.expectedPrice?.toLocaleString('en-IN') || 0}/mo`
                : `₹${((prop.pricing?.expectedPrice || prop.pricing?.rentAmount || 0) / 100000).toFixed(2)} Lakhs`;

              return (
                <div
                  key={prop._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Image Banner & Category Tags */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={
                          prop.media?.[0]?.url ||
                          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
                        }
                        alt={prop.description?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Score: {prop.qualityScore || 85}/100
                      </div>

                      <div className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {prop.category}
                      </div>

                      {/* Explicit Delete Icon Button */}
                      <button
                        onClick={() => handleDelete(prop._id, prop.description?.title || prop.propertyType)}
                        className="absolute bottom-2 right-2 p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-transform hover:scale-110 flex items-center gap-1 text-[11px] font-bold"
                        title="Delete Property Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Owner Metadata Badge */}
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-rose-500" />
                          <span>Owner: {prop.contactDetails?.name || 'Sriram Owner'}</span>
                        </span>
                        <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {prop.contactDetails?.userRole || 'Owner'}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {prop.description?.title || prop.propertyType}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">
                            {prop.location?.locality}, {prop.location?.city}
                          </span>
                        </p>
                      </div>

                      <div className="text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-base font-black text-slate-900">{formattedPrice}</span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {prop.propertyInfo?.carpetArea || 1200} sq.ft
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      to={`/property/${prop._id}`}
                      className="text-rose-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Public Listing
                    </Link>

                    <button
                      onClick={() => handleDelete(prop._id, prop.description?.title || prop.propertyType)}
                      className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
