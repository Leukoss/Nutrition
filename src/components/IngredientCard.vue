<script setup>
import BaseCard from './BaseCard.vue';

const props = defineProps({
  ingredient: { type: Object, required: true }
});
</script>

<template>
  <BaseCard 
    :title="ingredient.name" 
    :calories="ingredient.calories || 0" 
    :macros="ingredient.macros || { prot: 0, fat: 0, carbs: 0 }"
  >
    <template #extra>
      <div class="ingredient-vitamins" v-if="ingredient.vitamins?.length">
        <strong>Vitamines :</strong>
        <ul>
          <li v-for="vit in ingredient.vitamins" :key="vit">{{ vit }}</li>
        </ul>
      </div>
    </template>
  </BaseCard>
</template>
