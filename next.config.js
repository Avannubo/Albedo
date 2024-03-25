// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty' // This is required to prevent errors from Next.js during the build
        };
      }
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|mp4|mov|ogg|webm)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'public/data/data.json'
            }
          }
        ]
      });
      return config;
    }
  };
  