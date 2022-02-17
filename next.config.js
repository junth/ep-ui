module.exports = {
  reactStrictMode: true,
  webpack5: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      'storage.googleapis.com',
      'storage.opensea.io',
      'lh3.googleusercontent.com',
      'images.pexels.com',
    ], // for demo data
  },
}
