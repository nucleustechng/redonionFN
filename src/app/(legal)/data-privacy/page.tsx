// Draft for legal review. Not legal advice; have counsel review before launch.
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import { COMPANY, COMPANY_DISPLAY_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Data Protection",
  description:
    "Your data protection rights at Redonion, how to use them, how long we keep data and how we protect it.",
};

const privacyMail = <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        This notice explains your rights over your personal data under the{" "}
        {COMPANY.dataProtectionLaw}, how to use them, how long we keep data and how we look after
        it. It supplements our <Link href="/privacy">Privacy Policy</Link>, which explains what we
        collect and why. {COMPANY_DISPLAY_NAME} is the data controller.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <h3>Access</h3>
        <p>
          You can ask for a copy of the personal data we hold about you and information about how
          we use it.
        </p>
        <h3>Rectification</h3>
        <p>
          You can ask us to correct inaccurate or incomplete data. You can update your name and
          phone number yourself in the app; contact us to change your email address or anything
          else.
        </p>
        <h3>Erasure</h3>
        <p>
          You can ask us to delete your data. We will delete what we can, but we must keep some
          records, such as identity-verification and transaction records, for as long as
          anti-money-laundering law requires. Data recorded on a public blockchain cannot be
          deleted by anyone.
        </p>
        <h3>Restriction</h3>
        <p>
          You can ask us to limit how we use your data, for example while we check whether it is
          accurate.
        </p>
        <h3>Objection</h3>
        <p>
          You can object to us using your data based on our legitimate interests. We will stop
          unless we have compelling grounds to continue or need the data for legal claims. You can
          always object to direct marketing.
        </p>
        <h3>Portability</h3>
        <p>
          You can ask for the data you gave us in a structured, commonly used, machine-readable
          format, or ask us to send it to another organisation where that is technically
          possible.
        </p>
        <h3>Withdraw consent</h3>
        <p>
          Where we rely on your consent, such as for optional cookies, you can withdraw it at any
          time, for example using &ldquo;Cookie settings&rdquo; in the site footer. This
          doesn&apos;t affect anything we did before you withdrew it.
        </p>
        <h3>Automated decisions</h3>
        <p>
          You have the right not to be subject to a decision based solely on automated processing
          that has legal or similarly significant effects on you. If we use automated checks, for
          example in fraud screening, you can ask for a person to review the outcome.
        </p>
        <p>
          If you live outside Nigeria, for example in the EU or UK, you may have additional rights
          under your local law.
        </p>
      </>
    ),
  },
  {
    id: "making-a-request",
    title: "How to make a request",
    body: (
      <>
        <ol>
          <li>
            Email {privacyMail} from the address linked to your Redonion account, and tell us
            which right you want to use.
          </li>
          <li>
            We may ask for more information to confirm your identity, so that we don&apos;t give
            your data to someone else.
          </li>
          <li>
            We aim to respond within 30 days. If your request is complex we may need longer; if
            so, we will tell you why.
          </li>
        </ol>
        <p>
          Making a request is free. We may charge a reasonable fee, or refuse, if a request is
          manifestly unfounded or excessive, and we will explain why.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>How long</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account and profile data</td>
                <td>
                  While your account is open, then deleted or anonymised unless we need to keep it
                  for the reasons below
                </td>
              </tr>
              <tr>
                <td>Identity-verification records</td>
                <td>At least 5 years after our relationship ends, as anti-money-laundering law requires</td>
              </tr>
              <tr>
                <td>Transaction, trade and payout records</td>
                <td>At least 5 years after the transaction or the end of our relationship, as the law requires</td>
              </tr>
              <tr>
                <td>Support messages and dispute records</td>
                <td>As long as needed to resolve the issue and any related legal claims</td>
              </tr>
              <tr>
                <td>Cookie consent records</td>
                <td>12 months, after which we ask again</td>
              </tr>
              <tr>
                <td>Data on public blockchains</td>
                <td>Permanent; it cannot be changed or deleted</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We may keep data longer if the law requires it, or if it is needed for an ongoing
          investigation or legal claim.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    body: (
      <>
        <p>We commit to:</p>
        <ul>
          <li>use technical and organisational security measures appropriate to the risk;</li>
          <li>limit access to personal data to people who need it for their work;</li>
          <li>require our service providers to protect data and use it only on our instructions;</li>
          <li>review our security measures regularly; and</li>
          <li>collect and keep only the data we need.</li>
        </ul>
        <p>
          You can help by using a strong, unique password and keeping your account details
          private.
        </p>
      </>
    ),
  },
  {
    id: "data-breaches",
    title: "If something goes wrong",
    body: (
      <p>
        If a personal data breach happens, we will act quickly to contain it. Where the law
        requires, we will notify the {COMPANY.regulator} within 72 hours of becoming aware of it.
        If the breach is likely to put your rights and freedoms at high risk, we will tell you
        without undue delay, explain what happened and what you can do to protect yourself.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Some of our service providers process data outside Nigeria. We only transfer personal data
        abroad where the {COMPANY.dataProtectionLaw} allows it, for example where the destination
        provides adequate protection or where we have appropriate safeguards in place, such as
        contractual commitments from the provider. You can ask us for more information about
        these safeguards.
      </p>
    ),
  },
  {
    id: "dpo",
    title: "Data Protection Officer",
    body: (
      <p>
        Our Data Protection Officer oversees how we handle personal data. You can contact them at{" "}
        {privacyMail}
        {COMPANY.address && (
          <>
            {" "}
            or by post at {COMPANY_DISPLAY_NAME}, {COMPANY.address}
          </>
        )}
        .
      </p>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <p>
        If you are unhappy with how we have handled your data, please contact us first at{" "}
        {privacyMail} so we can try to put it right. You also have the right to complain to the{" "}
        {COMPANY.regulator}, or to the data protection authority where you live.
      </p>
    ),
  },
];

export default function DataPrivacyPage() {
  return (
    <LegalDocument
      title="Data Protection"
      summary={
        <p>
          Your rights over your personal data, how to use them, how long we keep data and how we
          protect it.
        </p>
      }
      sections={sections}
    />
  );
}
