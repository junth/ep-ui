module.exports = {
  reactStrictMode: true,
  webpack5: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['picsum.photos'], // for demo data
  },
}
