const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://app.redonion.io"
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Login, sign-up and the dashboard moved to the app.redonion project.
  // Keep old links and bookmarks working.
  async redirects() {
    return [
      { source: "/auth/:path*", destination: `${APP_URL}/auth/:path*`, permanent: false },
      { source: "/dashboard", destination: `${APP_URL}/dashboard`, permanent: false },
      { source: "/dashboard/:path*", destination: `${APP_URL}/dashboard/:path*`, permanent: false },
    ];
  },
};

export default nextConfig;
