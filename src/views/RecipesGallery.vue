<script setup>
import { ref, onMounted, computed } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';

const recipes = ref([]);
const error = ref(null);

// Fetch recipes from Supa API
onMounted(async () => {
  try {
    const supaRes = await fetch('/api/get_recipes');
    const supaData = await supaRes.json();
    if (supaData.success) recipes.value = supaData.recipes;
    else error.value = data.error;
  } catch (e) {
    error.value = e.message;
  }
});

// Group recipes by type
const groupedRecipes = computed(() => {
  const groups = {};
  recipes.value.forEach(recipe => {
    if (recipe.recipe_type && recipe.recipe_type.length > 0) {
      recipe.recipe_type.forEach(type => {
        if (!groups[type]) groups[type] = [];
        groups[type].push(recipe);
      });
    } else {
      if (!groups['Autre']) groups['Autre'] = [];
      groups['Autre'].push(recipe);
    }
  });
  return groups;
});
</script>

<template>
  <div class="recipes-gallery">
    <p v-if="error" class="error">{{ error }}</p>

    <div v-else>
      <div v-for="(group, type) in groupedRecipes" :key="type" class="recipe-group">
        <h2 class="group-title">{{ type }}</h2>
        <div class="cards-container">
          <RecipeCard v-for="recipe in group" :key="recipe.id" :recipe="recipe"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipes-gallery {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.group-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
