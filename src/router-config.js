//路由配置
// 1、导入路由组件
import Chat from './views/chat.vue'
import AddFriends from './views/contact/add-friends.vue'

export default {
  //2、定义路由
  routes: [
    { 
      path: '/chat' , component: Chat,
      children: [
        {
          path: '/add-friends', component: AddFriends
        }
      ]
    }
    ,
    { 
      path: '/' , redirect: '/chat'
      // path: '/' , component: Chat
    }
  ]
}