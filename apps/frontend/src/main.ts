import './styles/index.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#root');
