import { frenchRequired } from './directives/frenchRequired';
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import router from './router'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.directive('french-required', frenchRequired);
app.use(createPinia())
app.use(router)

app.mount('#app')
