import type { Metadata } from "next";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { SUPPORT_EMAIL } from "@/lib/links";
import { APP_LOGIN_URL } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const suggestions = [
  { href: "/#features", label: "Features", text: "See what you can do with Redonion" },
  { href: "/#how-it-works", label: "How it works", text: "Trade in three simple steps" },
  { href: APP_LOGIN_URL, label: "Log in", text: "Go to your Redonion account" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip bg-black">
        <section className="relative bg-[url(/header.svg)] bg-[length:760px_auto] bg-bottom bg-no-repeat pb-[260px] sm:bg-[length:1100px_auto] sm:pb-[380px]">
          <div className="container-page flex flex-col items-center pt-16 text-center sm:pt-24">
            <p className="text-8xl leading-none font-semibold tracking-tighter text-transparent sm:text-[10rem] bg-gradient-to-b from-white to-white/30 bg-clip-text">
              404
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              This page went off-chain
            </h1>
            <p className="mt-4 max-w-md text-base text-white/65 sm:text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
              back on track.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 font-medium text-white shadow-lg shadow-primary/25 hover:bg-primary-dark"
              >
                Back to home <ArrowRightIcon className="size-5" />
              </Link>
              <CtaLink href={`mailto:${SUPPORT_EMAIL}`} variant="outline">
                <MailIcon className="size-5" /> Contact support
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="container-page pb-20">
          <ul className="grid gap-4 sm:grid-cols-3">
            {suggestions.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/60"
                >
                  <span className="flex items-center justify-between text-lg font-semibold">
                    {s.label} <ArrowRightIcon className="size-5 text-primary-light" />
                  </span>
                  <span className="mt-1 text-[15px] text-white/60">{s.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
