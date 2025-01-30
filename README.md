# moire

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

При ошибке "Linebreaks":
В PhpStorm выделить главную категорию, в главном меню выбрать File -> File Properties -> LineSeperators -> LF


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


Preloder
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
Use:
<fulfilling-bouncing-circle-spinner
:animation-duration="4000"
:size="30"
:color="'#e02d71'"
/>


Overlay - https://github.com/ankurk91/vue-loading-overlay
Импорт в нужном компоненте:
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Use:
<loading :active="isLoading"/>
<button @click.prevent="doAjax">fetch Data</button>


Notifications - https://github.com/euvl/vue-notification
Регистрируется в main.js
Use:
<notifications position="top center" classes="notification" />
<button @click.prevent="$notify('Hello user!')">Click for alert</button>


PhoneMaskInput - https://www.npmjs.com/package/vue-phone-mask-input
import PhoneMaskInput from "vue-phone-mask-input";
Use:
<PhoneMaskInput
type="tel"
:name="name"
:placeholder="placeholder"
v-model="computedData"
autoDetectCountry
inputClass="form__input"
wrapperClass="form__input-phone-wrapper"
/>
