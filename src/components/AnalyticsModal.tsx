import React from 'react';
import { X, BarChart3, Eye, MousePointerClick, RefreshCw } from 'lucide-react';
import { getClickStats, getPageViews, getTotalClicks } from '../utils/analytics';
import { SOCIAL_LINKS } from '../data/links';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose, onRefresh }) => {
  if (!isOpen) return null;

  const stats = getClickStats();
  const views = getPageViews();
  const totalClicks = getTotalClicks();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-blue-500/30 p-6 shadow-2xl shadow-blue-950/60 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="analytics-title" className="text-lg font-bold text-white">
              লিংক এনালিটিক্স
            </h3>
            <p className="text-xs text-slate-400">রিয়েল-টাইম ভিজিটর ইন্টার‍্যাকশন ট্র্যাকিং</p>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>পেজ ভিউ</span>
            </div>
            <div className="text-xl font-extrabold text-white">{views}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
              <span>মোট ক্লিক</span>
            </div>
            <div className="text-xl font-extrabold text-white">{totalClicks}</div>
          </div>
        </div>

        {/* Detailed List */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {SOCIAL_LINKS.map((link) => {
            const count = stats[link.id] || 0;
            const percent = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{link.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{percent}%</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-950 border border-blue-800/60 text-blue-300 font-bold">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRefresh}
          className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> রিফ্রেশ করুন
        </button>
      </div>
    </div>
  );
};
