import React from 'react';
import { Building2, Sparkles, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg magic-gradient flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">magicbricks</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            India's premier property posting and real estate discovery platform.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Buyer Leads</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Property Purpose</h4>
          <ul className="space-y-1.5">
            <li><Link to="/post-property" className="hover:text-rose-400 transition-colors">Sell Property Online</Link></li>
            <li><Link to="/post-property" className="hover:text-rose-400 transition-colors">Rent Out Flat / House</Link></li>
            <li><Link to="/post-property" className="hover:text-rose-400 transition-colors">Post PG Accommodation</Link></li>
            <li><Link to="/post-property" className="hover:text-rose-400 transition-colors">Commercial Space Leasing</Link></li>
          </ul>
        </div>

        {/* Smart Features */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Smart Features</h4>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-rose-400" /> AI Description Generator</li>
            <li className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> Smart Price Benchmark Tool</li>
            <li className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-rose-400" /> Listing Quality Score (0-100)</li>
            <li className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> Image Quality Inspector</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Customer Support</h4>
          <p className="flex items-center gap-2 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-rose-400" /> 1800-419-7575 (Toll Free)
          </p>
          <p className="flex items-center gap-2 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-rose-400" /> support@magicbricks.com
          </p>
          <p className="text-[11px] text-slate-500 pt-1">Mon - Sat: 9:00 AM - 8:00 PM IST</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4 text-center sm:text-left">
        <p>© 2026 Magicbricks Real Estate Platform. All rights reserved.</p>
        <p className="flex items-center gap-1 justify-center">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Mobile, Tablet & Desktop.
        </p>
      </div>
    </footer>
  );
};
