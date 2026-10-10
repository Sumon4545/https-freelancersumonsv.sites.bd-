export interface SocialLink {
  id: string;
  name: string;
  bnTitle: string;
  subtitle: string;
  url: string;
  actionText?: string;
  platform: 'facebook' | 'youtube' | 'tiktok' | 'instagram' | 'whatsapp' | 'website';
  accentColor: string;
  gradientBg: string;
  borderGlow: string;
  textColor: string;
  featured?: boolean;
}

export interface ClickStat {
  [linkId: string]: number;
}
