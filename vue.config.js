const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude
      .add(path.resolve('.'))
      .end();
    config.module
      .rule('svg-icon')
      .test(/\.svg$/)
      .include
      .add(path.join(__dirname, '.'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]',
      });
    // 生成环境css文件提取到单个文件
    if (isProd) {
      config
        .plugin('extract-css')
        .tap(args => [
          { filename: 'static/desktop/css/[name].[contenthash:8].css' },
        ]);
      config.optimization.merge({
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: (m, c, entry = 'app') =>
                m.constructor.name === 'CssModule' &&
                recursiveIssuer(m) === entry,
              chunks: 'all',
              priority: -11,
              minChunks: 1,
              enforce: true,
            },
          },
        },
      });
      config.plugin('copy').tap(args => {
        args[0][0].ignore = args[0][0].ignore.concat([
          'static/index/*/**',
          'index.html',
        ]);
        return args;
      });
    }
    config.plugin('html').tap(args => {
      args[0].filename = 'index.html';
      return args;
    });
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.plugins.delete('fork-ts-checker');
  },
  productionSourceMap: false,
  outputDir: 'dist',
  baseUrl: '/',
  assetsDir: isProd ? 'static/desktop' : '',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    public: '',
    logLevel: 'debug',
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/static/index': {
        target: 'http://192.168.90.98:8500', // 测试环境-user
      },
      '/': {
        ws: false,
        target: 'http://10.142.90.86:8888', // 开发环境-user
        changeOrigin: true,
      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        data: `@import "leaf-frame/assets/_variables.scss"; @import "@/assets/variables.scss";`
      },
    },
  },
};
