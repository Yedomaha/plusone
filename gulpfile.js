var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    uglyfly = require('gulp-uglyfly'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');
    sourcemaps = require('gulp-sourcemaps');

var baseDir = "../redroo";

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('assets/src/scss/main.scss') // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/dist')) // Выгружаем результат в папку assets/css
        .pipe(minifyCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('assets/dist')) // Выгружаем результат в папку assets/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: baseDir // Директория для сервера - assets
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('compress', function() {
    gulp.src('assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/dist/img'))
});

gulp.task('js', function() {
    gulp.src(['./assets/src/js/*.js', '!./assets/src/js/scripts.min.js'] )
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/dist'))
        .pipe(uglyfly())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./assets/dist'))
});

gulp.task('js_prod', function() {
    gulp.src(['./assets/src/js/*.js', '!./assets/src/js/scripts.min.js'] )
        .pipe(concat('scripts.min.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('./js/'));
});


gulp.task('watch',['browser-sync', 'sass', 'compress', 'js'], function() {
    gulp.watch(['./assets/src/js/*.js', '!./assets/dist/js/scripts.min.js'], ['js']);
    gulp.watch('assets/src/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами
    // Наблюдение за другими типами файлов
});


