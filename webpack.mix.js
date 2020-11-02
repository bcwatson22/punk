const mix = require('laravel-mix');

require('laravel-mix-imagemin');

mix.setPublicPath('dist');

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.scss/,
        loader: 'import-glob-loader'
      }
    ]
  }
});

mix
  .copy('./src/templates/', './dist', false)
  .copy('./src/assets/favicon/*.*', './dist/images/global/favicon')
  .imagemin(
    'images/**/*.{gif,jpg,png,webp,svg}',
    {
      context: './src/assets'
    }
  )
  .js('./src/assets/scripts/*.js', './dist/scripts')
  .sass('./src/assets/styles/index.scss', './dist/styles')
  .browserSync({
    proxy: false,
    port: 1234,
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    files: [
      'dist/**/*.*'
    ]
  });

mix.options({
  processCssUrls: false
});
