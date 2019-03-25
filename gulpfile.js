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
    watch,
} = require('gulp');

const purge = () => {
    return src('contents/scripts/site.min.js', {
            allowEmpty: true
        }, 'contents/styles/site.min.css', {
            allowEmpty: true
        }, 'contents/scripts/search.min.css', {
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

const js = () => {
    return src(['contents/scripts/simple-jekyll-search.js', 'contents/scripts/search.js'])
        .pipe(concat('search.min.js'))
        //.pipe(uglify())
        .pipe(dest('contents/scripts', {
            sourcemaps: false
        }))
};


exports.default =  (done) => {
    series(purge)();
    parallel(ts, js, scss)();
    done();
}

exports.watch = (done) => {
    exports.default(done);
    return watch(['contents/scripts/*.ts','contents/scripts/*.js', 'contents/styles/*.scss', '!contents/scripts/*.min.js'], exports.default);
}
