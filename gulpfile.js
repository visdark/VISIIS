/**
 * 项目构建
 */

//导入工具包
var gulp = require('gulp'), //构建gulp
    plugins = require('gulp-load-plugins')();//读取构建模块
    less = require('gulp-less'); //less支持
    pkg = require('./package.json'); //配置数据
    clean = require('gulp-clean'); //清除多余文件
    uglify = require('gulp-uglify');  // js压缩
    cleanCSS = require('gulp-clean-css'); //压缩CSS
    htmlmin = require('gulp-htmlmin'); //压缩HTML
    header = require('gulp-header'); //版权插入声明
    rename = require('gulp-rename'); //重命名支持
    concat = require('gulp-concat'); //合并文件
    runSequence = require('run-sequence');//异步执行
    debug = require('gulp-debug'); //任务提示
    browserSync = require('browser-sync').create(); //浏览器测试
    git = require('gulp-git'); //上传下载
    fileinclude  = require('gulp-file-include');
    banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n'); //版权说明


//任务：less文件转化css
// less解析
gulp.task('build-less', function(){
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(debug({title: '正在处理less文件'}))
        .pipe(gulp.dest('./dist/css/'));
});

// 移动构建库
gulp.task('build-html',function(){
    gulp.src('./src/*.html')
        .pipe(debug({title: '正在移动静态文件'}))
        .pipe(htmlmin({collapseWhitespace: true ,
            removeComments: true}))
        .pipe(gulp.dest('./dist/'));
});
//任务：压缩css
gulp.task('stylesheets',['build-less'], function() {
    gulp.src(['./dist/css/vis-*.css'])
        .pipe(concat('visi.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(debug({title: '正在压缩css文件'}))
        .pipe(gulp.dest('./dist/css/'));
});

// 合并，压缩js文件
gulp.task('javascripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('visi.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(debug({title: '正在压缩js文件'}))
        .pipe(gulp.dest('./dist/js'));
});

//引入头部底部
gulp.task('fileinclude', function() {
    // 适配html中所有文件夹下的所有html，排除html下的include文件夹中html
    gulp.src(['./src/html/**/*.html','!./src/html/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./src/'));
});

//检视less改动
gulp.task('develop',function(callback){
    runSequence(['build-less','fileinclude'],['stylesheets','javascripts','build-html'], 'browser', callback);
    gulp.watch('./src/less/*.less', ['build-less']);
    gulp.watch('./src/html/**/*.html', ['fileinclude']);
});

//任务：浏览器测试
gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

//任务：清除多余css
gulp.task('clean', function() {
    return gulp.src(['./dist/css/visi.css','./dist/css/visi.min.css'], {read: false})
        .pipe(clean({force: true}))
        .pipe(debug({title: '大扫除..咿呀咿呀'}));
});
//顺序执行任务
gulp.task('default',['clean'], function() {
    gulp.run('develop');
});
