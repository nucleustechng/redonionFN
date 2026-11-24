import type { ReactNode } from "react";
import Link from "next/link";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { LEGAL_LINKS } from "@/lib/links";

export interface LegalSection {
  /** Anchor id, e.g. "data-we-collect". */
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  /** One or two sentences under the title. */
  summary: ReactNode;
  sections: LegalSection[];
}

const OTHER_DOCS = [
  { href: LEGAL_LINKS.terms, label: "Terms of Service" },
  { href: LEGAL_LINKS.privacy, label: "Privacy Policy" },
  { href: LEGAL_LINKS.dataPrivacy, label: "Data Protection" },
  { href: LEGAL_LINKS.cookies, label: "Cookie Policy" },
];

/**
 * Shared layout for the legal pages: dark title band, sticky contents list on
 * desktop (collapsible on phones), and readable body copy.
 */
export default function LegalDocument({ title, summary, sections }: LegalDocumentProps) {
  return (
    <>
      <section className="border-b border-white/10 bg-black">
        <div className="container-page py-12 sm:py-20">
          <p className="text-sm font-medium tracking-wide text-primary-light uppercase">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{title}</h1>
          <div className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{summary}</div>
          <p className="mt-6 text-sm text-white/50">Last updated {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <div className="bg-white text-ink">
        <div className="container-page grid gap-10 py-10 sm:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="group rounded-2xl border border-ink/10 lg:border-0" open>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-semibold lg:hidden">
                On this page
                <span className="transition-transform group-open:rotate-180" aria-hidden>
                  ▾
                </span>
              </summary>
              <p className="mb-3 hidden text-sm font-semibold tracking-wide text-ink/50 uppercase lg:block">
                On this page
              </p>
              <nav aria-label="Sections">
                <ol className="space-y-1 px-4 pb-4 text-sm lg:px-0 lg:pb-0">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-2 rounded-lg py-1.5 text-ink/70 hover:text-primary"
                      >
                        <span className="w-5 shrink-0 tabular-nums text-ink/40">{i + 1}.</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <article className="legal-prose">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2>
                    <span className="mr-2 text-ink/30 tabular-nums">{i + 1}.</span>
                    {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </article>
            <nav aria-label="Other legal documents" className="mt-16 border-t border-ink/10 pt-8">
              <p className="text-sm font-semibold text-ink/50">More legal documents</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {OTHER_DOCS.filter((d) => d.label !== title).map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="inline-flex min-h-11 items-center rounded-full border border-ink/15 px-4 text-sm font-medium hover:border-primary hover:text-primary"
                    >
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
