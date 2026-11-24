// Details shared by the legal pages. Fill in the empty values before launch;
// anything left empty is simply not shown.

export const COMPANY = {
  /** Trading name used throughout the documents. */
  name: "Redonion",
  /** Registered legal entity, e.g. "Redonion Technologies Ltd". */
  legalName: "Onion Market Services Ltd",
  /** CAC (or other) registration number. */
  registrationNumber: "RC 7084077",
  /** Registered office address. */
  address: "155 Broad Street, Marina, Lagos State, Nigeria",
  website: "https://redonion.io",
  appUrl: "https://app.redonion.io",
  supportEmail: "support@redonion.io",
  /** Where privacy / data-protection requests go. */
  privacyEmail: "support@redonion.io",
  governingLaw: "the Federal Republic of Nigeria",
  dataProtectionLaw: "Nigeria Data Protection Act 2023 (NDPA)",
  regulator: "Nigeria Data Protection Commission (NDPC)",
} as const;

/** Shown at the top of every legal page. */
export const LEGAL_LAST_UPDATED = "22 November 2026";

/** Name used when the documents refer to the company formally. */
export const COMPANY_DISPLAY_NAME = COMPANY.legalName || COMPANY.name;
