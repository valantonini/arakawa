const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const tsc = require('gulp-typescript');
const clean = require('gulp-clean');
const purgecss = require('gulp-purgecss');
const wintersmith = require('run-wintersmith');

const {
    src,
    dest,
    series,
    parallel,
    watch,
} = require('gulp');

const sass =  require('gulp-sass')(require('sass'));


// dev
const cleanCss = () => {
    return src('contents/styles/site.min.css', {
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
            sourceMap: false,
            outputStyle: 'compressed',
            "includePaths": [
                "node_modules/",
                "content/styles"
            ]
        }).on('error', sass.logError))
        .pipe(dest('contents/styles'))
}

const cleanJs = () => {
    return src('contents/scripts/site.min.js', {
            allowEmpty: true
        })
        .pipe(clean({
            force: true
        }));
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
        .pipe(uglify())
        .pipe(dest('contents/scripts', {
            sourcemaps: false
        }))
};

// build
const cleanBuild = () => {
    return src('build', {
            allowEmpty: true
        })
        .pipe(clean({
            force: true
        }));
}

const buildwintersmith = (done) => wintersmith.build(() => done());

const purgeUnusedCss = () => {
    return src('build/**/*.css')
        .pipe(concat('site.min.css'))
        .pipe(
            purgecss({
                content: ['build/**/*.html', 'build/**/*.js']
            })
        )
        .pipe(dest('build/styles'));
}

const scripts = series(cleanJs, parallel(ts, js));
const styles = series(cleanCss, scss);
const build = parallel(scripts, styles);
const publish = series(cleanBuild, build, buildwintersmith, purgeUnusedCss);


Object.assign(exports, {
    scripts,
    styles,
    build,
    publish,
    default: build,
    watch: (done) => {
        build(done);
        return watch(['contents/scripts/*.ts', 'contents/scripts/*.js', 'contents/styles/*.scss', '!contents/scripts/*.min.js'], build);
    }
});
