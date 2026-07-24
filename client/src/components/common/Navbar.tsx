import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Sparkles, User, PlusCircle, Bookmark, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWizard } from '../../context/WizardContext';

export const Navbar: React.FC<{ onOpenAIChat?: () => void }> = ({ onOpenAIChat }) => {
  const { user } = useAuth();
  const { isAutosaving, lastSavedTime, hasDraftAvailable, resumeDraft } = useWizard();
  const location = useLocation();

  const isWizardPage = location.pathname.includes('/post-property');

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
            className="flex items-center space-x-1.5 magic-gradient hover:opacity-95 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-rose-900/40 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Free Property</span>
          </Link>

          <Link
            to="/dashboard"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="User Dashboard"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
