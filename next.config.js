/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
