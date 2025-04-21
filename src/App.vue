<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLoading = ref(false);
const router = useRouter();

router.beforeEach((to, from, next) => {
  isLoading.value = true;
  setTimeout(() => {
    next();
  }, 2000); // Adds a 1-second delay before navigating to the next route
});

router.afterEach(() => {
  isLoading.value = false;
});
</script>

<template>
  <div id="app">
    <div v-if="isLoading" class="loading-overlay">
      <img src="/src/assets/images/paws.gif" alt="Loading..." class="loading-gif" />
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-gif {
  width: 100px;
  height: 100px; /* Make background transparent */
  mix-blend-mode: multiply; /* This helps blend the GIF with the background */
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2)); /* Optional: add subtle shadow for depth */
}
</style>