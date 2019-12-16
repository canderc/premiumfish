var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function(done) {
  gulp.src("./styles/style.scss")
      .pipe(sass())
      .pipe(gulp.dest("./styles"))
      .pipe(browserSync.stream());
      done();
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
})

gulp.task('run', function(done) {

  browserSync.init({
      server: "./"
  });

  gulp.watch("styles/**/*.scss", gulp.series('sass'));
  gulp.watch("*.html", gulp.series('reload'));
  done()

});

gulp.task('serve', gulp.series('sass', 'run'));

gulp.task('default', gulp.series('serve'));