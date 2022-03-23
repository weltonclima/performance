module.exports = {
  reactStrictMode: true,
  withBundleAnalyzer: require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  }),
}