import { createRouter, createWebHistory } from 'vue-router'

// Import views
import RecipesGallery from '@/views/RecipesGallery.vue'
import RecipeSingle from '@/views/RecipeSingle.vue'
import IngredientsGallery from '@/views/IngredientsGallery.vue'
import IngredientSingle from '@/views/IngredientSingle.vue'
import IngredientEditor from '@/views/IngredientEditor.vue'
import RecipeEditor from '@/views/RecipeEditor.vue'
import MealPlanner from '@/views/MealPlanner.vue'

const routes = [
  // Recipes
  {path: '/recipes', name: 'recipes-gallery', component: RecipesGallery},
  {path: '/recipes/:id', name: 'recipe-single', component: RecipeSingle, props: true},
  {path: '/recipes/edit/:id?', name: 'recipe-editor', component: RecipeEditor, props: true},

  // Ingredients
  {path: '/ingredients', name: 'ingredients-gallery', component: IngredientsGallery},
  {path: '/ingredients/:id', name: 'ingredient-single', component: IngredientSingle, props: true},
  {path: '/ingredients/edit/:id?', name: 'ingredient-editor', component: IngredientEditor, props: true},

  // Meal Planner
  {path: '/meal-planner', name: 'meal-planner', component: MealPlanner},

  // Default/Catch-all 404s -> redirect to recipes
  { path: '/:pathMatch(.*)*', redirect: '/recipes' },
  { path: '/', redirect: '/recipes' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router