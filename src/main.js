import { createApp } from 'vue'

import router from './router'
import App from './App.vue'

// Global CSS
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// import { frenchRequired } from './directives/frenchRequired';
// import { createPinia } from 'pinia'

// 

// app.directive('french-required', frenchRequired);
// app.use(createPinia())
