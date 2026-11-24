"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import {
  OPEN_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  subscribeConsent,
  type OptionalCategory,
} from "@/lib/consent";
import { LEGAL_LINKS } from "@/lib/links";

const CATEGORIES: { key: OptionalCategory; title: string; description: string }[] = [
  {
    key: "analytics",
    title: "Analytics",
    description: "Helps us understand how the site is used so we can improve it. Not in use today.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Measures campaigns and personalises promotions. Not in use today.",
  },
];

function Toggle({
  checked,
  onChange,
  disabled,
  labelledBy,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  labelledBy: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        checked ? "bg-primary" : "bg-ink/20"
      }`}
    >
      <span
        className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  // Cookies only exist in the browser; the server snapshot keeps the banner hidden.
  const decided = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() !== null,
    () => true
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, marketing: false });
  const id = useId();

  useEffect(() => {
    const onOpenSettings = () => {
      const current = readConsent();
      setChoice({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      setCustomising(true);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const open = !decided || settingsOpen;
  if (!open) return null;

  const decide = (value: { analytics: boolean; marketing: boolean }) => {
    saveConsent(value);
    setSettingsOpen(false);
    setCustomising(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${id}-title`}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-xl rounded-2xl bg-white p-5 text-ink shadow-2xl ring-1 ring-black/5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-6"
    >
      <h2 id={`${id}-title`} className="text-lg font-semibold">
        {customising ? "Cookie settings" : "We value your privacy"}
      </h2>
      <p className="mt-2 text-sm text-ink/70">
        We use only the cookies needed to run this site. Analytics and marketing cookies stay
        off unless you allow them. See our{" "}
        <Link href={LEGAL_LINKS.cookies} className="font-medium text-primary underline underline-offset-2">
          Cookie Policy
        </Link>
        .
      </p>

      {customising && (
        <ul className="mt-4 divide-y divide-ink/10 rounded-xl border border-ink/10">
          <li className="flex items-start gap-4 p-4">
            <div className="flex-1">
              <p id={`${id}-necessary`} className="font-medium">
                Strictly necessary
              </p>
              <p className="mt-0.5 text-sm text-ink/60">
                Remembers your cookie choice and keeps you signed in to the app. Always on.
              </p>
            </div>
            <Toggle checked disabled labelledBy={`${id}-necessary`} />
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.key} className="flex items-start gap-4 p-4">
              <div className="flex-1">
                <p id={`${id}-${c.key}`} className="font-medium">
                  {c.title}
                </p>
                <p className="mt-0.5 text-sm text-ink/60">{c.description}</p>
              </div>
              <Toggle
                checked={choice[c.key]}
                onChange={(value) => setChoice((prev) => ({ ...prev, [c.key]: value }))}
                labelledBy={`${id}-${c.key}`}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {customising ? (
          <button
            type="button"
            onClick={() => decide(choice)}
            className="min-h-11 flex-1 rounded-xl bg-primary px-4 font-medium text-white hover:bg-primary-dark"
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            onClick={() => decide({ analytics: true, marketing: true })}
            className="min-h-11 flex-1 rounded-xl bg-primary px-4 font-medium text-white hover:bg-primary-dark"
          >
            Accept all
          </button>
        )}
        <button
          type="button"
          onClick={() => decide({ analytics: false, marketing: false })}
          className="min-h-11 flex-1 rounded-xl border border-ink/15 px-4 font-medium hover:border-ink/40"
        >
          Reject optional
        </button>
        {!customising && (
          <button
            type="button"
            onClick={() => setCustomising(true)}
            className="col-span-2 min-h-11 px-4 font-medium text-primary hover:underline sm:flex-none"
          >
            Customise
          </button>
        )}
      </div>
    </div>
  );
}
