//模板和数据集合
//1.竖屏警告
var app = new Vue({
    el: '#ts-1',
    data: {
        title:"FXBTG温馨提示：",
        message: '使用竖屏浏览，将获得更好的效果哦！'
    }
});
//2.焦点图
Vue.component('ad-pic', {
    props: ['todo'],
    template: '<div class="swiper-slide"><a href="http://www.fxbtg-bank.com" target="_blank"><img :src="todo.pic" :alt="todo.tit"></a></div>'
});
var app2 = new Vue({
    el: '#ad-pic',
    data: {
        groceryList: [
            { pic: 'img/top-ad.png',tit: '图片广告1',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字'},
            { pic: 'img/top-ad.png',tit: '图片广告2',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字'},
            { pic: 'img/top-ad.png',tit: '图片广告3',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字'}
        ]
    }
});
//3.滚动公告
Vue.component('ad-notice', {
        props: ['todo'],
        template: '<div class="swiper-slide" ><span class="left"><i class="visiis vis-notice"></i></span><a href="http://www.fxbtg-bank.com" target="_blank">{{todo.con}}</a></div>'
    });
var app3 = new Vue({
    el: '.ad-notice',
    data: {
        groceryList: [
            { pic: 'img/top-ad.png',tit: '图片广告1',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字1'},
            { pic: 'img/top-ad.png',tit: '图片广告2',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字2'},
            { pic: 'img/top-ad.png',tit: '图片广告3',link: 'http://www.fxbtg-bank.com' ,con: '广告内容说明文字3'}
        ]
    }
});
//滚动特效激活

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true
});
var swiper2 = new Swiper('.ad-notice', {
    direction: 'vertical',
    autoplay: 4000,
    autoplayDisableOnInteraction: false,
    loop: true,
    effect: 'fade'
});
