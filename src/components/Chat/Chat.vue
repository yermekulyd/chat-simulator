<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chat">
    <div class="chat-header">
      <h2>Чат с {{ chatUser }}</h2>
      <button v-if="$props.isMobile && $props.chatUser" class="go-back" @click="goBack">
        Назад
      </button>
    </div>

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
    },
    isMobile: {
      type: Boolean
    }
  },
  emits: ['goBack'],
  setup(props, { emit }) {
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

    const goBack = () => {
      emit('goBack')
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
      sendMessage,
      goBack
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
