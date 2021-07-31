const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  adjustStyleLoaders,
  addDecoratorsLegacy,
} = require('customize-cra');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

// 关闭source-map
// process.env.GENERATE_SOURCEMAP = 'false';
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

module.exports = override(
  // 关闭mapSource
  rewiredMap(),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#007fff' },
    },
  }),
  addWebpackPlugin(
    new ProgressBarPlugin({
      complete: '█',
      format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ${chalk.bold(':percent')}`,
      clear: true,
    })
  ),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: './src/style/index.scss', //全局引入scss
        },
      });
    }
  })
);
