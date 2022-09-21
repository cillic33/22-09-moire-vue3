<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link :to="{name: 'main'}" class="header__info">Каталог</router-link>

      <router-link :to="{name: 'main'}" class="header__logo">
        <img src="img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116"
             height="34">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">0</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
