/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  // setup envs for emailjs and gtag
  // env: {
  //   EMAILJS_CONTACT_SERVICE_ID: '',
  //   EMAILJS_CONTACT: '',
  //   EMAILJS_USERID: '',
  //   GA_TRACKING_ID: ""
  // },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|jpeg)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
}
