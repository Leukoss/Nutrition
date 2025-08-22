<script setup>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ref } from 'vue';

const ingredientData = ref({
  name: '',
  calories: 0,
  macros: {
    protein: 0,
    carbs: 0,
    fats: 0,
  },
  vitamins: [],
});

const availableVitamins = [
  'Vitamine A',
  'Vitamine B1',
  'Vitamine B2',
  'Vitamine B3',
  'Vitamine B5',
  'Vitamine B6',
  'Vitamine B7',
  'Vitamine B9',
  'Vitamine B12',
  'Vitamine C',
  'Vitamine D',
  'Vitamine E',
  'Vitamine K',
];

const password = ref('');
const SECRET_PASSWORD = import.meta.env.VITE_SECRET_PASSWORD;

async function addIngredient() {
  if (password.value !== SECRET_PASSWORD) {
    alert('Incorrect password.');
    return;
  }
  try {
    await addDoc(collection(db, 'ingredients'), ingredientData.value);
    alert('Ingredient added successfully!');
    // Reset form fields
    ingredientData.value = {
      name: '',
      calories: 0,
      macros: {
        proteins: 0,
        fats: 0,
        carbs: 0,
      },
      vitamins: [],
    };
    password.value = '';
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('Error adding ingredient.');
    }
}
</script>

<template>
  <div class="add-ingredient-form">
    <h2>Ajouter un nouvel Ingrédient</h2>
    <form @submit.prevent="addIngredient">
      <div class="form-group">
        <label for="name">Nom de l'Ingrédient:</label>
        <input 
          type="text" 
          id="name" 
          v-model="ingredientData.name" 
          required 
          v-french-required="'Veuillez renseigner le nom de l\'ingrédient.'"
        />
      </div>

      <div class="form-group">
        <label for="calories">Calories (pour 100g) :</label>
        <input 
          type="tel" 
          id="calories" 
          v-model.number="ingredientData.calories" 
          required 
          v-french-required="'Veuillez renseigner le nombre de calories.'"
        />
      </div>

      <h3>Macronutriments (pour 100g)</h3>
      <div class="form-group">
        <label for="proteins">Protéines (g) :</label>
        <input 
          type="tel" 
          id="proteins" 
          v-model.number="ingredientData.macros.proteins" 
          required 
          v-french-required="'Veuillez renseigner la quantité de protéines.'"
        />
      </div>
      <div class="form-group">
        <label for="fats">Lipides (g):</label>
        <input 
          type="tel" 
          id="fats" 
          v-model.number="ingredientData.macros.fats" 
          required 
          v-french-required="'Veuillez renseigner la quantité de lipides.'"
        />
      </div>
      <div class="form-group">
        <label for="carbs">Glucides (g):</label>
        <input 
          type="tel" 
          id="carbs" 
          v-model.number="ingredientData.macros.carbs" 
          required 
          v-french-required="'Veuillez renseigner la quantité de glucides.'"
        />
      </div>

      <h3>Vitamines (pour 100g)</h3>

      <div class="checkbox-group">
        <div v-for="vitamin in availableVitamins" :key="vitamin" class="checkbox-item">
          <input 
            type="checkbox" 
            :id="`vitamin-${vitamin}`" 
            :value="vitamin" 
            v-model="ingredientData.vitamins" 
          />
          <label :for="`vitamin-${vitamin}`">{{ vitamin }}</label>
        </div>
      </div>

      <div class="form-group password-group">
        <label for="password">Mot de Passe :</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          v-french-required="'Veuillez renseigner votre mot de passe.'"
        />
      </div>

      <button type="submit">Ajouter le nouvel Ingrédient</button>
    </form>
  </div>
</template>

<style scoped>
.add-ingredient-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 38, 84, 0.15);
  border-left: 6px solid #002654;
  transition: transform 0.3s ease;
}

.add-ingredient-form:hover {
  transform: translateY(-3px);
}

.add-ingredient-form h2 {
  color: #002654;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #ed2939;
  display: inline-block;
  padding-bottom: 0.3rem;
}

.add-ingredient-form h3 {
  color: #002654;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  border-left: 4px solid #ed2939;
  padding-left: 0.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #002654;
  margin-bottom: 0.4rem;
}

.form-group input,
.form-group select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #002654;
  outline: none;
  box-shadow: 0 0 6px rgba(0, 38, 84, 0.3);
}

small {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.3rem;
}

.password-group input {
  border-color: #ed2939;
}

button[type="submit"] {
  display: block;
  width: 100%;
  background-color: #002654;
  color: #fff;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="submit"]:hover {
  background-color: #ed2939;
  transform: scale(1.02);
}

button[type="submit"]:active {
  transform: scale(0.98);
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f8f8f8;
  margin-bottom: 1.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  flex: 1 1 45%; /* two columns on larger screens */
}

.checkbox-item input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  accent-color: #002654;
}

.checkbox-item label {
  font-weight: 400;
  color: #333;
  margin: 0;
  cursor: pointer;
}

/* 📱 Mobile responsiveness */
@media (max-width: 768px) {
  .add-ingredient-form {
    padding: 1.2rem;
    margin: 1rem;
  }

  .add-ingredient-form h2 {
    font-size: 1.5rem;
  }

  .add-ingredient-form h3 {
    font-size: 1.1rem;
  }

  button[type="submit"] {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .add-ingredient-form {
    padding: 0.8rem;
    margin: 0.5rem;
    border-left: 4px solid #002654;
  }

  .add-ingredient-form h2 {
    font-size: 1.2rem;
  }

  .add-ingredient-form h3 {
    font-size: 1rem;
  }

  .form-group input,
  .form-group select,
  button[type="submit"] {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  .checkbox-group {
    flex-direction: column; /* stack vertically */
    gap: 0.4rem;
  }

  .checkbox-item {
    flex: 1 1 100%; /* full width per checkbox */
  }
}
</style>