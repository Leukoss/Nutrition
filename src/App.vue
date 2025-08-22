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

/* ---------- HEADER ---------- */
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

/* ---------- MAIN CONTENT ---------- */
.main-content-wrapper {
  margin-top: 80px; /* space under header */
  padding: 1.5rem;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

/* -------------------
   RESPONSIVE DESIGN
------------------- */

/* Tablets */
@media (max-width: 1024px) {
  .header-name {
    font-size: 1.3rem;
  }

  .main-content-wrapper {
    padding: 1rem;
  }
}

/* Small tablets / landscape phones */
@media (max-width: 768px) {
  .page-header {
    height: 55px;
    padding: 0 15px;
  }

  .header-name {
    font-size: 1.1rem;
  }

  .main-content-wrapper {
    margin-top: 70px;
    padding: 0.8rem;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  .page-header {
    left: 0 !important; /* ignore sidebar width */
    width: 100% !important;
    height: 50px;
    padding: 0 10px;
    justify-content: flex-start;
  }

  .header-name {
    font-size: 1rem;
  }

  .main-content-wrapper {
    margin-top: 65px;
    margin-left: 0 !important; /* sidebar hidden on mobile */
    width: 100% !important;
    padding: 0.7rem;
    padding-bottom: 60px; /* Add this line */
  }
}
</style>