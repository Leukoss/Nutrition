<script setup>
import { ref, computed, watch } from 'vue';

const isExpanded = ref(false);
const emit = defineEmits(['update-width']);

const menuWidth = computed(() => (isExpanded.value ? '200px' : '60px'));

watch(menuWidth, (newWidth) => emit('update-width', newWidth));

const expand = () => (isExpanded.value = true);
const collapse = () => (isExpanded.value = false);
</script>

<template>
  <aside
    class="side-menu-wrapper"
    :class="{ 'is-expanded': isExpanded }"
    :style="{ '--menu-width': menuWidth }"
    role="navigation"
    :aria-expanded="isExpanded"
    @mouseenter="expand"
    @mouseleave="collapse"
  >
    <div class="menu-top-section">
      <div class="nav-button" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <ul class="side-menu-links">
      <li>
        <router-link to="/">Recettes</router-link>
      </li>
      <li>
        <router-link to="/planner">Organisateur</router-link>
      </li>
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

/* Enhances the flag by adding a thin white line next to the blue nav bar */
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

/* Hover color for the nav button is now a semi-transparent white */
.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Menu links */
.side-menu-links {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  background: transparent;
  transition: opacity 0.3s ease;
}

.side-menu-links a {
  display: block;
  padding: 1rem 1.5rem;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease-in-out;
}

/* Link hover color is now a lighter blue */
.side-menu-links a:hover {
  color: #6495ED;
}

.side-menu-links li {
  transition: background-color 0.3s ease, border-radius 0.3s ease;
}

/* List item hover background is now a semi-transparent white */
.side-menu-links li:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}
</style>