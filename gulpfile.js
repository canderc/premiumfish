const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const url = require('url');
const proxy = require('proxy-middleware');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename')
const gulpCopy = require('gulp-copy');

gulp.task('sass', function(done) {
  gulp.src("./styles/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("build/styles"))
      .pipe(browserSync.stream());
      done();
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
})

gulp.task('run', function(done) {
  const proxyOptions = url.parse('http://localhost:4444/api')
  proxyOptions.route = "/api"
  
  browserSync.init({
      server: {
        baseDir: "./",
        middleware: [proxy(proxyOptions)]
      }
  });

  gulp.watch("styles/**/*.scss", gulp.series('sass'));
  gulp.watch("js/**/*.js", gulp.series('js-bundle'));
  gulp.watch("js/**/*.js", gulp.series('reload'));
  gulp.watch("img/**", gulp.series('reload'));
  gulp.watch("index.html", gulp.series('reload'));

  done()
});

gulp.task('js-bundle', function(done) {
  gulp.src('js/index.js')
    .pipe(browserify({
      transform: ['babelify'],
      insertGlobals : true,
      debug : true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./build/js'))

  done()
});

gulp.task('copy-images', function(done) {
  gulp
    .src('img/**')
    .pipe(gulp.dest('build/img'))

  done()
});

gulp.task('copy-html', function(done) {
  gulp
    .src('index.html')
    .pipe(gulp.dest('build'))

  done()
});

gulp.task('serve', gulp.series('sass', 'js-bundle', 'run', 'copy-images', 'copy-html'));

gulp.task('default', gulp.series('serve'));