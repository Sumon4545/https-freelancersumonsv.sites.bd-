import React, { useState, useEffect } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { SocialCard } from './SocialCard';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { ShareModal } from './ShareModal';
import { AnalyticsModal } from './AnalyticsModal';
import { SOCIAL_LINKS } from '../data/links';
import { recordPageView, getTotalClicks } from '../utils/analytics';

export const SocialLinksPage: React.FC = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);

  // Determine current page URL for sharing
  const [shareUrl, setShareUrl] = useState('https://freelancersumonsv.base44.app/social-links');

  useEffect(() => {
    // Record real page view on mount
    recordPageView();
    setTotalClicks(getTotalClicks());

    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setShareUrl(currentUrl);
    }

    const handleAnalyticsUpdate = () => {
      setTotalClicks(getTotalClicks());
    };

    window.addEventListener('analytics:click', handleAnalyticsUpdate);
    return () => {
      window.removeEventListener('analytics:click', handleAnalyticsUpdate);
    };
  }, []);

  const handleRefreshAnalytics = () => {
    setTotalClicks(getTotalClicks());
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-between selection:bg-blue-600 selection:text-white px-4 py-8 overflow-x-hidden">
      {/* Background Ambience / Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern for tech/modern marketing aesthetic */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      </div>

      {/* Main Container: Mobile-first max-w-md */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Profile / Header with Logo */}
        <ProfileHeader onOpenShare={() => setIsShareOpen(true)} shareUrl={shareUrl} />

        {/* Social Links List */}
        <div className="w-full mt-4 space-y-3.5">
          {SOCIAL_LINKS.map((link) => (
            <SocialCard key={link.id} link={link} onLinkClick={() => setTotalClicks(getTotalClicks())} />
          ))}
        </div>

        {/* Direct Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer totalClicks={totalClicks} onOpenAnalytics={() => setIsAnalyticsOpen(true)} />
      </main>

      {/* Share / QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
      />

      {/* Analytics Modal */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        onRefresh={handleRefreshAnalytics}
      />
    </div>
  );
};
