<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  fetchUrl: { type: String, required: true },
  CardComponent: { type: Object, required: true },
  groupByAttr: { type: String, default: 'type' },
  cardPropName: { type: String, required: true }
});

const items = ref([]);
const error = ref(null);

// Fetch items
onMounted(async () => {
  try {
    const res = await fetch(props.fetchUrl);
    const data = await res.json();
    if (data.success) items.value = data.data;
    else error.value = data.error;
  } catch (e) {
    error.value = e.message;
  }
});

// Group items by given attribute
const groupedItems = computed(() => {
  const groups = {};
  items.value.forEach(item => {
    const groupKeys = Array.isArray(item[props.groupByAttr])
      ? item[props.groupByAttr]
      : [item[props.groupByAttr] || 'Autre'];
    groupKeys.forEach(key => {
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
  });
  return groups;
});

// Example for future filters
const filterText = ref('');
const filteredGroupedItems = computed(() => {
  if (!filterText.value) return groupedItems.value;

  const result = {};
  for (const [key, group] of Object.entries(groupedItems.value)) {
    const filtered = group.filter(item =>
      item.name.toLowerCase().includes(filterText.value.toLowerCase())
    );
    if (filtered.length > 0) result[key] = filtered;
  }
  return result;
});
</script>

<template>
  <div class="gallery">
    <div class="gallery-header">
      <input 
        v-model="filterText" 
        type="text" 
        placeholder="Filter items..." 
        class="filter-input"
      />
      <button class="add-btn">Add New</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-else>
      <div v-for="(group, key) in filteredGroupedItems" :key="key" class="gallery-group">
        <h2 class="group-title">{{ key }}</h2>
        <div class="cards-container">
          <component 
            v-for="item in group" 
            :key="item.id" 
            :is="CardComponent" 
            v-bind="{ [cardPropName]: item }"
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
.gallery {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filter-input {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;
  margin-right: 1rem;
}

.add-btn {
  padding: 0.4rem 0.8rem;
  background-color: #002654;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #004080;
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
