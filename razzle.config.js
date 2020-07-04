const path = require('path');
const fs = require('fs');

module.exports = {
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        forkTsChecker: {
          tslint: false,
        },
      },
    },
  ],
  modify(config, { target, dev }, webpack, options) {
    config.resolve.modules.unshift(path.resolve(__dirname, 'src'));

    // config.resolve.alias['@cards/ui'] = path.resolve(__dirname, 'src', 'ui');

    // TODO: how do not find rule to config
    config.module.rules[2].exclude.push(/\.svg$/);
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (dev) {
      config.devServer = {
        ...config.devServer,
        key: fs.readFileSync(path.resolve(__dirname, 'tls', 'howtocards.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'tls', 'howtocards.crt')),
        https: true,
      };
    }

    return config;
  },
};
