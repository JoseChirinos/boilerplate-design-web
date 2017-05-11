var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    eslint      = require('gulp-eslint'),
    uglify      = require('gulp-uglify'),
    minifycss   = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace');
    del         = require('del'),
    flatten     = require('gulp-flatten'),
    browserSync = require('browser-sync').create();


/* Tareas de optimización  BUILD */
// Borrar Archivos Antiguos del Build
gulp.task('clean',function() {
    return del('build');
});
// Minificar CSS
gulp.task('minify-css', function () {
  gulp.src('source/css/*.css')
  .pipe(concat('app.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/source/css/'))

  gulp.src('views/**/*.css')
  .pipe(concat('views.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/source/css/'))
});
// Minificar JS
gulp.task('minify-js', function () {
  gulp.src('source/js/*.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/source/js/'))

  gulp.src('views/**/*.js')
  .pipe(concat('views.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/source/js/'))
});
// Mover Recursos
gulp.task('move',['move-images','move-icons','move-fonts'], function() {
      gulp.src("views/**/*.html")
      .pipe(htmlreplace({
            'css': ['./../source/css/app.min.css','./../source/css/views.min.css'],
            'js': ['./../source/js/app.min.js','./../source/js/views.min.js']
        }))
      .pipe(flatten())
      .pipe(gulp.dest('build/views'));     
      console.log('Se ha optimizado, los archivos se encuentran en la carpeta build');
});
gulp.task('move-images', function() {
    gulp.src("source/images/**.{jpg,png,svg}")
    .pipe(gulp.dest('build/source/images/'));
});
gulp.task('move-icons', function() {
    gulp.src("source/icons/**.svg")
    .pipe(gulp.dest('build/source/icons/'));
});
gulp.task('move-fonts', function() {
    gulp.src("source/fonts/**.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest('build/source/fonts'));
});
/* Tareas de Cambios en tiempo real DEFAULT */

// Escuchar cambios
gulp.task('serve', function() {
    var files = [
      '*.html',
      'views/**/*.html',
      'views/**/*.css',
      'views/**/*.js',
      'source/css/**/*.css',
      'source/js/**/*.js',
      'source/images/**/**.*'

    ]
    browserSync.init(files,{
        server: "./"
    });
    /*gulp.watch("source/ecma6/*.js", ['lint']);*/
    gulp.watch("views/*.html").on('change', browserSync.reload);
});

/* tareas */

// Tarea para desarrollo
gulp.task('default', ['serve'],function(){
    console.log('Genera archivos para producción con el siguiente comando...');
    console.log('gulp build');
});
// Tarea para producción
gulp.task('build', ['clean'],function(){
    gulp.start('minify-css','minify-js','move');
});
/*
gulp.task('jose', function() {
    console.log('Hello Jose si funciona carajo!');
});
*/