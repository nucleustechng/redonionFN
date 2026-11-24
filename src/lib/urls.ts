// The signed-in app lives in the separate app.redonion project.
export const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://app.redonion.io"
).replace(/\/$/, "");

export const APP_LOGIN_URL = `${APP_URL}/auth/login`;
export const APP_SIGNUP_URL = `${APP_URL}/auth/sign-up`;
