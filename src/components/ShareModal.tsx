import React, { useState } from 'react';
import { X, Copy, Check, Share2, Smartphone } from 'lucide-react';
import { generateQrSvgUri } from '../utils/qrCode';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Freelancersumonsv | All Social Media Links',
          text: 'Freelancersumonsv-এর সব সোশ্যাল মিডিয়া এবং অনলাইন সার্ভিসের লিংক এক জায়গায়:',
          url: shareUrl,
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const qrUri = generateQrSvgUri(shareUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-blue-500/30 p-6 shadow-2xl shadow-blue-950/60 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 id="share-modal-title" className="text-xl font-bold text-white">
            প্রোফাইল শেয়ার করুন
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            স্মার্টফোনে স্ক্যান করুন অথবা লিংক কপি করে বন্ধুদের সাথে শেয়ার করুন
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-5 p-4 rounded-2xl bg-white flex flex-col items-center justify-center shadow-lg mx-auto w-fit">
          <img
            src={qrUri}
            alt="Freelancersumonsv Social Links QR Code"
            width={190}
            height={190}
            className="w-48 h-48 rounded-lg"
            loading="lazy"
          />
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-medium text-slate-700">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>ক্যামেরা দিয়ে স্ক্যান করুন</span>
          </div>
        </div>

        {/* URL Box & Copy Button */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <span className="truncate flex-1 font-mono text-[11px] text-blue-300">
              {shareUrl}
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> কপি হয়েছে
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> কপি লিংক
                </>
              )}
            </button>
          </div>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/25 active:scale-98"
            >
              <Share2 className="w-4 h-4" /> সরাসরি মোবাইল থেকে শেয়ার
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
