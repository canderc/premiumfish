const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename')

gulp.task('sass', function(done) {
  gulp.src("./styles/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("styles"))
      .pipe(browserSync.stream());
      done();
});

gulp.task('js-bundle', function(done) {
  gulp.src('js/index.js')
    .pipe(browserify({
      transform: ['babelify'],
      insertGlobals : true,
      debug : true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./js'))

  done()
});

gulp.task('default', gulp.series('sass', 'js-bundle'));