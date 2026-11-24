import CustomImage from "@/components/CustomImageProps";
import CtaLink from "@/components/CtaLink";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StoreBadges from "@/components/StoreBadges";
import {
  ActivityIcon,
  ArrowRightIcon,
  PhoneIcon,
  ShieldIcon,
  SlidersIcon,
  UsersIcon,
} from "@/components/icons";
import { APP_LOGIN_URL, APP_SIGNUP_URL } from "@/lib/urls";

const highlights = [
  {
    icon: SlidersIcon,
    title: "Set your own rates",
    text: "Make an offer at the exchange rate you want instead of taking a fixed price.",
  },
  {
    icon: UsersIcon,
    title: "Choose who you trade with",
    text: "Compare offers from other traders and pick the match that suits you.",
  },
  {
    icon: ShieldIcon,
    title: "Escrow on every trade",
    text: "Crypto is held in escrow until both sides confirm the exchange.",
  },
  {
    icon: ActivityIcon,
    title: "Track every step",
    text: "Follow each trade and payment from offer to settlement.",
  },
];

const steps = [
  { title: "Enter the amount you have", text: "Tell us what you want to exchange." },
  { title: "Select the crypto you want", text: "Pick the asset and the network." },
  { title: "Search and choose a match", text: "Compare rates, then trade with the offer you like." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-wide text-primary-light uppercase">{children}</p>
  );
}

