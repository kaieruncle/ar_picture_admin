import { createApp } from 'vue';
import App from './App.vue';
import { router } from "./router/index";
import pinia from './store/index';
import './style.less';
import 'virtual:svg-icons-register';

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
