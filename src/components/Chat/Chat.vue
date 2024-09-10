<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chat">
    <h2>Чат с {{ chatUser }}</h2>

    <div class="messages">
      <ul>
        <li v-for="message in messages" :key="message.id">
          <strong>{{ message.from }}:</strong> {{ message.text }}
        </li>
      </ul>
    </div>

    <div class="message-box">
      <input v-model="newMessage" placeholder="Введите сообщение" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Отправить</button>
    </div>
    <button @click="goBack">Назад к списку чатов</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Message {
  id: number
  from: string
  to: string
  text: string
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentUser = sessionStorage.getItem('currentUser')
    const chatUser = route.params.username as string

    const messages = ref<Message[]>([])
    const newMessage = ref('')

    const loadMessages = () => {
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      messages.value = chatHistory.filter(
        (msg: Message) =>
          (msg.from === currentUser && msg.to === chatUser) ||
          (msg.from === chatUser && msg.to === currentUser)
      )
    }

    // Отправка нового сообщения
    const sendMessage = () => {
      if (newMessage.value.trim() === '') return

      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      const message: Message = {
        id: Date.now(),
        from: currentUser as string,
        to: chatUser,
        text: newMessage.value
      }

      chatHistory.push(message)
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
      newMessage.value = ''
      loadMessages()
    }

    const goBack = () => {
      router.push('/chats') // возвращаемся к списку чатов
    }

    onMounted(() => {
      loadMessages()
      window.addEventListener('storage', loadMessages) // Синхронизация сообщений между вкладками
    })

    onBeforeUnmount(() => {
      window.removeEventListener('storage', loadMessages)
    })

    return {
      chatUser,
      messages,
      newMessage,
      sendMessage,
      goBack
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
