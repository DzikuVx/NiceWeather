var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var sources = {};

sources.css = [
    './bower_components/normalize.css/normalize.css',
    './css/**/*.css'
];

sources.js = [
    './js/jsonp.js',
    './js/dataBind.js',
    './js/storage.js',
    './js/model.js',
    './js/controller.js',
    './js/bootstrap.js'
];

gulp.task('buildCss', function () {

    return gulp.src(sources.css)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('buildJs', function () {

    return gulp.src(sources.js)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('deployCss', function () {

    return gulp.src(sources.css)
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('deployJs', function () {

    return gulp.src(sources.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('deploy', ['deployCss', 'deployJs']);

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['buildJs']);
    gulp.watch('css/*.css', ['buildCss']);
});

gulp.task('default', ['buildJs', 'buildCss', 'watch']);
