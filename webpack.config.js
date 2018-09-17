const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function (env = {}) {
  let babelConf;

  const babelRC = './.babelrc';
  if(fs.existsSync(babelRC)) {
    babelConf = JSON.parse(fs.readFileSync(babelRC));
    babelConf.babelrc = false;
  }

  const externals = {
    'spritejs': 'spritejs',
  }
  const output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/js/',
  };

  return {
    mode: env.production ? 'production' : 'development',
    // entry: './src/web/entry-runtime-with-compiler.js',
    entry: {
      'app': './example/js/app.js'
    },
    output,
    resolve: {
      //aliasFields: ['browser'],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            resolve('src'),
            resolve('example/js'),
          ],
          use: {
            loader: 'babel-loader',
            options: babelConf,
          },
        },
      ],

      /* Advanced module configuration (click to show) */
    },

    externals,
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, 'example'),
      compress: true,
      port: 9090,
      // ...
    },

    plugins: [
      // ...
    ],
    // list of additional plugins


    /* Advanced configuration (click to show) */
  }
}