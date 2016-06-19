var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('lint', () =>
    //TODO: use src dir and create a minified and browser version on build
    gulp.src(['**/*.js', '!node_modules/**', '!test/**', '!dist/**', '!coverage/**', '!gulpfile.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});
