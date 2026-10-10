import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SocialLink } from '../types';
import {
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  WhatsAppIcon,
  WebsiteIcon,
} from './Icons';
import { trackLinkClick } from '../utils/analytics';

interface SocialCardProps {
  link: SocialLink;
  onLinkClick?: (linkId: string) => void;
}

export const SocialCard: React.FC<SocialCardProps> = ({ link, onLinkClick }) => {
  const getIcon = () => {
    switch (link.platform) {
      case 'facebook':
        return <FacebookIcon className="w-6 h-6 text-[#1877F2]" />;
      case 'youtube':
        return <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />;
      case 'tiktok':
        return <TikTokIcon className="w-6 h-6 text-[#00F2FE]" />;
      case 'instagram':
        return <InstagramIcon className="w-6 h-6 text-[#E1306C]" />;
      case 'whatsapp':
        return <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />;
      case 'website':
        return <WebsiteIcon className="w-6 h-6 text-[#38BDF8]" />;
      default:
        return <ExternalLink className="w-6 h-6 text-blue-400" />;
    }
  };

  const handleClick = () => {
    trackLinkClick(link.id);
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${link.bnTitle} - ${link.subtitle}`}
      className={`group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${link.gradientBg} border border-slate-800/80 hover:border-slate-700/80 ${link.borderGlow} transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] shadow-lg shadow-black/40 hover:shadow-xl backdrop-blur-sm`}
    >
      {/* Featured Subtle Glow */}
      {link.featured && (
        <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue-600 text-white shadow-sm border border-blue-400/40">
          Featured
        </span>
      )}

      {/* Left: Icon & Titles */}
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-slate-850 transition duration-300 shadow-md">
          {getIcon()}
        </div>

        <div className="flex flex-col text-left truncate">
          <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors truncate">
            {link.bnTitle}
          </span>
          <span className="text-xs text-slate-400 truncate group-hover:text-slate-300 transition-colors">
            {link.subtitle}
          </span>
        </div>
      </div>

      {/* Right: Action arrow button */}
      <div className="shrink-0 flex items-center gap-1">
        <span className="hidden sm:inline text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
          ভিজিট করুন
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-sm">
          <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
};
