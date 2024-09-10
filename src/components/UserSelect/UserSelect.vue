<template>
  <div class="user-select">
    <h1>Выберите пользователя для входа</h1>
    <ul>
      <li v-for="user in users" :key="user" @click="selectUser(user)">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const users = ref(['User1', 'User2', 'User3'])
    const router = useRouter()

    const selectUser = (user: string) => {
      localStorage.setItem('currentUser', user)
      router.push('/chats') // после выбора пользователя перенаправляем на список чатов
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
