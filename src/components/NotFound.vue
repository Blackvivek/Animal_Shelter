<template>
  <div class="not-found">
    <HomeButton />
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Dashboard</router-link>
  </div>
</template>

<script setup>
import HomeButton from './HomeButton.vue';
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  position: relative;
}

.not-found h1 {
  font-size: 2.5rem;
  color: #ff6b6b;
}

.not-found p {
  font-size: 1.2rem;
  margin: 20px 0;
}

.not-found a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
</style>