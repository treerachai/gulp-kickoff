var gulp    = require('gulp');
var $       = require('./utils/$');

var compile = $.lazypipe()
  .pipe($.plumber, {errorHandler: $.on.error})
  .pipe($.coffee, {bare: true})
  // Angular specific
  // .pipe($.ngAnnotate)
  .pipe(gulp.dest, $.paths.scripts.dest)
  .pipe(function () {
    return $.if($.config.live, $.reloadStream())
  });

gulp.task('coffee', ['scripts:clean'], function () {
  return gulp.src($.paths.coffee.all).pipe(compile());
});

gulp.task ('coffee:watch', ['scripts:clean'], function () {
  return $.watch({name: 'Coffee', glob: $.paths.coffee.all})
    .pipe(compile());
});
