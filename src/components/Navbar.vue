<script setup>
import { ref, computed, watch } from 'vue';

const isExpanded = ref(false);
const emit = defineEmits(['update-width']);

const menuWidth = computed(() => (isExpanded.value ? '200px' : '60px'));

watch(menuWidth, (newWidth) => emit('update-width', newWidth));

const expand = () => (isExpanded.value = true);
const collapse = () => (isExpanded.value = false);
const toggle = () => (isExpanded.value = !isExpanded.value);

// Detect mobile (max-width: 768px)
const isMobile = ref(window.matchMedia("(max-width: 768px)").matches);

window.addEventListener("resize", () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
});
</script>

<template>
  <aside
    class="side-menu-wrapper"
    :class="{ 'is-expanded': isExpanded, mobile: isMobile }"
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
      <li class="divider-item"><div class="divider"></div></li>
      <li><router-link to="/recipe/new">Nouvel Recette</router-link></li>
      <li class="divider-item"><div class="divider"></div></li>
      <li><router-link to="/ingredients">Ingrédients</router-link></li>
      <li class="divider-item"><div class="divider"></div></li>
      <li><router-link to="/ingredient/new">Nouvel Ingrédient</router-link></li>
      <li class="divider-item"><div class="divider"></div></li>
      <li><router-link to="/planner">Organisateur</router-link></li>
    </ul>
  </aside>
</template>


<style scoped>
/* Root menu styles */
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
}

/* Thin white separator line */
.side-menu-wrapper::before {
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

/* Expanded state */
.side-menu-wrapper.is-expanded .side-menu-links {
  opacity: 1;
}

/* Top section (menu button) */
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

/* Hamburger bars */
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

/* Hover color for the nav button */
.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Menu links */
.side-menu-links {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.side-menu-links .divider-item:hover {
  background: transparent;
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

/* Divider styles */
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

/* -------------------
   RESPONSIVE DESIGN
------------------- */

/* Medium screens: tablets */
@media (max-width: 1024px) {
  .side-menu-wrapper {
    width: var(--menu-width, 50px);
  }

  .side-menu-wrapper.is-expanded {
    width: 180px;
  }

  .side-menu-links a {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
  }
}

/* Tablets / small screens */
@media (max-width: 768px) {
  .side-menu-wrapper {
    width: 55px;
    height: 100vh; /* Full height */
    overflow-y: auto; /* Enable vertical scroll */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
  }

  .side-menu-wrapper.is-expanded {
    width: 160px;
  }

  .menu-top-section {
    height: 50px;
  }

  .side-menu-links {
    padding: 0.5rem;
  }
}

/* Mobile: keep bottom nav style but allow scrolling if vertical */
@media (max-width: 600px) {
  .side-menu-wrapper {
    top: 0; /* Switch to vertical sidebar for scrollable nav */
    left: 0;
    width: 60px; 
    height: 100vh; /* Full height for scrolling */
    flex-direction: column;
    overflow-y: auto; /* Enable scroll */
    padding-top: 1rem;
  }

  .side-menu-wrapper::before,
  .side-menu-wrapper::after {
    display: none; /* remove flag decoration on mobile */
  }

  .menu-top-section {
    display: block; /* show toggle button */
  }

  .side-menu-links {
    display: block; /* vertical links */
    opacity: 1 !important;
    padding: 0.5rem 0;
  }

  .side-menu-links li {
    margin-bottom: 0.2rem;
  }

  .divider-item {
    display: block;
  }
}
</style>