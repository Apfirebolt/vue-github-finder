import { createApp } from 'vue'
import './style.css'
import router from './routes'
import App from './App.vue'

// AOS imports
import 'aos/dist/aos.css'

const app = createApp(App)
app.use(router)
app.mount('#app');