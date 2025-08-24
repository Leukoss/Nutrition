<script setup>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div id="app-container">
    <Navbar />

    <div id="main-layout">
      <Header />

      <!-- Smooth transition between routes -->
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* ------------- GLOBAL STYLE --------------- */

#app-container{
  flex-direction: row;
  display: flex;
}

/* Both Header and Main Content */
#main-layout {  
  /* Position and Size */
  margin-left: var(--menu-width, 80px);
  flex-direction: column;
  display: flex;
  flex: 1;

  /* Transition */
  transition: margin-left 0.3s ease-in-out;
}

/* Main content area */
#page-content {
  min-height: 100vh;
  padding: 1rem;
  flex: 1;
  
  /* Color */
  background-color: #f5f5f5;
}

/* ------------- ROUTE TRANSITION ------------- */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* --------------- RESPONSIVENESS STYLE --------------- */

/* Mobile: sidebar at bottom */
@media (max-width: 600px) {
  #main-layout {
    margin-left: 0;
  }
}
</style>