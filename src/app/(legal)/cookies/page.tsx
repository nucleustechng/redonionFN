// Draft for legal review. Not legal advice; have counsel review before launch.
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and browser storage Redonion uses, why, and how to change your choices.",
};

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies and local storage are",
    body: (
      <>
        <p>
          Cookies are small text files that a website saves in your browser. Local storage is a
          similar browser feature that lets a website save information on your device. Both let a
          site remember things between visits, such as your settings or that you are signed in.
        </p>
        <p>
          This policy covers our website at {COMPANY.website} and our web app at {COMPANY.appUrl}.
          We keep our use to a minimum.
        </p>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "What we use today",
    body: (
      <>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Set by</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>redonion_consent</code> (cookie)
                </td>
                <td>Website ({COMPANY.website.replace("https://", "")}), shared with the web app</td>
                <td>Remembers your cookie choices so we don&apos;t ask on every visit</td>
                <td>12 months</td>
                <td>Strictly necessary</td>
              </tr>
              <tr>
                <td>
                  <code>token</code> (local storage)
                </td>
                <td>Web app ({COMPANY.appUrl.replace("https://", "")})</td>
                <td>Keeps you signed in to your account</td>
                <td>Until you log out</td>
                <td>Strictly necessary</td>
              </tr>
              <tr>
                <td>
                  <code>user</code> (local storage)
                </td>
                <td>Web app ({COMPANY.appUrl.replace("https://", "")})</td>
                <td>Stores a copy of your profile so the app loads quickly</td>
                <td>Until you log out</td>
                <td>Strictly necessary</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Our fonts are hosted on our own servers, so loading the site doesn&apos;t send requests
          to third-party font services. We don&apos;t currently use any analytics or advertising
          cookies.
        </p>
      </>
    ),
  },
  {
    id: "categories",
    title: "Cookie categories",
    body: (
      <>
        <h3>Strictly necessary</h3>
        <p>
          Needed for the site and app to work, for example to keep you signed in and to remember
          your cookie choices. These are always on because the Services can&apos;t work without
          them.
        </p>
        <h3>Analytics</h3>
        <p>
          Would help us understand how people use the site so we can improve it. We don&apos;t use
          any today. If we add them, they will only run if you turn this category on.
        </p>
        <h3>Marketing</h3>
        <p>
          Would be used to measure campaigns or show relevant adverts. We don&apos;t use any today.
          If we add them, they will only run if you turn this category on.
        </p>
      </>
    ),
  },
  {
    id: "managing-choices",
    title: "Managing your choices",
    body: (
      <>
        <p>
          When you first visit our website, a banner asks which optional categories you allow. You
          can change your mind at any time using <strong>Cookie settings</strong> in the site
          footer.
        </p>
        <p>
          You can also block or delete cookies and local storage in your browser settings. If you
          block strictly necessary storage, you won&apos;t be able to stay signed in to the web
          app. Logging out of the web app removes the <code>token</code> and <code>user</code>{" "}
          entries.
        </p>
      </>
    ),
  },
  {
    id: "more-information",
    title: "More about how we use data",
    body: (
      <p>
        For more about how we handle personal data, see our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/data-privacy">Data Protection</Link> notice.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change the cookies we use, we will update this page and, where your consent is
        needed, ask you again through the cookie banner. The date at the top of this page shows
        when it was last updated.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about cookies? Email{" "}
        <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      summary={
        <p>
          The cookies and browser storage we use, why we use them, and how to change your choices.
          In short: only what&apos;s needed to run the site, unless you choose otherwise.
        </p>
      }
      sections={sections}
    />
  );
}
