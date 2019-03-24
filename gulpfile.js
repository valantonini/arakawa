const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const tsc = require('gulp-typescript');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

const purge = () => {
    return src('contents/scripts/site.min.js', {
            allowEmpty: true
        }, 'contents/styles/site.min.css', {
            allowEmpty: true
        })
        .pipe(clean({
            force: true
        }));
}

const scss = () => {
    return src('contents/styles/site.scss')
        .pipe(concat('site.min.css'))
        .pipe(sass({
            //sourceMap: true,
            outputStyle: 'compressed',
            //outputStyle: 'nested',
            "includePaths": [
                "node_modules/",
                "content/styles"
            ]
        }).on('error', sass.logError))
        .pipe(dest('contents/styles'))
}

const ts = () => {
    return src('contents/scripts/*.ts', {
            sourcemaps: false
        })
        .pipe(tsc())
        .pipe(concat('site.min.js'))
        .pipe(uglify())
        .pipe(dest('contents/scripts', {
            sourcemaps: false
        }))

};

exports.ts = ts;
exports.default =  () => {
    series(purge)();
    parallel(ts, scss)();
}

watch(['contents/scripts/*.ts', 'contents/styles/*.scss'], (cb) => {
    exports.default();
    cb();
});