<script setup>
import Gallery from '../components/Gallery.vue';
import RecipeCard from '../components/RecipeCard.vue';
</script>

<template>
    <Gallery
    fetch-url="/api/get_table?table=recipes"
    :CardComponent="RecipeCard"
    group-by-attr="recipe_type"
    card-prop-name="recipe"
  />
</template>
