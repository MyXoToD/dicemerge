const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

const paths = {
    scss: 'assets/stylesheets/scss/',
    css: 'assets/stylesheets/',
    js: 'assets/javascripts/'
}

function scssTask() {
    return src(paths.scss + 'application.scss', {
        sourcemaps: false
    })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest(paths.css));
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './'
        }
    });

    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch('*.html', browsersyncReload);
    watch([
        paths.scss + '**/*.scss',
        paths.js + '**/*.js'
    ], series(
        scssTask,
        browsersyncReload
    ));
}

exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
);