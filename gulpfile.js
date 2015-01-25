var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass');

gulp.task('uglify', function() {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

.task('sass', function() {
  gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
})

.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      directoryListing: false,
      open: false,
      fallback: 'example.html'
    }));
})

.task('watch', function(){
  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.js', ['uglify']);
})

.task('build', ['uglify', 'sass'])

.task('default', ['build', 'webserver', 'watch']);

