/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_TEST_API_URL}/api/:path*`
      },
    ];
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
