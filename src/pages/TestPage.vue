<template>
  <main class="content container">
    <!-- Overlay - регистрируется в каждом компоненте -->
    <!-- https://github.com/ankurk91/vue-loading-overlay -->
    <loading :active="isLoading"/>
    <button @click.prevent="doAjax">fetch Data 5s</button>
    <br><br>

    <!-- Notifications - регистрируется в main.js -->
    <!-- https://github.com/euvl/vue-notification -->
    <notifications position="top center"
                   classes="notification"
    />
    <button @click.prevent="$notify('Hello user!')">Click for alert</button>
  </main>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>

</style>
