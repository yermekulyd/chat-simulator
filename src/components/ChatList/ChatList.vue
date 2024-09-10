<template>
  <div class="layout">
    <!-- Левый блок с чатами -->
    <div class="sidebar">
      <h1>Добро пожаловать, {{ currentUser }}!</h1>
      <h2>Выберите, кому хотите написать:</h2>
      <ul>
        <li
          v-for="user in otherUsers"
          :key="user"
          :class="{ active: selectedUser === user }"
          @click="selectChat(user)"
        >
          {{ user }}
        </li>
      </ul>
      <button @click="logout">Выйти</button>
    </div>

    <!-- Правый блок с перепиской -->
    <div class="chat-content">
      <Chat v-if="selectedUser" :chatUser="selectedUser" />
      <div v-else class="no-chat">Выберите чат, чтобы начать общение</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { Chat } from '@/components'

export default defineComponent({
  components: { Chat },
  setup() {
    const currentUser = sessionStorage.getItem('currentUser')
    const selectedUser = ref<string | null>(null)

    const otherUsers = computed(() => {
      return ['User1', 'User2', 'User3'].filter((user) => user !== currentUser)
    })

    const selectChat = (user: string) => {
      selectedUser.value = user
    }

    const logout = () => {
      sessionStorage.removeItem('currentUser')
      window.location.href = '/'
    }

    return {
      currentUser,
      otherUsers,
      selectedUser,
      selectChat,
      logout
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