const h2 = "mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl";
const lead = "mt-4 max-w-xl text-base text-white/65 sm:text-lg";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        {/* Hero: the arc artwork sits under the headline at every width. */}
        <section className="relative bg-black bg-[url(/header.svg)] bg-[length:760px_auto] bg-bottom bg-no-repeat pb-[300px] sm:bg-[length:1200px_auto] sm:pb-[440px] lg:bg-[length:1440px_auto] lg:pb-[500px]">
          <div className="container-page flex flex-col items-center pt-14 text-center sm:pt-20">
            <p className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/75">
              Peer-to-peer crypto trading
            </p>
            <h1 className="mt-6 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
              Buy, trade,
              <br />
              exchange<span className="text-primary-light">!</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
              Trade crypto directly with people you choose, at rates you set, with every deal
              protected by escrow.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <CtaLink href={APP_SIGNUP_URL}>
                Get started for free <ArrowRightIcon className="size-5" />
              </CtaLink>
              <CtaLink href={APP_LOGIN_URL} variant="outline">
                Log in
              </CtaLink>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section id="features" className="scroll-mt-20 bg-black py-20 sm:py-28">
          <div className="container-page">
            <div className="max-w-2xl">
              <Eyebrow>Why Redonion</Eyebrow>
              <h2 className={h2}>P2P crypto, without the guesswork.</h2>
              <p className={lead}>Sign up for free and find your best P2P match in minutes.</p>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-[15px] text-white/60">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-8">
              <CustomImage
                src="/landingImageMobile1.svg"
                alt="Searching P2P offers by amount and currency in Redonion"
                width={390}
                height={389}
                className="mx-auto h-auto w-full max-w-[420px] sm:hidden"
              />
              <CustomImage
                src="/landingImage1.svg"
                alt="Searching P2P offers by amount and currency in Redonion"
                width={1170}
                height={460}
                className="mx-auto hidden h-auto w-full sm:block"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 bg-black py-20 sm:py-28">
          <div className="container-page grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 className={h2}>Seamless value exchange.</h2>
              <p className={lead}>Choose who you exchange your cash with in three simple steps.</p>
              <ol className="mt-10 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-lg font-medium">{step.title}</p>
                      <p className="mt-0.5 text-white/60">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative flex justify-center">
              <div
                className="absolute inset-x-10 inset-y-16 rounded-full bg-violet/40 blur-3xl"
                aria-hidden
              />
              <CustomImage
                src="/phone.png"
                alt="Searching for an offer in the Redonion app"
                width={292}
                height={591}
                className="relative h-auto w-[240px] sm:w-[280px]"
              />
            </div>
          </div>
        </section>

        {/* Set your own rates */}
        <section className="bg-black py-20 sm:py-28">
          <div className="container-page">
            <div className="max-w-2xl">
              <Eyebrow>Your price</Eyebrow>
              <h2 className={h2}>Set your own rates.</h2>
              <p className={lead}>Make an offer for what you want at your own exchange rate.</p>
            </div>
            <CustomImage
              src="/landingImageMobile3.svg"
              alt="Offers at custom exchange rates"
              width={390}
              height={670}
              className="mx-auto mt-10 h-auto w-full max-w-[420px] sm:hidden"
            />
            <CustomImage
              src="/landingImage3.svg"
              alt="Offers at custom exchange rates"
              width={1115}
              height={232}
              className="mt-12 hidden h-auto w-full sm:block"
            />
          </div>
        </section>

        {/* Transaction monitoring */}
        <section className="bg-black py-20 sm:py-28">
          <div className="container-page">
            <div className="grid items-end overflow-hidden rounded-[2rem] bg-[#EEEEEE] text-sec lg:grid-cols-2">
              <div className="order-2 p-8 sm:p-12 lg:order-1 lg:self-center">
                <p className="text-sm font-medium tracking-wide text-primary uppercase">
                  The marketplace for modern professionals
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Transaction monitoring
                </h2>
                <p className="mt-3 max-w-md text-base text-sec/70 sm:text-lg">
                  Watch every trade move from offer to escrow to payout, and confirm the moment
                  your money arrives.
                </p>
              </div>
              <CustomImage
                src="/halfiphone.png"
                alt="A trade's escrow status in the Redonion app"
                width={434}
                height={631}
                className="order-1 mx-auto h-auto w-[70%] max-w-[340px] pt-8 lg:order-2 lg:pt-12"
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="scroll-mt-20 bg-black py-20 sm:py-28">
          <div className="container-page grid items-center gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-16">
            <CustomImage
              src="/landingImage7.svg"
              alt=""
              width={318}
              height={450}
              className="mx-auto h-auto w-[45%] max-w-[300px] sm:w-full"
            />
            <div>
              <Eyebrow>Security</Eyebrow>
              <h2 className={h2}>Every trade is held in escrow.</h2>
              <p className={lead}>
                Crypto stays locked until both sides confirm the exchange, so neither party can
                walk away with the other&apos;s money. Protecting you and your transactions comes
                first at Redonion.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile apps */}
        <section id="download" className="scroll-mt-20 bg-black py-20 sm:py-28">
          <div className="container-page">
            <div className="max-w-2xl">
              <Eyebrow>Mobile</Eyebrow>
              <h2 className={h2}>Exchange on the go. Anytime, anywhere.</h2>
            </div>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <CustomImage
                src="/iPhone.svg"
                alt="The Redonion mobile app"
                width={261}
                height={431}
                className="mx-auto h-auto w-[220px] sm:hidden"
              />
              <CustomImage
                src="/exchange-demo.png"
                alt="Redonion on desktop and mobile"
                width={758}
                height={492}
                className="hidden h-auto w-full sm:block"
              />
              <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <CustomImage
                  src="/landingImage6.svg"
                  alt="QR code to download the Redonion app"
                  width={227}
                  height={227}
                  className="size-44 rounded-xl bg-white p-2 sm:size-52"
                />
                <p className="mt-6 text-white/65">Scan to download</p>
                <p className="flex items-center gap-2 text-2xl font-semibold">
                  <PhoneIcon className="size-6 text-primary-light" /> iOS &amp; Android
                </p>
                <StoreBadges className="mt-6 justify-center" />
              </div>
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="bg-black pb-20 sm:pb-28">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet via-[#4b3fe0] to-primary px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
                aria-hidden
              />
              <h2 className="relative text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                Start trading with Redonion
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-white/80 sm:text-lg">
                Create a free account in minutes and find your best P2P match.
              </p>
              <CtaLink href={APP_SIGNUP_URL} variant="light" className="relative mt-8">
                Create free account <ArrowRightIcon className="size-5" />
              </CtaLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
