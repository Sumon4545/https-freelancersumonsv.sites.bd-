const STORAGE_KEY = 'freelancersumonsv_link_clicks';
const SESSIONS_KEY = 'freelancersumonsv_page_views';

export interface ClickRecord {
  [linkId: string]: number;
}

export function recordPageView(): number {
  try {
    const current = parseInt(localStorage.getItem(SESSIONS_KEY) || '0', 10);
    const updated = current + 1;
    localStorage.setItem(SESSIONS_KEY, updated.toString());
    return updated;
  } catch {
    return 1;
  }
}

export function getPageViews(): number {
  try {
    return parseInt(localStorage.getItem(SESSIONS_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

export function getClickStats(): ClickRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function trackLinkClick(linkId: string): number {
  try {
    const stats = getClickStats();
    stats[linkId] = (stats[linkId] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

    // Optional Beacon / Analytics Event simulation
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as { gtag: (event: string, action: string, params: object) => void }).gtag(
        'event',
        'social_link_click',
        {
          link_id: linkId,
          timestamp: new Date().toISOString(),
        }
      );
    }

    window.dispatchEvent(new CustomEvent('analytics:click', { detail: { linkId, count: stats[linkId] } }));
    return stats[linkId];
  } catch {
    return 1;
  }
}

export function getTotalClicks(): number {
  const stats = getClickStats();
  return Object.values(stats).reduce((acc, curr) => acc + curr, 0);
}
