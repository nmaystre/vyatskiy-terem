var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    rimraf = require('rimraf'),
    fileinclude = require('gulp-file-include'),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload,
    wiredep = require('wiredep').stream;

// Config
var path = {
    build: {
        html: 'www/',
        js: 'www/js/',
        css: 'www/css/',
        img: 'www/images/',
        fonts: 'www/fonts/'
    },
    src: {
        main: './app',
        html: 'app/*.html',
        htmltemplate: 'app/template/**/*.html',
        js: 'app/js/**/*.js',
        css: 'app/css/',
        cssfile: 'app/css/**/*.css',
        style: 'app/scss/**/*.scss',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/scss/**/*.scss',
        bowerfile: 'bower.json',
        htmltemplate: 'app/template/**/*.html',
    },
    clean: './www'
};

var config = {
    server: {
        baseDir: "./app"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "kdm"
};

// Development Tasks

// Запуск webserver (browserSync)
gulp.task('webserver', function () {
    browserSync(config);
});

// Очистка
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// sass
gulp.task('sass', function() {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed',
            indentWidth: 4
        }))
        //.on('error', console.log)
        .pipe(gulp.dest(path.src.css))
        .pipe(reload({stream: true}));
});

//fileinclude
gulp.task('fileinclude', function() {
    gulp.src([path.src.htmltemplate])
        .pipe(fileinclude())
        .pipe(gulp.dest('./app/'))
        .pipe(reload({stream: true}));
});

// html
gulp.task('html:build', ['fileinclude'], function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(wiredep({
            directory : "app/bower_components"
        }))
        .pipe(gulp.dest(path.src.main))
        .pipe(reload({stream: true}));
});

// js & style
gulp.task('useref', function() {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(useref())
        .pipe(gulpIf(path.src.cssfile, prefixer()))
        .pipe(gulpIf('*.css', cssmin()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest(path.build.html));
});

// images
gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
});

// fonts
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Watchers
gulp.task('watch', function() {
    gulp.watch(path.watch.bowerfile, ['html:build']);
    gulp.watch(path.watch.style, ['sass']);
    gulp.watch(path.watch.html, reload);
    gulp.watch(path.watch.htmltemplate, ['fileinclude']);
    gulp.watch(path.watch.js, reload);
})

gulp.task('default', ['watch', 'webserver']);

//Build
gulp.task('build', [
    'useref',
    'image:build',
    'fonts:build'
]);
