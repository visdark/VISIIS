# VISIIS
visiis 视觉前端 —— 专注于前端的网站构架师

## 分支vis

### 建立构建环境

项目构建比较有名的有：

* gulp 杯水——基于流的自动化构建工具。
* webpack  
* grunt 大牛——基于IO

CSS 构建环境：

* sass
* less 

JS 框架

* React
* Zepto

UI 框架和字体库

* semantic
* Font Awesome 
* 阿里云

## 2016-12-16


### 构架gulp环境，添加必要的插件

* BrowserSync：npm install --save-dev browser-sync 　浏览器同步测试
* gulp-imagemin: 压缩图片大小
* sass和less插件：npm install --save-dev gulp-sass css构建工具
* css压缩：npm install gulp-minify-css 现在这个改版名称了 变成npm install gulp-clean-css --save-dev 
* 头文件说明：npm install --save-dev gulp-header 可以在所有文件中加入版权标记
* js压缩：npm install --save-dev gulp-uglify 压缩JS
* 重命名文件：npm install --save-dev gulp-rename 
* 合并文件：npm install --save-dev gulp-concat
* 清除文件：npm install --save-dev gulp-clean 删除更新中的文件
