import React from 'react';
import { Phone, Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { trackLinkClick } from '../utils/analytics';

export const ContactSection: React.FC = () => {
  return (
    <section aria-labelledby="contact-heading" className="w-full mt-6 pt-6 border-t border-slate-800/80">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 id="contact-heading" className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>যোগাযোগ ও কনসাল্টেশন</span>
        </h2>
        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" /> দ্রুত রেসপন্স
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Direct WhatsApp Call/Chat */}
        <a
          href="https://wa.me/8801710433186?text=Hello%20Freelancersumonsv,%20I%20am%20interested%20in%20your%20digital%20marketing%20services."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLinkClick('whatsapp_direct')}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900/90 to-emerald-900/20 border border-emerald-500/30 hover:border-emerald-500/70 text-slate-200 hover:text-white transition group shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-semibold text-emerald-400">WhatsApp চ্যাট</div>
            <div className="text-sm font-bold text-white truncate">WhatsApp-এ যোগাযোগ করুন</div>
          </div>
        </a>

        {/* Direct Phone Call */}
        <a
          href="tel:+8801710433186"
          onClick={() => trackLinkClick('phone_call')}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900/90 to-indigo-900/20 border border-blue-500/30 hover:border-blue-500/70 text-slate-200 hover:text-white transition group shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <div className="text-xs font-semibold text-blue-400">সরাসরি কল</div>
            <div className="text-sm font-bold text-white truncate">ভয়েস কল করুন</div>
          </div>
        </a>

        {/* Direct Email */}
        <a
          href="mailto:sumon4545678910@gmail.com"
          onClick={() => trackLinkClick('email')}
          className="sm:col-span-2 flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition group shadow-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left truncate">
              <div className="text-xs font-semibold text-slate-400">অফিসিয়াল ইমেইল</div>
              <div className="text-sm font-medium text-white truncate">sumon4545678910@gmail.com</div>
            </div>
          </div>
          <span className="shrink-0 text-xs font-medium text-sky-400 group-hover:text-sky-300">
            মেইল পাঠান &rarr;
          </span>
        </a>
      </div>

      {/* Trust & Guarantee badge */}
      <div className="mt-4 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
        <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
        <span className="leading-tight">
          ১০০% বিশ্বস্ত ও ক্লায়েন্ট-সন্তুষ্টি অগ্রাধিকারসহ প্রফেশনাল ডিজিটাল মার্কেটিং সেবা।
        </span>
      </div>
    </section>
  );
};
