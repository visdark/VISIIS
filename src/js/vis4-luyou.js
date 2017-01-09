//产品列表内容表
const pro1 = { template: `
<transition name="fade">
<div>
外汇的相关说明
</div>
</transition>
`};
const pro2 = { template: '<div>贵金属</div>' };
const pro3 = { template: '<div>能源</div>' };
const pro4 = { template: '<div>股指</div>' };
const pro5 = { template: '<div>农产品</div>' };
const pro6 = { template: '<div>差价合约</div>' };
const pro7 = { template: '<div>原油</div>' };
const pro8 = { template: '<div>其他</div>' };
//产品列表路由表
const routes = [
    { path: '/1', component: pro1 },
    { path: '/2', component: pro2 },
    { path: '/3', component: pro3 },
    { path: '/4', component: pro4 },
    { path: '/5', component: pro5 },
    { path: '/6', component: pro6 },
    { path: '/7', component: pro7 },
    { path: '/8', component: pro8 }

];

// 创建 router
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});
// 开启路由模板模式，挂载ing
new Vue({
    router,
    template: `
    <div id="app101">
    <div class="tit"><i class="visiis vis-notice"></i> 产品中心</div>
      <div class="con"></div>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  `
}).$mount('#app101');

