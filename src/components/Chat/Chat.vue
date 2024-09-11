<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chat">
    <div class="chat-header">
      <button v-if="$props.isMobile && $props.chatUser" class="go-back" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="user-info">
        <div class="avatar">{{ chatUser.charAt(0).toUpperCase() }}</div>
        <p class="nickname">{{ chatUser }}</p>
      </div>
    </div>

    <div class="messages">
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
          :class="message.from === currentUser ? 'sent' : 'received'"
        >
          <div class="message-content">
            <p>{{ message.text }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="message-box">
      <input
        v-model="newMessage"
        placeholder="Введите сообщение"
        @keyup.enter="sendMessage"
        ref="messageInput"
      />
      <button @click="sendMessage" class="send-btn">
        <i class="fas fa-paper-plane"></i>
      </button>
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
    const messageInput = ref<HTMLInputElement | null>(null)

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
      if (messageInput.value) {
        messageInput.value.focus()
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('storage', loadMessages)
    })

    return {
      currentUser,
      messages,
      newMessage,
      messageInput,
      sendMessage,
      goBack
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
