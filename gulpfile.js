var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    eslint      = require('gulp-eslint'),
    uglify      = require('gulp-uglify'),
    minifycss   = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace');
    del         = require('del'),
    browserSync = require('browser-sync').create();


/* Tareas de optimización  BUILD */
// Borrar Archivos Antiguos del Build
gulp.task('clean',function() {
    return del('build');
});
// Minificar CSS
gulp.task('minify-css', function () {
  gulp.src('assets/css/*.css')
  .pipe(concat('app.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/assets/css/'))
});
// Minificar JS
gulp.task('minify-js', function () {
  gulp.src('assets/js/*.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/assets/js/'))
});
// Mover Recursos
gulp.task('move',['move-images','move-icons','move-fonts'], function() {
      gulp.src("views/**.html")
      .pipe(htmlreplace({
            'css': 'assets/css/app.min.css',
            'js': 'asssets/js/app.min.js'
        }))
      .pipe(gulp.dest('build/views'));     
      console.log('Se ha optimizado, los archivos se encuentran en la carpeta build');
});
gulp.task('move-images', function() {
    gulp.src("assets/images/**.{jpg,png,svg}")
    .pipe(gulp.dest('build/assets/images/'));
});
gulp.task('move-icons', function() {
    gulp.src("assets/icons/**.svg")
    .pipe(gulp.dest('build/assets/icons/'));
});
gulp.task('move-fonts', function() {
    gulp.src("assets/fonts/**.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest('build/assets/fonts'));
});
/* Tareas de Cambios en tiempo real DEFAULT */

// Escuchar cambios
gulp.task('serve', function() {
    var files = [
      '*.html',
      'views/*.html',
      'assets/css/**/*.css',
      'assets/js/**/*.js',
      'assets/images/**/**.*'

    ]
    browserSync.init(files,{
        server: "./"
    });
    /*gulp.watch("assets/ecma6/*.js", ['lint']);*/
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