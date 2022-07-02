const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

const processhtml = require('gulp-processhtml')
    opts = { /* plugin options */ }

const htmlmin = require('gulp-htmlmin');
function minifyHTML() {
    return src('project/*.html')
         .pipe(processhtml(opts))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}

exports.html = minifyHTML


const imagemin = require('gulp-imagemin');
function imgMinify() {
    return gulp.src('project/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
}

exports.img = imgMinify


const concat = require('gulp-concat');
const terser = require('gulp-terser');

function jsMinify() {
    return src('project/js/**/*.js',{sourcemaps:true}) 
    
        
        .pipe(concat('app.min.js'))
        .pipe(terser())
        .pipe(dest('dist/',{sourcemaps:'.'}))
}
exports.js = jsMinify


// function cssMinify() {
//   return src('project/css/**/*.css',{sourcemaps:true}) 
//       .pipe(concat('all.min.css'))
//       .pipe(terser())
//       .pipe(dest('dist/',{sourcemaps:'.'}))
// }
// exports.js = cssMinify


var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src("project/css/**/*.css")
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/'))
}
exports.css = cssMinify




var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

function reloadTask(done) {
  browserSync.reload()
  done()
}

//watch task
function watchTask() {
    watch('project/*.html',series(htmlmin, reloadTask))
    watch('project/js/**/*.js',series(jsMinify, reloadTask))
    watch('project/css/**/*.css',series(cssMinify, reloadTask))
}
exports.default = series( parallel(minifyHTML,imgMinify, jsMinify,cssMinify), serve,watchTask)









































//sass task
// const sass = require('gulp-sass')(require('sass'));
// function sassMinify() {
//     return src(["project/sass/**/*.scss", "project/css/**/*.css"],{sourcemaps:true})
//         .pipe(sass()) // Using gulp-sass to convert sass to css
//         //concate all js files in all.min.js
//         .pipe(concat('style.sass.min.css'))
//         .pipe(cleanCss())
//         .pipe(dest('dist/assets/css',{sourcemaps:'.'}))
// }

