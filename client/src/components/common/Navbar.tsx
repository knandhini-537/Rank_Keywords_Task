import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Sparkles, User, PlusCircle, Bookmark, CheckCircle2, ChevronDown, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWizard } from '../../context/WizardContext';

export const Navbar: React.FC<{ onOpenAIChat?: () => void }> = ({ onOpenAIChat }) => {
  const { user } = useAuth();
  const { isAutosaving, lastSavedTime, hasDraftAvailable, resumeDraft } = useWizard();
  const location = useLocation();

  const isWizardPage = location.pathname.includes('/post-property');

  // Simple state for a profile dropdown (if they want to add logout later)
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl magic-gradient flex items-center justify-center text-white shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">magicbricks</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Smart Property Platform</p>
          </div>
        </Link>

        {/* Center Autosave Indicator for Wizard */}
        {isWizardPage && (
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs">
            {isAutosaving ? (
              <>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-amber-300 font-medium">Autosaving draft...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300">
                  Autosaved {lastSavedTime ? `at ${lastSavedTime}` : 'to cloud'}
                </span>
              </>
            )}
          </div>
        )}

        {/* Right Navigation */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {hasDraftAvailable && !isWizardPage && (
            <button
              onClick={resumeDraft}
              className="hidden sm:flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Resume Draft</span>
            </button>
          )}

          {onOpenAIChat && (
            <button
              onClick={onOpenAIChat}
              className="flex items-center space-x-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-500/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
          )}

          <Link
            to="/post-property"
            className="flex items-center space-x-1.5 magic-gradient hover:opacity-95 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-rose-900/40 transition-all transform active:scale-95 hidden sm:flex"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Free Property</span>
          </Link>

          {/* Dynamic User Profile Indicator */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.name.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-xs font-bold text-white leading-tight">{user?.name || 'User'}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{user?.userType || 'Owner'} Account</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <UserCheck className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
};
