/** @type {import('next').NextConfig} */

// next.config.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const rewrites = async () => {
  return [
    {
      source: '/strava-api/:path*',
      destination: 'https://www.strava.com/athletes/542199/:path*',
    },
  ];
}
const middleware = async () => {
  return [
    createProxyMiddleware('/strava-api', {
      target: 'https://www.strava.com',
      changeOrigin: true,
      pathRewrite: { '^/strava-api': '/athletes/542199/prs' },
    }),
  ];
}

module.exports = {
  middleware: [
      middleware()
  ],
  rewrites
};

