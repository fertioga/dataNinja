const mix = require('laravel-mix');
const webpack = require('webpack');

mix.webpackConfig({
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
});

mix
  .setPublicPath("./")
  .sass("src/sass/style.scss", "dist/css")
  .js("src/js/*.js", "dist/js")
  .vue()
  .copy("src/images/", "dist/images")
  .copy("src/Data/", "dist/Data")
  .options({
    processCssUrls: false,
  });