/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/general",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
