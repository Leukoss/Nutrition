import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Recipes',
    component: () => import(/* webpackChunkName: "recipes" */ '../views/Recipes.vue')
  },
  {
    path: '/recipe/new',
    name: 'NewRecipe',
    component: () => import(/* webpackChunkName: "new-recipe" */ '../views/NewRecipe.vue')
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/Recipe.vue'),
    props: true
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/Ingredients.vue'),
    props: true
  },
  {
    path: '/ingredient/:id',
    name: 'Ingredient',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/Ingredient.vue'),
    props: true
  },
  {
    path: '/ingredient/new',
    name: 'NewIngredient',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/NewIngredient.vue'),
    props: true
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/Recipe.vue'),
    props: true
  },
  {
    path: '/planner',
    name: 'Planner',
    component: () => import(/* webpackChunkName: "planner" */ '../views/Planner.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router