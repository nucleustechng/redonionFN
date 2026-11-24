// Cookie consent, stored in a first-party cookie so the app subdomain can read
// the same choice. Only "necessary" storage runs without consent; anything
// optional (analytics, marketing) must check `hasConsent()` before loading.

export const CONSENT_COOKIE = "redonion_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months
export const OPEN_SETTINGS_EVENT = "redonion:cookie-settings";
const CHANGE_EVENT = "redonion:consent-change";

export interface Consent {
  v: number;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the choice. */
  at: string;
}

export type OptionalCategory = "analytics" | "marketing";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    // Ask again when the categories change.
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Pick<Consent, OptionalCategory>): Consent {
  const consent: Consent = { v: CONSENT_VERSION, ...choice, at: new Date().toISOString() };
  const host = window.location.hostname;
  // Share with app.redonion.io; host-only cookie on localhost / previews.
  const domain = host === "redonion.io" || host.endsWith(".redonion.io") ? "; domain=.redonion.io" : "";
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax${domain}${secure}`;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  return consent;
}

export function hasConsent(category: OptionalCategory): boolean {
  return readConsent()?.[category] === true;
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

/** Re-opens the cookie banner (used by the footer's "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}
