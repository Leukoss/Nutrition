<script setup>
import { ref, onMounted, computed } from 'vue';
import IngredientCard from '../components/IngredientCard.vue';

const ingredients = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const supaRes = await fetch('/api/get_table?table=ingredients');
    const supaData = await supaRes.json();
    if (supaData.success) ingredients.value = supaData.data;
    else error.value = supaData.error;
  } catch (e) {
    error.value = e.message;
  }
});

// Group ingredients by type
const groupedIngredients = computed(() => {
  const groups = {};
  ingredients.value.forEach(ingredient => {
    if (ingredient.type) {
      if (!groups[ingredient.type]) groups[ingredient.type] = [];
      groups[ingredient.type].push(ingredient);
    } else {
      if (!groups['Autre']) groups['Autre'] = [];
      groups['Autre'].push(ingredient);
    }
  });
  return groups;
});
</script>

<template>
  <div class="ingredients-gallery">
    <p v-if="error" class="error">{{ error }}</p>

    <div v-else>
      <div v-for="(group, type) in groupedIngredients" :key="type" class="ingredient-group">
        <h2 class="group-title">{{ type }}</h2>
        <div class="cards-container">
          <IngredientCard 
            v-for="ingredient in group" 
            :key="ingredient.id" 
            :ingredient="ingredient"
          />
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
.ingredients-gallery {
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
  width: 28%;
  visibility: hidden;
}

.error {
  color: red;
  font-weight: bold;
}

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
