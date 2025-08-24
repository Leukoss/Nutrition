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

    <div class="recipe-image">
      <p>Image manquante</p>
    </div>
    <div class="divider-thin"></div>

    <!-- Nutritional information containers -->
    <div class="recipe-nutrition">
      <div class="calories-container">
        <strong>Calories:</strong> {{ recipe.calories }} kcal
      </div>
      <div class="macros-container">
        <span><strong>Protéines:</strong> {{ recipe.macros.prot }} g</span>
        <span><strong>Lipides:</strong> {{ recipe.macros.fat }} g</span>
        <span><strong>Glucides:</strong> {{ recipe.macros.carbs }} g</span>
      </div>
    </div>
    <div class="divider-thin"></div>

    <!-- Ingredients list -->
    <div class="recipe-ingredients">
      <strong>Ingrédients UUID:</strong>
      <ul>
        <li v-for="id in recipe.ingredients" :key="id">{{ id }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  border-left: 6px solid #002654;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 38, 84, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  width: 100%; /* take full width of grid column */
  box-sizing: border-box;
}

.recipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 38, 84, 0.15);
}

.recipe-title {
  font-weight: bold;
  font-size: 1.3rem;
  color: #002654;
  border-bottom: 2px solid #ed2939;
  display: inline-block;
  padding-bottom: 0.2rem;
  margin-bottom: 0.5rem;
}

.divider-thin {
  height: 1px;
  background-color: #ed2939;
  width: 100%;
  margin: 0.3rem 0;
}

.recipe-image {
  width: 100%;
  min-height: 150px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-style: italic;
}

.recipe-nutrition {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.calories-container {
  background-color: #f0f4ff;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-weight: 500;
}

.macros-container {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  background-color: #fff0f0;
  font-size: 0.85rem;
}

.recipe-ingredients ul {
  margin: 0.2rem 0;
  padding-left: 1rem;
  list-style-type: disc;
  font-size: 0.85rem;
  color: #333;
}
</style>
