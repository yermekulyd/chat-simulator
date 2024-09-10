<template>
  <div class="chat-list">
    <h1>Добро пожаловать, {{ currentUser }}!</h1>
    <h2>Выберите, кому хотите написать:</h2>
    <ul>
      <li v-for="user in otherUsers" :key="user" @click="openChat(user)">
        {{ user }}
      </li>
    </ul>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const currentUser = sessionStorage.getItem('currentUser') // получаем текущего пользователя из sessionStorage
    const router = useRouter()

    const otherUsers = computed(() => {
      return ['User1', 'User2', 'User3'].filter((user) => user !== currentUser)
    })

    const openChat = (user: string) => {
      router.push(`/chat/${user}`)
    }

    const logout = () => {
      sessionStorage.removeItem('currentUser')
      router.push('/')
    }

    return {
      currentUser,
      otherUsers,
      openChat,
      logout
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
