<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// ------------------- STATE HANDLING ------------------- 

// Default state for the navigation bar is collapsed
const isExpanded = ref(false);

// Define the state for both collapse and expand according to isExpanded
const collapse = () => (isExpanded.value = false);
const expand = () => (isExpanded.value = true);
const toggle = () => {isExpanded.value = !isExpanded.value};

// ------------------- MOBILE HANDLING ------------------- 

// Detect mobile (max-width: 600px for the bottom bar) returning a boolean
const isMobile = ref(window.matchMedia("(max-width: 600px)").matches);

// Listen to the resizing to match the mobile format
window.addEventListener("resize", () => {
  isMobile.value = window.matchMedia("(max-width: 600px)").matches;
});

// --------------- SIZE FOR NAVIGATION BAR ------------------- 

// Either 200px or 60px depending if the state is collapse or expand
const menuWidth = computed(() => (isExpanded.value ? '200px' : '80px'));

// ------------------- DYNAMIC CSS VARIABLE ------------------- 

// Watch menuWidth and set CSS variable on root
watch(menuWidth, (newWidth) => {
  document.documentElement.style.setProperty('--menu-width', newWidth);
});

// Set initial value on mounted
onMounted(() => {
  document.documentElement.style.setProperty('--menu-width', menuWidth.value);
});
</script>

<template>
  <!-- Content related to the main content -->
  <aside
    class="side-menu-wrapper"
    :class="{ 'is-expanded': isExpanded, 'is-mobile': isMobile }"
    :style="{ '--menu-width': menuWidth }"
    role="navigation"
    :aria-expanded="isExpanded"
    @mouseenter="!isMobile && expand()"
    @mouseleave="!isMobile && collapse()"
  >
    <!-- Hamburger button only displayed for non mobile rendering -->
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
      <li><router-link to ="/recipes">Recettes</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to ="/ingredients">Ingrédients</router-link></li>
      <li class="divider-item" v-if="!isMobile"><div class="divider"></div></li>
      <li><router-link to ="/meal-planner">Organisateur</router-link></li>
    </ul>
  </aside>
</template>

<style scoped>
/* --------------- GLOBAL STYLE --------------- */

.side-menu-wrapper {
  /* Color */
  background-color: #002654;
  color: #fff;

  /* Size and position */
  width: var(--menu-width);
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  left: 0;
  top: 0;

  /* Avoid overlapping */
  padding-right: 20px;
  overflow-x: hidden;

  /* Smooth transition */
  transition: width 0.3s ease-in-out;
}

.side-menu-wrapper::after {
  /* Content */
  background: linear-gradient(
    to right,
    #002654 33.33%,
    #ffffff 33.33%,
    #ffffff 66.66%,
    #ed2939 66.66%
  );
  content: "";

  /* Position */
  position: absolute;
  height: 100%;
  width: 12px;
  right: 0;
  top: 0;  
}

/* --------------- HAMBURGER STYLE --------------- */

.menu-top-section {
  /* Position */
  justify-content: center;
  align-items: center;
  display: flex;
  height: 60px;

  /* Transition */
  transition: all 0.3s ease-in-out, justify-content 0.3s ease-in-out;
}

.nav-button {
  /* Position */
  flex-direction: column;
  display: inline-flex;
  padding: 0.9rem;
  gap: 5px;

  /* Shape */
  border-radius: 50%;

  /* Background Transition */
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.bar {
  /* Color */
  background-color: #fff;

  /* Shape */
  border-radius: 1.5px;
  width: 25px;
  height: 3px;
}

/* ------------- NAVIGATION LINKS STYLE ------------- */

/* Style when collapse */
.side-menu-links {
  flex-direction: column;
  padding: 0.5rem 0;
  list-style: none;
  display: flex;
  opacity: 0;
  margin: 3;

  /* Transition */
  transition: opacity 0.3s ease;
}

/* Style when expand */
.side-menu-wrapper.is-expanded .side-menu-links {
  opacity: 1;
}

.side-menu-links a {
  /* Position */
  padding: 1rem 1.5rem;
  display: block;

  /* Text */
  text-decoration: none;
  white-space: nowrap;
  font-weight: bold;
  color: #fff;

  /* Transition */
  transition: color 0.3s ease-in-out;
}

.side-menu-links a:hover {
  color: #6495ED;
}

/* ------------- DIVIDER STYLE ------------- */

.divider-item {
  /* Style */
  padding: 0.5rem 1rem;
  opacity: 0;

  /* Transition */
  transition: opacity 0.3s ease-out;
}

.divider {
  background-color: #ed2939;
  height: 1px;
  margin: 0;
}

.side-menu-wrapper.is-expanded .divider-item {
  transition: opacity 0.3s ease-in 0.2s;
  opacity: 1;
}

/* --------------- RESPONSIVENESS STYLE --------------- */

/* Tablets and Phones */
@media (max-width: 768px) {
  .side-menu-wrapper {
    width: 55px;
  }

  .side-menu-wrapper.is-expanded {
    width: 160px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .side-menu-wrapper {
    /* Place at the bottom the navigation bar */
    height: 60px;
    width: 100%;
    padding: 0;
    top: auto;
    bottom: 0;
    left: 0;
    
    /* Display the elements side to side */
    justify-content: space-around;
    white-space: nowrap;
    align-items: center;
    overflow-x: auto;
    display: flex;
  }

  .side-menu-links {
    justify-content: space-around;
    opacity: 1 !important;
    flex-direction: row;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0;
  }

  .side-menu-links li {
    text-align: center;
    flex-shrink: 0;
  }

  .side-menu-links a {
    font-size: 0.85rem;
    padding: 0 0.8rem;
  }
}
</style>