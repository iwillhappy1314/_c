let mix = require('laravel-mix');

require('laravel-mix-tailwind');
require('laravel-mix-versionhash');
require('laravel-mix-copy-watched');
require('mix-white-sass-icons');

mix.setPublicPath('./');

mix.sass('assets/styles/main.scss', 'dist/styles').
    tailwind().
    options({
        postCss: [
            require('css-mqpacker'),
        ],
    });

mix.js('assets/scripts/main.js', 'dist/scripts');

mix.copyWatched('assets/images', 'dist/images').
    copyWatched('assets/fonts', 'dist/fonts');

if (mix.inProduction()) {
    mix.versionHash();
    mix.icons('assets/icons', 'assets/fonts', 'assets/styles/icons.scss');
} else {
    mix.sourceMaps();
    mix.webpackConfig({devtool: 'source-map'});
}

mix.browserSync({
    proxy         : 'c.as',
    files         : [
        {
            match  : [
                './dist/**/*',
                '../**/*.php',
            ],
            options: {
                ignored: '*.txt',
            },
        },
    ],
    snippetOptions: {
        whitelist: ['/wp-admin/admin-ajax.php'],
        blacklist: ['/wp-admin/**'],
    },
});
