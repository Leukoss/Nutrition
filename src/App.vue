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
  border-bottom: 2px solid;
  border-image: linear-gradient(
    to right,
    #002654 33.33%, 
    #f2f2f2 33.33%,
    #f2f2f2 66.66%, 
    #ed2939 66.66%
  ) 1;
  padding: 0 20px;
}

.header-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
</style>