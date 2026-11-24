import Link from "next/link";
import CustomImage from "@/components/CustomImageProps";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import StoreBadges from "@/components/StoreBadges";
import { LEGAL_LINKS, SOCIAL_LINKS, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/links";
import { APP_LOGIN_URL, APP_SIGNUP_URL } from "@/lib/urls";

const linkClass =
  "inline-flex min-h-11 items-center text-[15px] text-sec/70 transition-colors hover:text-primary sm:min-h-9";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Security", href: "/#security" },
      { label: "Get the app", href: "/#download" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: APP_LOGIN_URL },
      { label: "Create account", href: APP_SIGNUP_URL },
      { label: "Contact support", href: `mailto:${SUPPORT_EMAIL}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: LEGAL_LINKS.terms },
      { label: "Privacy Policy", href: LEGAL_LINKS.privacy },
      { label: "Data Protection", href: LEGAL_LINKS.dataPrivacy },
      { label: "Cookie Policy", href: LEGAL_LINKS.cookies },
      { label: "AML Policy", href: LEGAL_LINKS.aml },
    ].filter((l) => l.href),
  },
];

const socials = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "/instagram.svg" },
  { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: "/twitter.svg" },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: "/facebook.svg" },
].filter((s) => s.href);

export default function SiteFooter() {
  return (
    <footer className="bg-footer text-sec">
      <div className="container-page grid gap-12 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Redonion home">
            <CustomImage src="/logo.png" alt="" width={44} height={44} className="size-11" />
            <span className="text-2xl font-semibold tracking-tight">Redonion</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px] text-sec/70">
            Peer-to-peer crypto trading with escrow protection. Set your rate, pick your match.
          </p>

          <div className="mt-6 space-y-1 text-[15px]">
            <a href={`mailto:${SUPPORT_EMAIL}`} className={`${linkClass} break-all`}>
              {SUPPORT_EMAIL}
            </a>
            <br />
            <a href={`tel:${SUPPORT_PHONE.tel}`} className={linkClass}>
              {SUPPORT_PHONE.display}
            </a>
            <p className="text-sm text-sec/60">Mon–Fri, 08:00–17:00 WAT</p>
          </div>

          {socials.length > 0 && (
            <ul className="mt-5 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-white"
                  >
                    <CustomImage src={s.icon} alt="" width={22} height={22} />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <StoreBadges className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
                {col.title === "Legal" && (
                  <li>
                    <CookieSettingsButton className={linkClass} />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-sec/10">
        <div className="container-page flex flex-col gap-2 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-sec/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Redonion. All rights reserved.</p>
          <p>Crypto assets are volatile. Trade responsibly.</p>
        </div>
      </div>
    </footer>
  );
}
