# moire

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Overlay - https://github.com/ankurk91/vue-loading-overlay
Импорт в нужном компоненте:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Вызов:
<loading :active="isLoading"/>
<button @click.prevent="doAjax">fetch Data</button>


Notifications - https://github.com/euvl/vue-notification
Регистрируется в main.js
Вызов:
<notifications position="top center"
classes="notification"
/>
<button @click.prevent="$notify('Hello user!')">Click for alert</button>


PhoneMaskInput - https://www.npmjs.com/package/vue-phone-mask-input
Импорт в нужном компоненте:
import PhoneMaskInput from "vue-phone-mask-input";
