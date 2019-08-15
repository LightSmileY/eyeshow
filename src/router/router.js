import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 登录页
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    },
    // 注册页
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register')
    },
    // 首页
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/views/index')
    },
    // 图像风格迁移页
    {
      path: '/index/styleMigration',
      name: 'StyleMigration',
      component: () => import('@/views/index/styleMigration')
    },
    // 社区页
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/community')
    },
    // 帖子详情页
    {
      path: '/community/postDetails',
      name: 'PostDetails',
      component: () => import('@/views/community/postDetails')
    },
    // 商城页
    {
      path: '/mall',
      name: 'Mall',
      component: () => import('@/views/mall'),
      children: [
        // 搜索详情页
        {
          path: '/mall/searchDetail',
          name: 'SearchDetail',
          component: () => import('@/views/mall/searchDetail')
        },
        // 商品详情页
        {
          path: '/mall/productDetail',
          name: 'ProductDetail',
          component: () => import('@/views/mall/productDetail'),
          children: [
            // 商品图文详情页
            {
              path: '/mall/productDetail/productPicDetail',
              name: 'EvaluationDetail',
              component: () => import('@/views/mall/productDetail/productPicDetail')
            },
            // 评价详情页
            {
              path: '/mall/productDetail/evaluationDetail',
              name: 'EvaluationDetail',
              component: () => import('@/views/mall/productDetail/evaluationDetail')
            }
          ]
        },
        // 购物车页
        {
          path: '/mall/shoppingCart',
          name: 'ShoppingCart',
          component: () => import('@/views/mall/shoppingCart')
        },
        // 订单详情页
        {
          path: '/mall/orderDetail',
          name: 'OrderDetail',
          component: () => import('@/views/mall/orderDetail')
        },
        // 我的订单页
        {
          path: '/mall/myOrders',
          name: 'MyOrders',
          component: () => import('@/views/mall/myOrders')
        },
        // 我的已完成订单页
        {
          path: '/mall/myDoneOrders',
          name: 'MyDoneOrders',
          component: () => import('@/views/mall/myDoneOrders')
        }
      ]
    },
    // 个人中心页
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/mine'),
      children: [
        // 我的帖子页
        {
          path: '/mine/myPosts',
          name: 'MyPosts',
          component: () => import('@/views/mine/myPosts')
        },
        // 我的收藏页
        {
          path: '/mine/myCollections',
          name: 'MyCollections',
          component: () => import('@/views/mine/myCollections')
        },
        // 我的粉丝页
        {
          path: '/mine/myFanses',
          name: 'MyFanses',
          component: () => import('@/views/mine/myFanses')
        },
        // 我的关注页
        {
          path: '/mine/myFocus',
          name: 'MyFocus',
          component: () => import('@/views/mine/myFocus')
        },
        // 我的喜欢页
        {
          path: '/mine/myLikes',
          name: 'MyLikes',
          component: () => import('@/views/mine/myLikes')
        },
        // 我的资料页
        {
          path: '/mine/myProfile',
          name: 'MyProfile',
          component: () => import('@/views/mine/myProfile')
        }
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
