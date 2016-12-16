/**
 * 项目构建
 */

//导入工具包
var gulp = require('gulp'), //构建gulp
    less = require('gulp-less'); //less支持
    browserSync = require('browser-sync').create(); //浏览器测试
// cssmin = require('gulp-minify-css'); //css压缩
//声明任务
//任务1：将less转换并压缩css
gulp.task('testLess', function () {
    gulp.src('src/less/normalize.less')
        .pipe(less())
       // .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
//任务2：浏览器测试
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

//合并执行任务
gulp.task('default', ['testLess','browser-sync']);

