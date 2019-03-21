const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const {
    src,
    dest,
    parallel,
    series
} = require('gulp');

const purge = () => {
    return src('contents/scripts/site.min.js')
    .pipe(clean({force: true}));
}

const js = () => {
    return src('contents/scripts/*.js', {
            sourcemaps: false
        })
        .pipe(concat('site.min.js'))
        .pipe(uglify())
        .pipe(dest('contents/scripts', {
            sourcemaps: false
        }))

};

exports.js = js;
exports.default = series(purge,js);