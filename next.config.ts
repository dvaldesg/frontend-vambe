/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
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
