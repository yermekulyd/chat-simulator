<template>
  <div class="layout">
    <!-- Левый блок с чатами -->
    <div :class="isMobile && selectedUser ? 'sidebar-hidden' : 'sidebar'">
      <div class="current-user">
        <div class="user-profile">
          <div class="profile-pic">{{ currentUser?.charAt(0).toUpperCase() }}</div>
          <div class="text-wrapper">
            <div class="username">{{ currentUser }}</div>
            <div class="online">online</div>
          </div>
        </div>
        <button class="logout-btn" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>

      <hr class="divider" />

      <!-- Список чатов -->
      <ul>
        <li
          v-for="user in otherUsers"
          :key="user"
          :class="{ active: selectedUser === user }"
          @click="selectChat(user)"
        >
          <div class="user-info">
            <div class="profile-pic">{{ user.charAt(0).toUpperCase() }}</div>
            <div>{{ user }}</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Правая часть: переписка -->
    <div :class="isMobile && !selectedUser ? 'chat-content-hidden' : 'chat-content'">
      <Chat v-if="selectedUser" :chatUser="selectedUser" :isMobile="isMobile" @goBack="goBack" />
      <div v-else class="no-chat">Выберите чат, чтобы начать общение</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Chat } from '@/components'

export default defineComponent({
  components: { Chat },
  setup() {
    const currentUser = sessionStorage.getItem('currentUser')
    const selectedUser = ref<string | null>(null)

    const otherUsers = computed(() => {
      return ['Ангелина', 'Жомарт', 'Бауыржан', 'Дарын', 'Роза'].filter(
        (user) => user !== currentUser
      )
    })

    const selectChat = (user: string) => {
      selectedUser.value = user
    }

    const logout = () => {
      sessionStorage.removeItem('currentUser')
      window.location.href = '/'
    }

    const goBack = () => {
      selectedUser.value = null
    }

    // Track viewport size to determine if it's mobile
    const isMobile = ref(window.innerWidth < 768)

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
      window.addEventListener('resize', updateIsMobile)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateIsMobile)
    })

    return {
      currentUser,
      otherUsers,
      selectedUser,
      selectChat,
      logout,
      goBack,
      isMobile
    }
  }
})
</script>

<style scoped>
@import 'styles';
</style>
