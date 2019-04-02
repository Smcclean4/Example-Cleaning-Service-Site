const gulp = require('gulp');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp')
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const del = require('del');
const dest = require('dest');
// browser sync files for time
function browser_sync(done) {
  browserSync.init( {
    server: {
      baseDir: 'project'
    }
  });
  done();
}
// watch files for reload and minify
function watch_files(done) {
  gulp.watch('project/css/**/*.css', reload);
  gulp.watch('project/*.html', reload);
  gulp.watch('project/js/**/*.js', reload);
  done();
}
// reload function for browser sync
function reload(done) {
  browserSync.reload();
  done();
}
// del for fresh files
function clean() {
  return del(['/dist']);
}
// minification for faster browser load speeds
function mini() {
  return  gulp.src('project/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
}
// tasks
gulp.task('useref', gulp.series(clean, mini));
gulp.task('watch', gulp.series(browser_sync, watch_files));
