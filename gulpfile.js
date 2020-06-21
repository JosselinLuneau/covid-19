const gulp = require('gulp');
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default;
const cleancss = require('gulp-clean-css')
const concat = require('gulp-concat')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel');
const vueComponent = require('gulp-vue-single-file-component');
const nodemon = require('gulp-nodemon');

const paths = {
    server: './server.js',
    src: './src',
    dist: './dist',
    js: {
        src: ['./src/js/**/*.js'],
        dest: './dist/js',
    },
    vue: {
        src: './src/js/components/*.vue',
        dest: './dist/js/components',
    },
    css: {
        // src: ['./src/scss/**/*.scss'],
        src: ['./src/scss/styles.scss'],
        dest: './dist/css'
    },
    images: {
        src: ['./src/images/**/*'],
        dest: './dist/images'
    },
    html: {
        src: ['./*.html'],
    }
}

const styles = () =>
    gulp.src(paths.css.src)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss())
        .pipe(concat('styles.css'))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css.dest))

const scripts = () =>
    gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))


const clean = () => del(['dist'])

const server = () => {
    nodemon({
        script: paths.server,
        watch: [paths.js.dest],
        ignore: [
            'var/',
            'node_modules/'
        ],
        ext: 'js css',
        env: {'NODE_ENV': 'development'},
    }).on('restart', () => {
        console.log('>> node restart');
    })
}

const watchFiles = () => {
    gulp.watch(paths.js.src, scripts)
    gulp.watch(paths.css.src, styles)
}


const build = gulp.series(clean, styles, scripts)
const serve = gulp.series(build, server)
const watch = gulp.parallel(watchFiles, serve)

exports.watch = watch
exports.serve = serve
