"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CustomImage from "@/components/CustomImageProps";
import CtaLink from "@/components/CtaLink";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { APP_LOGIN_URL, APP_SIGNUP_URL } from "@/lib/urls";

// Absolute so they work from the legal pages and the 404 page too.
const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#security", label: "Security" },
  { href: "/#download", label: "Get the app" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label="Redonion home" className="flex shrink-0 items-center gap-2.5" onClick={close}>
          <CustomImage src="/logo.png" alt="" width={40} height={40} loading="eager" className="size-9 sm:size-10" />
          <span className="text-xl font-semibold tracking-tight text-white">Redonion</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={APP_LOGIN_URL}
            className="inline-flex min-h-11 items-center rounded-xl px-4 text-[15px] font-medium text-white hover:bg-white/10"
          >
            Log in
          </a>
          <CtaLink href={APP_SIGNUP_URL} size="md">
            Create account
          </CtaLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-xl text-white hover:bg-white/10 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-black sm:hidden">
          <ul className="container-page py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-12 items-center border-b border-white/5 text-base text-white/80"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-page flex flex-col gap-3 pt-2 pb-6">
            <a
              href={APP_LOGIN_URL}
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 font-medium text-white"
            >
              Log in
            </a>
            <CtaLink href={APP_SIGNUP_URL} onClick={close} className="w-full">
              Create account
            </CtaLink>
          </div>
        </div>
      )}
    </header>
  );
}
