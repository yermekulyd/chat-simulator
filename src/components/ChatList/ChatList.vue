<template>
  <div class="chat-list">
    <h1>Добро пожаловать, {{ currentUser }}!</h1>
    <h2>Выберите, кому хотите написать:</h2>
    <ul>
      <li v-for="user in otherUsers" :key="user" @click="openChat(user)">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const currentUser = localStorage.getItem('currentUser')
    const router = useRouter()

    const otherUsers = computed(() => {
      return ['User1', 'User2', 'User3'].filter((user) => user !== currentUser)
    })

    const openChat = (user: string) => {
      router.push(`/chat/${user}`)
    }

    return {
      currentUser,
      otherUsers,
      openChat
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
