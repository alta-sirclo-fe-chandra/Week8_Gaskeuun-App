/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "static.vecteezy.com",
      "en.wikipedia.org",
      "i.picsum.photos",
    ],
  },
};

module.exports = nextConfig;
