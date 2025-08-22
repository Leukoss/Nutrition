<script setup>
import { ref } from 'vue';

import Navbar from './components/Navbar.vue';

const sidebarWidth = ref('60px');

const updateContentMargin = (newWidth) => {
  sidebarWidth.value = newWidth;
};
</script>

<template>
  <div id="app-container">
    <Navbar @update-width="updateContentMargin" />

    <header
      class="page-header"
      :style="{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }"
    >
      <div class="header-spacer"></div>

      <h1 class="header-name">Nutrim'Aide</h1>
    </header>

    <main class="main-content-wrapper" :style="{ 'margin-left': sidebarWidth, width: `calc(100% - ${sidebarWidth})` }">
      <Transition name="page-fade" mode="out-in">
        <RouterView :key="locale" />
      </Transition>
    </main>
  </div>
</template>

<style>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  position: fixed;
  top: 0;
  height: 60px;
  color: #002654;
  background-color: white;
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease, left 0.3s ease;
  border-bottom: 5px solid;
  border-image: linear-gradient(
    to right,
    #002654 33.33%, 
    #ffff 33.33%,
    #ffff 66.66%, 
    #ed2939 66.66%
  ) 1;
  padding: 0 20px;
}

.page-header::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #002654;
}

.header-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.main-content-wrapper {
  margin-top: 80px; /* <-- adds space below header */
  padding: 1.5rem;
}
</style>
