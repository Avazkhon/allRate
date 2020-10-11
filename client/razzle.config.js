const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  modify(config, { target, dev }, webpack) {
    const isServer = target !== 'web';

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          autoprefixer({
            browsersList: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          }),
        ],
      },
    };

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        includePaths: [path.resolve(__dirname, '../node_modules')],
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: isServer
        ? ['css-loader', sassLoader]
        : dev
          ? [
            'style-loader',
            {
              loader: 'css-loader',
              options: { modules: false, sourceMap: true },
            },
            postCssLoader,
            sassLoader,
          ]
          : [
            {
              loader: MiniCssExtractPlugin.loader,
            },
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
            postCssLoader,
            sassLoader,
          ]
    });

    if (!isServer && !dev) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: `components/[name].css`
        }),
      );
    }

    config.resolve.modules.push('src');

    config.devtool = dev ? 'eval-source-map' : 'none';

    return config;
  },
};
