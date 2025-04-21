<template>
  <router-link to="/" class="home-button" title="Go to Home">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
    </svg>
  </router-link>
</template>

<script setup>
// No props or logic needed for this simple component
</script>

<style scoped>
.home-button {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background-color: #077A7D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 99; /* High enough to be above most content but below the sidebar toggle */
  transition: all 0.3s ease;
}

.home-button:hover {
  transform: scale(1.1);
  background-color: #06202B;
}

.home-button svg {
  width: 20px;
  height: 20px;
}
</style>