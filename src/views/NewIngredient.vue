<script setup>
import { ref } from 'vue';

const ingredientData = ref({
  name: '',
  calories: 0,
  macros: {
    proteins: 0,
    carbs: 0,
    fats: 0,
  },
  vitamins: [],
  image: null,
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

// Refs for image handling
const ingredientImage = ref(null);
const imagePreviewUrl = ref(null);

// Handle file selection
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    ingredientImage.value = file;
    imagePreviewUrl.value = URL.createObjectURL(file);
  } else {
    ingredientImage.value = null;
    imagePreviewUrl.value = null;
  }
}

// Upload the image to Vercel Blob via your API route
async function uploadImage() {
  if (!ingredientImage.value) return null;
  const file = ingredientImage.value;

  try {
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image.');
    }

    const blob = await response.json();
    return blob.url;
  } catch (e) {
    console.error('Error uploading image:', e);
    alert('Error uploading image.');
    return null;
  }
}

// Refactored addIngredient function to save to Supabase
async function addIngredient() {
  if (password.value !== SECRET_PASSWORD) {
    console.log('Mot de passe entré :', password.value);
    console.log('Mot de passe secret attendu :', SECRET_PASSWORD);

    alert('Mot de passe incorrect.');
    return;
  }

  try {
    // 1. Upload the image first and get its URL
    const imageUrl = await uploadImage();
    console.log('URL de l\'image Vercel Blob:', imageUrl);

    if (!imageUrl) {
      return;
    }
    ingredientData.value.image = imageUrl;

    // 2. Send the full ingredient data to your new Supabase API route
    const response = await fetch(`/api/add-ingredient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientData.value),
    });
    
    if (!response.ok) {
      throw new Error('Échec de l\'ajout de l\'ingrédient à la base de données.');
    }

    alert('Ingrédient ajouté avec succès !');

    // Reset form fields
    ingredientData.value = {
      name: '',
      calories: 0,
      macros: {
        protein: 0,
        fats: 0,
        carbs: 0,
      },
      vitamins: [],
      image: null,
    };
    ingredientImage.value = null;
    imagePreviewUrl.value = null;
    password.value = '';
  } catch (e) {
    console.error('Erreur lors de l\'ajout de l\'ingrédient:', e);
    alert('Erreur lors de l\'ajout de l\'ingrédient.');
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

      <div class="form-group image-upload-group">
        <label for="image">Image de l'Ingrédient:</label>
        <label for="image" class="image-drop-zone">
          <input type="file" id="image" @change="handleFileChange" accept="image/*" />
          <p v-if="!imagePreviewUrl" class="placeholder">
            <i>Insérer votre image ici</i>
          </p>
          <div v-if="imagePreviewUrl" class="image-preview">
            <img :src="imagePreviewUrl" alt="Aperçu de l'image" />
          </div>
        </label>
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

/* Add this new section for the image drop zone */
.image-drop-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* Adjust height as needed */
  width: 100%;
  border: 2px dashed #002654;
  border-radius: 8px;
  background-color: #f0f8ff; /* Light blue color */
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.image-drop-zone:hover {
  background-color: #e6f0f7; /* Slightly darker on hover */
  border-color: #ed2939;
}

/* Hide the actual file input */
.image-drop-zone input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.image-drop-zone .placeholder {
  font-style: italic;
  color: #888;
  padding: 1rem;
  margin: 0;
}

.image-drop-zone .image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px; /* A little padding around the image */
}

.image-drop-zone .image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 5px;
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