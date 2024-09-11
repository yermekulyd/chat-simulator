<template>
  <div class="user-select">
    <h1>Выберите пользователя</h1>
    <ul>
      <li v-for="user in users" :key="user" @click="selectUser(user)" class="user-item">
        <div class="avatar">{{ user.charAt(0).toUpperCase() }}</div>
        <span class="username">{{ user }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const users = ref(['Ангелина', 'Жомарт', 'Бауыржан', 'Дарын', 'Роза'])
    const router = useRouter()

    const selectUser = (user: string) => {
      sessionStorage.setItem('currentUser', user)
      router.push('/chats')
    }

    return {
      users,
      selectUser
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
