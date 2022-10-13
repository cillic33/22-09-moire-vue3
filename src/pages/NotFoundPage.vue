<template>
  <div class="content container">
    <div class="content__top">
      <BaseBreadcrumbs
        :pages="[
          { title: 'Каталог', name: 'main' },
          { title: 'Страница не найдена', name: '' },
        ]"
      ></BaseBreadcrumbs>
    </div>

    Страница не найдена.<br />
    <router-link :to="{ name: 'main' }">Вернуться в каталог</router-link>
  </div>
</template>

<script>
import BaseBreadcrumbs from "@/components/base/BaseBreadcrumbs.vue";

export default {
  components: {
    BaseBreadcrumbs,
  },
};
</script>

<style scoped></style>
