import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import "primeicons/primeicons.css";
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app.directive('tooltip', Tooltip);
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark' /*'system'*/,
            cssLayer: false,
        }
    },
 });

app.mount("#app");
