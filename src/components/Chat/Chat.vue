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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface Message {
  id: number
  from: string
  to: string
  text: string
}

export default defineComponent({
  props: {
    chatUser: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const currentUser = sessionStorage.getItem('currentUser')
    const messages = ref<Message[]>([])
    const newMessage = ref('')

    const loadMessages = () => {
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      messages.value = chatHistory.filter(
        (msg: Message) =>
          (msg.from === currentUser && msg.to === props.chatUser) ||
          (msg.from === props.chatUser && msg.to === currentUser)
      )
    }

    const sendMessage = () => {
      if (newMessage.value.trim() === '') return

      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      const message: Message = {
        id: Date.now(),
        from: currentUser as string,
        to: props.chatUser,
        text: newMessage.value
      }

      chatHistory.push(message)
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
      newMessage.value = ''
      loadMessages()
    }

    watch(() => props.chatUser, loadMessages)

    onMounted(() => {
      loadMessages()
      window.addEventListener('storage', loadMessages)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('storage', loadMessages)
    })

    return {
      messages,
      newMessage,
      sendMessage
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
