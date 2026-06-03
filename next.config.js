/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'myekie-products.s3.eu-west-1.amazonaws.com' },
      { protocol: 'https', hostname: 'api.myekie.com' },
    ],
  },
};

module.exports = nextConfig;
