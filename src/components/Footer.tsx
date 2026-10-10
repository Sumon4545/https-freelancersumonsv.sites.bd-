import React from 'react';
import { BarChart3, Globe } from 'lucide-react';

interface FooterProps {
  totalClicks: number;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ totalClicks, onOpenAnalytics }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-8 pt-6 pb-10 border-t border-slate-800/60 text-center flex flex-col items-center gap-3">
      {/* Analytics link trigger */}
      <button
        onClick={onOpenAnalytics}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
      >
        <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
        <span>মোট ইন্টার‍্যাকশন: {totalClicks}</span>
      </button>

      {/* Website Backlink */}
      <a
        href="https://freelancersumonsv.base44.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>freelancersumonsv.base44.app</span>
      </a>

      {/* Copyright text */}
      <div className="text-xs text-slate-500">
        &copy; {currentYear}{' '}
        <span className="font-semibold text-slate-300">Freelancersumonsv</span>. All rights reserved.
      </div>
      <p className="text-[11px] text-slate-600">
        Online Marketing এর সহজ সমাধান | Digital Growth Partner
      </p>
    </footer>
  );
};
