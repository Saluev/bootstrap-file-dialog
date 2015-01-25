var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass');

gulp.task('uglify', function() {
  gulp.src('bootstrap.fd.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

.task('sass', function() {
  gulp.src('bootstrap.fd.css')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
})

.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
})

.task('watch', function(){
  gulp.watch('bootstrap.fd.css', ['sass']);
  gulp.watch('bootstrap.fd.js', ['uglify']);
})

.task('build', ['uglify', 'sass'])

.task('default', ['webserver', 'watch']);

