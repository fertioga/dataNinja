let mix = require("laravel-mix");

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