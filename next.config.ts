/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

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
