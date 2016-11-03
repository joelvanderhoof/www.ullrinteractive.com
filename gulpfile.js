'use strict';

var del = require('del');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var csscomb = require('gulp-csscomb');
var maps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('concatScripts', function() {
    return gulp.src([
        'js/main.js',
    ])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
    return gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

gulp.task('cleanCSS', ['compileSass'], function() {
    return gulp.src('style.css')
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('styles'))
});

gulp.task('compileSass', function() {
    return gulp.src('sass/style.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

gulp.task('watchFiles', function() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('sass/**/*.scss', ['compileSass']);
    gulp.watch('js/**/*.js', ['minifyScripts']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('templates/*.html').on('change', browserSync.reload);
});

gulp.task('serve', ['watchFiles']);

gulp.task('clean', function() {
    del(['dist', 'style.css*', 'js/app*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function() {
    return gulp.src(['style.css', 'js/app.min.js', 'images/**', 'fonts/**'], { base: './' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);
