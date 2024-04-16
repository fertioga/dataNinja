import 'animate.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.css"
import { createApp } from "vue";
import Index from "./Index.vue";

library.add(fas);
const pinia = createPinia()

import "bootstrap/dist/js/bootstrap.js";

createApp(Index)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.mount("#app");