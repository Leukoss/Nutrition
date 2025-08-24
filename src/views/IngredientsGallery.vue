<script setup>
import Gallery from '../components/Gallery.vue';
import IngredientCard from '../components/IngredientCard.vue';
</script>

<template>
  <Gallery
    fetch-url="/api/get_table?table=ingredients"
    :CardComponent="IngredientCard"
    group-by-attr="type"
    card-prop-name="ingredient"
  />
</template>
