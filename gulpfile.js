const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const copy = require('gulp-copy');
const ejs = require("gulp-ejs")

gulp.task('sass', function(){
    var sass_src = [
        './resources/assets/sass/**/*.scss',
    ];
    return gulp.src(sass_src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(gulp.dest('./public/_front/assets/css'))
        .pipe(gulp.dest('./html/css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(rename(function(p){ p.extname = '.min.css' }))
        // .pipe(gulp.dest('./public/_front/assets/css'))
        .pipe(gulp.dest('./html/css'))
        .pipe(browserSync.stream());
});


//CSS
gulp.task('plugin-css', function(){
    var sass_src =
        [
            'bower_components/font-awesome/css/font-awesome.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css',
            'bower_components/bootstrap-select/dist/css/bootstrap-select.css',
            'bower_components/slick-carousel/slick/slick.css',
            'bower_components/slick-carousel/slick/slick-theme.css',
            'bower_components/slick-lightbox/dist/slick-lightbox.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',

        ];
    return gulp.src(sass_src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('dnr-concatenate-styles.css'))
        .pipe(gulp.dest('./public/_front/assets/css'))
        .pipe(gulp.dest('./html/css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(rename(function(p){ p.extname = '.min.css' }))
        .pipe(gulp.dest('./public/_front/assets/css'))
        .pipe(gulp.dest('./html/css'))
        .pipe(browserSync.stream());
});


//JS
gulp.task('plugin-js', function(){
    var script_src =
        [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
            'bower_components/slick-carousel/slick/slick.js',
            'bower_components/slick-lightbox/dist/slick-lightbox.js',

            // 'public/_front/assets/js/script-custom.js',
        ];
    return gulp.src(script_src)
        .pipe(sourcemaps.init())
        .pipe(concat('dnr-concatenate-plugin.js'))
        .pipe(gulp.dest('./public/_front/assets/js'))
        .pipe(gulp.dest('./html/js'))
        .pipe(sourcemaps.write())
        .pipe(rename(function(p){ p.extname = '.min.js' }))
        .pipe(gulp.dest('./public/_front/assets/js'))
        .pipe(gulp.dest('./html/js'))
});


// EJS
gulp.task('ejs', function() {
    gulp
        .src("./build/ejs/**.ejs")
        .pipe(ejs({ msg: "EJS files were being compiled!" }, {}, { ext: ".html" }))
        .pipe(gulp.dest("./html"));
});


gulp.task('fonts', function() {
    return gulp.src([
        './bower_components/**/fonts/**/*.*'
    ])
        .pipe(copy('./fonts', {prefix: 99}));
});


gulp.task('serve', ['sass','ejs'], function() {

    // browserSync.init({
    //     injectChanges: true,
    //     host: 'localhost',
    //     proxy: 'localhost/foldername',
    // });

    gulp.watch("./resources/assets/sass/**/*.scss", ['sass']);
    // gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch("./build/ejs/**.ejs",['ejs']);
});


gulp.task('sass:watch', function(){
    gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);
});


// gulp.task('ejs:watch', function(){

// });


gulp.task('build', function(){
    gulp.run(['plugin-css','plugin-js','fonts','sass','ejs']);
});


gulp.task('build:watch', function(){
    gulp.watch(['plugin-css','plugin-js','fonts','sass','ejs']);
    gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);
    gulp.watch('./build/**/*.ejs', ['ejs']);
});


// gulp.task('ejs:watch', function(){
//     gulp.watch(['ejs']);
// });
