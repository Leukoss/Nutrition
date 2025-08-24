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
    else error.value = supaData.error;
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
          <!-- Fill empty slots to keep exactly 3 per row -->
          <div
            v-for="i in (3 - (group.length % 3))"
            v-if="group.length % 3 !== 0"
            :key="'empty-' + i"
            class="empty-card-slot"
          ></div>
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
  grid-template-columns: repeat(3, 28%);
  justify-content: space-between;
  gap: 1%;
}

.empty-card-slot {
  width: 30%;
  visibility: hidden; /* reserve space but invisible */
}

.error {
  color: red;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(2, 48%);
    gap: 2%;
  }
  .empty-card-slot {
    width: 48%;
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 100%;
    gap: 1rem;
  }
  .empty-card-slot {
    width: 100%;
  }
}
</style>
