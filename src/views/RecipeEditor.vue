<script setup>
import { ref, onMounted } from 'vue';

const recipes = ref([]);
const blobs = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    // ------------------ Fetch Blob ------------------
    const blobRes = await fetch('/api/blob-test');
    const blobData = await blobRes.json();
    if (blobData.success) blobs.value = blobData.blobs;
    else error.value = blobData.error;

    // ------------------ Fetch Supabase ------------------
    const supaRes = await fetch('/api/supa-test');
    const supaData = await supaRes.json();
    if (supaData.success) recipes.value = supaData.recipes;
    else error.value = supaData.error;

  } catch (e) {
    error.value = e.message;
  }
});
</script>

<template>
  <div>
    <h2>Blob List</h2>
    <p v-if="error" style="color: red;">Error: {{ error }}</p>
    <ul v-else>
      <li v-for="b in blobs" :key="b.pathname">{{ b.pathname }}</li>
    </ul>

    <h2>Supabase Recipes</h2>
    <ul v-if="recipes.length > 0">
      <li v-for="r in recipes" :key="r.id">{{ r.name }}</li>
    </ul>
    <p v-else>No recipes found</p>
  </div>
</template>
