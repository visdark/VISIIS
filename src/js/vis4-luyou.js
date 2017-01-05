// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const pro = { template: `
<transition name="fade">
<div class="pro">
产品介绍 {{ $route.params.id }}

</div>
</transition>
`};
const Bar = { template: '<div>bar</div>' };
const User = {
    template: '<div>User  后面的是按照路径ID赋值的{{ $route.params.id }}<router-view></router-view></div>'
};


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    { path: '/:id', component: pro },
    { path: '/go', component: Bar }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#prohtml');

// 现在，应用已经启动了！
new Vue({
    router,
    template: `
    <div id="app101">
      <h1>Transitions</h1>
 <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/1">/1</router-link></li>
        <li><router-link to="/2">/2</router-link></li>
        <li><router-link to="/go">/go</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>

  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>

  `
}).$mount('#app101');

