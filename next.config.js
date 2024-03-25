// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // For the server, we don't need to do anything special
      if (!isServer) {
        // Define a rule for handling static assets like images
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|mp4|mov|ogg|webm)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next',
                name: '/public/data/data.json'
            }
            }
          ]
        });
      }
      return config;
    }
  };
  