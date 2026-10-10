import React, { useState } from 'react';
import { BadgeCheck, Share2, Copy, Check } from 'lucide-react';
import userAvatarUrl from '../assets/images/user_avatar.jpg';

interface ProfileHeaderProps {
  onOpenShare: () => void;
  shareUrl: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onOpenShare, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <header className="relative flex flex-col items-center text-center px-4 pt-6 pb-4">
      {/* Top action row */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-1">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/20 text-[11px] font-medium text-blue-200/90 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Online Marketing Specialist</span>
        </div>

        {/* Quick Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            title="লিংক কপি করুন"
            aria-label="লিংক কপি করুন"
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition active:scale-95 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenShare}
            title="শেয়ার ও QR কোড"
            aria-label="শেয়ার এবং কিউআর কোড দেখুন"
            className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white transition active:scale-95 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copy toast notice */}
      {copied && (
        <div className="absolute top-16 z-20 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg shadow-emerald-900/40 animate-bounce">
          লিংক সফলভাবে কপি করা হয়েছে!
        </div>
      )}

      {/* Profile Photo / Avatar Logo Area */}
      <div className="relative mb-4 group">
        {/* Ambient Glow */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 opacity-60 blur-md group-hover:opacity-90 transition duration-500 animate-pulse"></div>

        {/* Inner Border Ring */}
        <div className="relative p-1 rounded-full bg-gradient-to-br from-blue-500 via-slate-900 to-indigo-500 shadow-xl">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-slate-900 border-2 border-[#050b14] relative">
            <img
              src={userAvatarUrl || '/avatar.jpg'}
              alt="Freelancersumonsv Profile Logo"
              width={128}
              height={128}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
              loading="eager"
            />
          </div>
        </div>

        {/* Verified Badge */}
        <div
          className="absolute bottom-1 right-1 p-1 rounded-full bg-blue-600 text-white shadow-md border-2 border-[#050b14]"
          title="Verified Brand"
        >
          <BadgeCheck className="w-5 h-5 fill-blue-600 text-white" />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
        <span className="bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
          Freelancersumonsv
        </span>
      </h1>

      {/* Tagline */}
      <div className="mt-1.5 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-sky-400">
        <span>Online Marketing এর সহজ সমাধান</span>
      </div>

      {/* Subtitle */}
      <p className="mt-1 text-xs sm:text-sm font-medium text-slate-300">
        Connect with us on social media
      </p>

      {/* Short Description */}
      <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
        আমাদের সব সোশ্যাল মিডিয়া ও অনলাইন সার্ভিস এক জায়গায় খুঁজে নিন।
      </p>
    </header>
  );
};
