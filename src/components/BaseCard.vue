<script setup>
const props = defineProps({
  title: { type: String, required: true },
  calories: { type: [Number, String], default: null },
  macros: {
    type: Object,
    default: () => ({ prot: 0, fat: 0, carbs: 0 })
  }
});
</script>

<template>
  <div class="base-card">
    <h3 class="base-title">{{ title }}</h3>

    <div class="base-image">
      <slot name="image">
        <p>Image manquante</p>
      </slot>
    </div>

    <div class="divider-thin"></div>

    <div v-if="calories !== null || macros" class="nutrition-container">
      <div v-if="calories !== null" class="calories-container">
        <strong>Calories:</strong> {{ calories }} kcal
      </div>
      <div v-if="macros" class="macros-container">
        <span><strong>Protéines:</strong> {{ macros.prot || 0 }} g</span>
        <span><strong>Lipides:</strong> {{ macros.fat || 0 }} g</span>
        <span><strong>Glucides:</strong> {{ macros.carbs || 0 }} g</span>
      </div>
    </div>

    <div class="divider-thin"></div>

    <slot name="extra"></slot>
  </div>
</template>

<style scoped>
.base-card {
  border-left: 6px solid #002654;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 38, 84, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.base-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 38, 84, 0.15);
}

.base-title {
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

.base-image {
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

.nutrition-container {
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
</style>
