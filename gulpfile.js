/**
 * 项目构建
 */

//导入工具包
var gulp = require('gulp'), //构建gulp
    less = require('gulp-less'); //less支持
    pkg = require('./package.json'); //配置数据
    clean = require('gulp-clean'); //清除多余文件
    uglify = require('gulp-uglify');  // js压缩
    cleanCSS = require('gulp-clean-css'); //压缩CSS
    header = require('gulp-header'); //版权插入声明
    rename = require('gulp-rename'); //重命名支持
    concat = require('gulp-concat'); //合并文件
    runSequence = require('run-sequence'); //异步执行
    browserSync = require('browser-sync').create(); //浏览器测试


//开始任务

//任务：Less文件转化css
gulp.task('vis-less', function(){
    gulp.src('./src/less/vis-normalize.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'))

    gulp.src('./src/less/vis-visi.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'))

});
//任务：清除多余css
gulp.task('vis-css', function(){
    gulp.src(['./dist/css/vis-normalize.css','./dist/css/vis-visi.css'])
        .pipe(concat('visi.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'));
});


//任务：浏览器测试
gulp.task('vis-browser', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});


//顺序执行任务

gulp.task('default', function(cb) {
    runSequence('vis-less', 'vis-css', 'vis-browser', cb);
});