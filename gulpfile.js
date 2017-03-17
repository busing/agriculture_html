var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');
    sass = require('gulp-sass');

gulp.task('connect', function () {
    connect.server({
        // root: '/source/circleproject/circle/doc/html/',
        port:8080,
        livereload: true
    });
});

gulp.task('allJs', function () {
    return gulp.src(['www/js/*.js', 'www/directive/*.js', 'www/views/*/*.js'])
        .pipe(concat("all.js"))
        .pipe(gulp.dest("www/"));
});
gulp.task('sass',function () {
    return gulp.src(['www/scss/*.scss','www/scss/*/*.scss'])
        .pipe(sass().on('error', sass.logError))
        // .pipe(concat("css.css"))
        .pipe(gulp.dest("www/css/"));
})
gulp.task('reload', ['allJs','sass'], function () {
    return gulp.src(['www/'])
    .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch(['www/scss/*.scss','www/scss/*/*.scss', 'www/*.html', 'www/js/*.js', 'www/directive/*.*', 'www/views/*/*.html','www/views/*/*.js'], ['reload']);
    // gulp.watch(['www/index.html'], ['reload']);

});

gulp.task('default', ['connect', 'watch']);

gulp.task('bower',function(){
    gulp.src([
        'bower_components/*/dist/*/*.min.css',
        'bower_components/*/dist/*/*.css',
        'bower_components/*/dist/*/*.min.js',
        'bower_components/*/dist/*/*.js',
        'bower_components/*/dist/font/*',
        'bower_components/*/dist/*.min.js',
        'bower_components/*/dist/*.js',
        'bower_components/*/dist/*.min.css',
        'bower_components/*/dist/*.css',
        'bower_components/*/*.min.css',
        'bower_components/*/*.css',
        'bower_components/*/*/*.css',
        'bower_components/*/*.min.js',
        'bower_components/*/*.js',
        'bower_components/*/css/*.css',
        'bower_components/*/font/*.*',
        'bower_components/*'
        ])
        .pipe(gulp.dest("dist/bower_components/"))
});

gulp.task('publish',['bower','source','www']);


gulp.task('source',['sass','allJs'],function(){
    gulp.src([
        'www/*/*.+(css|js|png|jpg|eot|svg|ttf|woff|woff2|html|htm)',
        'www/all.js',
        'www/*.html',
        '!www/js/*.js',
        '!www/js/*.js',
        '!www/app.js'
        ])
    .pipe(gulp.dest('dist/'));
});


gulp.task('www',function(){
    gulp.src(['www/views/*/*.html'])
    .pipe(gulp.dest('dist/views'));
});




