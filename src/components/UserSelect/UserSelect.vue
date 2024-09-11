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
    const users = ref(['Angelina', 'Justin', 'Dmitrii'])
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
