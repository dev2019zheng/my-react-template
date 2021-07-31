# react学习文档-项目初始化

## 初始化

### a. 新建项目

~~~bash
npx create-react-app demo01
cd demo01
npm install
~~~

### b. 运行项目

~~~bash
yarn start
~~~

### c. ant-design

~~~bash
yarn add antd
~~~

### d. react-app-rewired

> `react-app-rewired` 2.x 之后`addLessLoader`配置项更改了：
>
> [`addLessLoader` issue](https://github.com/arackaf/customize-cra/issues/253)
>
> [`react-app-rewired` 文档](https://github.com/arackaf/customize-cra)

~~~bash
yarn add less less-loader --dev
yarn add react-app-rewired customize-cra babel-plugin-import --dev
~~~

根目录添加`config-overrides.js` :

~~~js
const {
  override,
  addLessLoader,
  fixBabelImports
} = require('customize-cra');

module.exports = override(
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
  })
);
~~~

修改`package.json` :

~~~json
{
  "scripts": {
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-script eject"
    }
}
~~~

### e.  编译进度条&source-map

~~~bash
yarn add progress-bar-webpack-plugin chalk --dev
~~~

修改`config-overrides.js` :

~~~js
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
~~~
