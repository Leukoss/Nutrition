<script setup>
import BaseCard from './BaseCard.vue';

const props = defineProps({
  recipe: { type: Object, required: true }
});
</script>

<template>
  <BaseCard 
    :title="recipe.name" 
    :calories="recipe.calories || 0" 
    :macros="recipe.macros || { prot: 0, fat: 0, carbs: 0 }"
  >
    <template #extra>
      <div class="recipe-ingredients">
        <strong>Ingrédients UUID:</strong>
        <ul>
          <li v-for="id in recipe.ingredients" :key="id">{{ id }}</li>
        </ul>
      </div>
    </template>
  </BaseCard>
</template>
