const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.pexels.com', 'm.media-amazon.com'],
  },
};

module.exports = withPlugins([withImages], {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    // Add file-loader for PDFs
    config.module.rules.push({
      test: /\.(pdf)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
});
