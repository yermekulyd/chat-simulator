import { createRouter, createWebHistory } from 'vue-router'
import { Chat, UserSelect, ChatList } from '@/components'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserSelect',
      component: UserSelect
    },
    {
      path: '/chats',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/chat/:username',
      name: 'Chat',
      component: Chat
    }
  ]
})

export default router
