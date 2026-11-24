// Draft for legal review. Not legal advice; have counsel review before launch.
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import { COMPANY, COMPANY_DISPLAY_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use Redonion to hold, send and trade crypto with other people.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) are an agreement between you and{" "}
          {COMPANY_DISPLAY_NAME} (&ldquo;{COMPANY.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
          They apply when you use our website at {COMPANY.website}, our web app at{" "}
          {COMPANY.appUrl}, our mobile apps and any related services (together, the
          &ldquo;Services&rdquo;).
          {COMPANY.registrationNumber && (
            <> Our registration number is {COMPANY.registrationNumber}.</>
          )}
          {COMPANY.address && <> Our registered office is at {COMPANY.address}.</>}
        </p>
        <p>
          By creating an account or using the Services, you agree to these Terms. If you
          don&apos;t agree, please don&apos;t use the Services.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link>,{" "}
          <Link href="/data-privacy">Data Protection</Link> notice and{" "}
          <Link href="/cookies">Cookie Policy</Link> explain how we handle your personal data.
          They form part of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who can use Redonion",
    body: (
      <>
        <p>To use the Services you must:</p>
        <ul>
          <li>be at least 18 years old and able to enter into a binding contract;</li>
          <li>use the Services for yourself, not on behalf of someone else, unless we agree otherwise in writing;</li>
          <li>
            not be on any sanctions list, or live in or be ordinarily resident in a country or
            region where using the Services would break the law; and
          </li>
          <li>not have had a Redonion account closed by us for breaking these Terms.</li>
        </ul>
        <p>
          Some features may not be available in every country. We can refuse to open an account
          or limit access where we need to in order to meet our legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your account and security",
    body: (
      <>
        <p>
          To open an account you give us your name, email address, phone number and country, and
          choose a password. We then verify your email address with a one-time code. You agree
          that the information you give us is accurate and that you&apos;ll keep it up to date.
        </p>
        <p>You are responsible for keeping your account secure. In particular:</p>
        <ul>
          <li>keep your password private and don&apos;t reuse it on other services;</li>
          <li>don&apos;t share your account or let anyone else use it;</li>
          <li>
            tell us straight away at{" "}
            <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a> if you think
            someone else has accessed your account.
          </li>
        </ul>
        <p>
          You are responsible for activity on your account unless it happened because of our own
          failure. You can change your name, phone number and password in the app. To change the
          email address on your account, contact support.
        </p>
      </>
    ),
  },
  {
    id: "verification",
    title: "Identity verification and anti-money-laundering checks",
    body: (
      <>
        <p>
          We are required to help prevent money laundering, terrorist financing and fraud. When
          we ask you to verify your identity, you agree to give us accurate information and
          documents, such as a National Identification Number (NIN) or NIN slip, voter&apos;s
          card, international passport or driver&apos;s licence, and any other information we
          reasonably request.
        </p>
        <p>
          We may need you to complete verification before you can use certain features, trade
          above certain amounts or withdraw funds. We may check the information you give us
          ourselves or through identity-verification providers. If you don&apos;t complete
          verification, or we can&apos;t verify you, we may limit, suspend or close your account.
        </p>
        <p>
          We may monitor transactions and report suspicious activity to the relevant authorities
          where the law requires it. Where the law prevents us, we won&apos;t be able to tell you
          that we have done so.
        </p>
      </>
    ),
  },
  {
    id: "marketplace",
    title: "The peer-to-peer marketplace and escrow",
    body: (
      <>
        <p>
          When available, the Redonion marketplace lets you post offers to buy or sell
          cryptocurrency for fiat currency at a rate you choose, and lets you accept offers made
          by other users. Some trading features are still being rolled out and may be marked
          &ldquo;coming soon&rdquo; in the app.
        </p>
        <h3>Our role</h3>
        <p>
          We provide the platform that matches buyers and sellers and holds the crypto side of a
          trade in escrow. We are not the buyer or seller in your trades and we don&apos;t set the
          rates. Each trade is a contract between you and the other user.
        </p>
        <h3>How a trade works</h3>
        <ol>
          <li>The seller&apos;s crypto is held in escrow when a trade starts.</li>
          <li>The buyer pays the agreed fiat amount to the seller&apos;s payout bank account.</li>
          <li>The seller confirms in the app that the payment has arrived in full.</li>
          <li>We then release the crypto from escrow to the buyer.</li>
        </ol>
        <p>
          Only confirm receipt once the money is actually in your bank account. Confirmation is
          final: once crypto is released we cannot take it back. Never release a trade on the
          strength of a screenshot, a promise or a message outside the app.
        </p>
        <h3>Your payout bank account</h3>
        <p>
          To receive fiat from trades you need to add a bank account in your own name, with the
          correct account number, account name, bank and country. We are not responsible for
          payments that fail or go to the wrong account because the details you gave were wrong.
        </p>
        <h3>Disputes</h3>
        <p>
          If something goes wrong with a trade, contact support through the Help Center with the
          transaction ID. We may ask both parties for evidence, such as bank statements, and may
          keep the crypto in escrow while we look into it. We will decide how to release escrowed
          funds based on the evidence available, and our decision on escrowed funds is final as
          far as the law allows. Each user remains responsible for their own trades.
        </p>
      </>
    ),
  },
  {
    id: "wallets",
    title: "Wallets and blockchain transactions",
    body: (
      <>
        <p>
          Your Redonion account includes a wallet we operate for you with the help of third-party
          wallet infrastructure providers. You can use it to receive, hold and send supported
          crypto assets.
        </p>
        <ul>
          <li>
            <strong>Supported assets.</strong> We currently support BNB on BNB Smart Chain (BEP20).
            We may add or remove assets and networks. Sending an unsupported asset, or a supported
            asset on the wrong network, may lead to permanent loss.
          </li>
          <li>
            <strong>Check addresses.</strong> You are responsible for entering the correct
            recipient address and network. Blockchain transactions cannot be reversed, cancelled
            or refunded by us once they are submitted.
          </li>
          <li>
            <strong>Network fees.</strong> Blockchain networks charge fees to process transactions.
            We show the fee before you confirm. Sometimes we may cover (&ldquo;sponsor&rdquo;) the
            fee, but we don&apos;t have to.
          </li>
          <li>
            <strong>Public records.</strong> Transactions are recorded on a public blockchain.
            Wallet addresses, amounts and transaction hashes can be seen by anyone.
          </li>
          <li>
            <strong>Network issues.</strong> Blockchains are run by third parties. Delays,
            congestion, forks or outages are outside our control.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees",
    body: (
      <p>
        We may charge fees for some Services, such as trading or withdrawals. We will always show
        you the applicable fees before you confirm a transaction. By confirming, you agree to pay
        them. We may change our fees in the future; changes won&apos;t apply to transactions you
        have already confirmed.
      </p>
    ),
  },
  {
    id: "risks",
    title: "Risks you should understand",
    body: (
      <>
        <ul>
          <li>
            <strong>Volatility.</strong> Crypto prices can rise or fall sharply in a short time.
            You could lose some or all of the value of your assets.
          </li>
          <li>
            <strong>No advice.</strong> We don&apos;t give investment, financial, legal or tax
            advice. Information on the Services, including rates shown, is not a recommendation.
          </li>
          <li>
            <strong>Regulation.</strong> Laws on crypto assets are changing. New rules could affect
            your ability to use the Services or the value of your assets.
          </li>
          <li>
            <strong>Counterparties.</strong> Other users may make mistakes or act dishonestly.
            Follow the trade process in the app to protect yourself.
          </li>
          <li>
            <strong>Taxes.</strong> You are responsible for any taxes due on your transactions.
          </li>
        </ul>
        <p>Only trade with money you can afford to lose.</p>
      </>
    ),
  },
  {
    id: "prohibited",
    title: "Things you must not do",
    body: (
      <>
        <p>You must not use the Services to:</p>
        <ul>
          <li>commit fraud, scams or impersonation, or deceive other users;</li>
          <li>launder money, finance terrorism or evade sanctions;</li>
          <li>deal in the proceeds of crime or fund illegal goods or services;</li>
          <li>open or use an account for someone else, or use someone else&apos;s account or bank details;</li>
          <li>create multiple or fake accounts, or abuse the referral programme;</li>
          <li>
            scrape, copy or collect data from the Services, or access them by automated means
            without our permission;
          </li>
          <li>
            interfere with, probe or attempt to bypass the security of the Services, or upload
            malicious code; or
          </li>
          <li>break any law, or help anyone else do any of these things.</li>
        </ul>
      </>
    ),
  },
  {
    id: "referrals",
    title: "Referral programme",
    body: (
      <p>
        You can share your referral code to invite people to Redonion. Any rewards, and the rules
        for earning them, will be shown in the app. Rewards are only available for genuine new
        users. We may withhold or reverse rewards, or remove you from the programme, if we
        reasonably believe the programme is being abused. We can change or end the programme at
        any time, but rewards you have already validly earned will be honoured.
      </p>
    ),
  },
  {
    id: "features",
    title: "Features in development",
    body: (
      <p>
        Some features are new or still being developed, and may be labelled &ldquo;coming
        soon&rdquo; or &ldquo;beta&rdquo;. We may change, pause or withdraw them. Where a feature
        becomes available, these Terms apply to it.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension, closure and deleting your account",
    body: (
      <>
        <p>
          We may suspend, limit or close your account, or refuse or reverse a transaction where
          possible, if:
        </p>
        <ul>
          <li>you break these Terms or we reasonably suspect fraud or other illegal activity;</li>
          <li>we are required to by law, a regulator or a court order;</li>
          <li>you don&apos;t complete identity verification when asked; or</li>
          <li>we need to protect you, other users or Redonion from harm.</li>
        </ul>
        <p>
          Where the law allows, we will tell you and explain why. You can ask us to close your
          account at any time by contacting{" "}
          <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>. Before we close
          it, open trades must be completed or cancelled and any remaining balance withdrawn to
          you, subject to any legal restrictions. We will keep some records after closure where
          the law requires it, as explained in our <Link href="/data-privacy">Data Protection</Link>{" "}
          notice.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The Services, including our name, logo, software, designs and content, belong to us or our
        licensors. We give you a personal, non-transferable licence to use the Services for their
        intended purpose while these Terms apply. You must not copy, modify, distribute or reverse
        engineer the Services except where the law allows it.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: (
      <p>
        The Services rely on third parties, such as blockchain networks, wallet infrastructure
        providers, banks and app stores. We are not responsible for their services, and your use
        of them may be subject to their own terms.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers, liability and indemnity",
    body: (
      <>
        <p>
          We work hard to keep the Services available and secure, but we provide them &ldquo;as
          is&rdquo; and &ldquo;as available&rdquo;. As far as the law allows, we don&apos;t promise
          that the Services will be uninterrupted, error-free or always available.
        </p>
        <p>As far as the law allows, we are not liable for:</p>
        <ul>
          <li>losses caused by other users, including in trades;</li>
          <li>changes in the value of crypto assets;</li>
          <li>transactions sent to a wrong address or network that you entered;</li>
          <li>events outside our reasonable control, such as network outages or changes in law; or</li>
          <li>indirect or consequential losses, or loss of profit, revenue or opportunity.</li>
        </ul>
        <p>
          Our total liability to you for any claim relating to the Services is limited to the fees
          you paid us in the 12 months before the claim arose. Nothing in these Terms limits
          liability that cannot be limited by law, such as liability for fraud.
        </p>
        <p>
          You agree to compensate us for reasonable losses, costs and claims we suffer because
          you broke these Terms or the law, or misused the Services.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <>
        <p>These Terms are governed by the laws of {COMPANY.governingLaw}.</p>
        <p>
          If you have a complaint, please contact us first at{" "}
          <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a> so we can try to
          resolve it. If we can&apos;t resolve it together within 30 days, either of us may take
          the dispute to the courts of Nigeria. If you live outside Nigeria, you may also have
          rights under the laws of your own country that these Terms cannot take away.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. If we make a significant change, we will tell
        you by email or in the app before it takes effect. The date at the top of this page shows
        when the Terms were last updated. If you keep using the Services after a change takes
        effect, you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          Questions about these Terms? Email{" "}
          <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a> or call{" "}
          <a href="tel:+2347063581411">+234 706 358 1411</a> (Monday to Friday, 08:00 to 17:00
          WAT).
        </p>
        {COMPANY.address && (
          <p>
            By post: {COMPANY_DISPLAY_NAME}, {COMPANY.address}.
          </p>
        )}
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      summary={
        <p>
          The rules for using Redonion to hold, send and trade crypto with other people. Please
          read them carefully, especially the sections on escrow, blockchain transactions and
          risks.
        </p>
      }
      sections={sections}
    />
  );
}
