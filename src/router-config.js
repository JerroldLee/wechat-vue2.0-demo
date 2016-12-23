//路由配置
// 1、导入路由组件
import chat from './views/chat.vue'
import contact from './views/contact.vue'
import find from './views/find.vue'
import me from './views/me.vue'
import addFriends from './views/contact/add-friends.vue'
import dialogue from './views/chat/dialogue.vue'

export default {
  //2、定义路由
  routes: [
    { 
      path: '/chat' , component: chat,
      children: [
        {
          path: 'add-friends', component: addFriends
        },
        {
          path: 'dialogue', component: dialogue
        }
      ]
    },
    { 
      path: '/contact' , component: contact,
    },
    { 
      path: '/find' , component: find,
    },
    { 
      path: '/me' , component: me,
    },
    { 
      path: '/' , redirect: '/chat'
      // path: '/' , component: Chat
    }
  ]
}