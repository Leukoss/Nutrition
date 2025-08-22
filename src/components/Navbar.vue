<script setup>
import { ref, computed, watch } from 'vue';

const isExpanded = ref(false);
const emit = defineEmits(['update-width']);

const menuWidth = computed(() => (isExpanded.value ? '200px' : '60px'));

watch(menuWidth, (newWidth) => emit('update-width', newWidth));

const expand = () => (isExpanded.value = true);
const collapse = () => (isExpanded.value = false);
const toggle = () => (isExpanded.value = !isExpanded.value);

// Detect mobile (max-width: 600px for the bottom bar)
const isMobile = ref(window.matchMedia("(max-width: 600px)").matches);

window.addEventListener("resize", () => {
  isMobile.value = window.matchMedia("(max-width: 600px)").matches;
});
</script>

<template>
  <aside
    class="side-menu-wrapper"
    :class="{ 'is-expanded': isExpanded, 'is-mobile': isMobile }"
    :style="{ '--menu-width': menuWidth }"
    role="navigation"
    :aria-expanded="isExpanded"
    @mouseenter="!isMobile && expand()"
    @mouseleave="!isMobile && collapse()"
  >
    <div 
      v-if="!isMobile" 
      class="menu-top-section" 
      @click="toggle" 
      aria-label="Toggle menu"
    >
      <div class="nav-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <ul class="side-menu-links">
      <li><router-link to="/">Recettes</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to="/recipe/new">Nouvelle Recette</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to="/ingredients">Ingrédients</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to="/ingredient/new">Nouvel Ingrédient</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to="/planner">Organisateur</router-link></li>
    </ul>
  </aside>
</template>

<style scoped>
/* Base styles for the side menu (desktop) */
.side-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--menu-width, 60px);
  background-color: #002654; /* Blue background */
  color: #fff;
  padding-right: 20px;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
  z-index: 100;
  flex-direction: column; /* Ensure vertical layout on desktop */
}

/* Base link styles */
.side-menu-links {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex; /* Flexbox for layout */
  flex-direction: column; /* Vertical list for desktop */
}

.side-menu-wrapper.is-expanded .side-menu-links {
  opacity: 1;
}

/* ... (other desktop styles like dividers, hover effects, etc.) ... */
.side-menu-wrapper::before,
.side-menu-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  right: 12px;
  height: 100%;
  width: 1px;
  background-color: #fff;
}

.side-menu-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 12px;
  background: linear-gradient(
    to right,
    #002654 33.33%,
    #ffffff 33.33%,
    #ffffff 66.66%,
    #ed2939 66.66%
  );
}

.side-menu-wrapper.is-expanded .side-menu-links {
  opacity: 1;
}

.menu-top-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out, justify-content 0.3s ease-in-out;
}

.side-menu-wrapper.is-expanded .menu-top-section {
  justify-content: flex-start;
  gap: 1.5rem;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #fff;
  border-radius: 1.5px;
  transition: all 0.3s ease;
}

.nav-button {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.7rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.side-menu-links a {
  display: block;
  padding: 1rem 1.5rem;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease-in-out;
}

.side-menu-links a:hover {
  color: #6495ED;
}

.side-menu-links li {
  transition: background-color 0.3s ease, border-radius 0.3s ease;
}

.side-menu-links li:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.divider-item {
  padding: 0.5rem 1rem;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.side-menu-wrapper.is-expanded .divider-item {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.2s;
}

.divider {
  height: 1px;
  background-color: #ed2939;
  margin: 0;
}

/* --- Responsive styles for tablets and phones --- */
@media (max-width: 768px) {
  .side-menu-wrapper {
    width: 55px;
  }

  .side-menu-wrapper.is-expanded {
    width: 160px;
  }
}

/* --- Mobile: turn into bottom nav (key changes here) --- */
@media (max-width: 600px) {
  .side-menu-wrapper {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent links from wrapping */
  }

  .side-menu-wrapper::before,
  .side-menu-wrapper::after {
    display: none; /* remove flag decoration on mobile */
  }

  .menu-top-section {
    display: none; /* hide hamburger button */
  }

  .side-menu-links {
    display: flex;
    flex-direction: row; /* Horizontal list for mobile */
    justify-content: space-around;
    align-items: center;
    opacity: 1 !important;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .side-menu-links li {
    flex-shrink: 0; /* Prevent items from shrinking */
    text-align: center;
  }

  .side-menu-links a {
    padding: 0 0.8rem; /* Adjusted padding for better fit */
    font-size: 0.85rem;
  }

  .divider-item {
    display: none; /* no dividers in bottom nav */
  }
}
</style>