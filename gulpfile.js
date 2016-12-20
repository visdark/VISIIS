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
    fs = require('fs'); //写入文件
    replace = require('gulp-replace'); //
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
    gulp.src(['./dist/css/*.css'])
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
gulp.task('include', function() {
    var htmlDir = './src/html/';
    fs.readdir(htmlDir, function(err, files) {
        if (err) {
            console.log(err);
        } else {
            files.forEach(function(f) {
                if (f !== '_header.html' && f !== '_footer.html') {
                    gulp.src(htmlDir + f)
                        .pipe(replace(/<!--header-->[\s\S]*<!--headerend-->/, '<!--header-->\n' + fs.readFileSync(htmlDir + '_header.html', 'utf-8') + '\n<!--headerend-->'))
                .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(htmlDir + '_footer.html', 'utf-8') + '\n<!--footerend-->'))
                .pipe(gulp.dest('./src/'))
                }
            });
        }
    });
});
gulp.task('watch', function() {
    gulp.watch(['./html/_header.html', './html/_footer.html'], ['include']);
});

//检视less改动
gulp.task('develop',function(callback){
    runSequence(['build-less','include'],['stylesheets','javascripts','build-html'], 'browser', callback);
    gulp.watch('./src/less/*.less', ['build-less']);
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
