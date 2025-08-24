<script setup>
const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="recipe-card">
    <h3 class="recipe-title">{{ recipe.name }}</h3>
    
    <div class="recipe-meta">
      <span v-for="n in recipe.nationality" :key="n" class="recipe-nationality">{{ n }}</span>
      <span class="recipe-calories">{{ recipe.calories }} kcal</span>
    </div>

    <div class="recipe-macros">
      <span>Prot: {{ recipe.macros.prot }}g</span>
      <span>Fat: {{ recipe.macros.fat }}g</span>
      <span>Carbs: {{ recipe.macros.carbs }}g</span>
    </div>

    <div class="recipe-ingredients">
      <strong>Ingredients UUIDs:</strong>
      <ul>
        <li v-for="id in recipe.ingredients" :key="id">{{ id }}</li>
      </ul>
    </div>

    <p class="recipe-description">{{ recipe.description }}</p>
  </div>
</template>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recipe-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.recipe-meta span {
  margin-right: 0.5rem;
  font-size: 0.85rem;
  color: #555;
}

.recipe-macros span {
  margin-right: 0.5rem;
  font-size: 0.85rem;
}

.recipe-ingredients ul {
  margin: 0;
  padding-left: 1rem;
  list-style-type: disc;
}

.recipe-description {
  font-size: 0.9rem;
  color: #333;
}
</style>
