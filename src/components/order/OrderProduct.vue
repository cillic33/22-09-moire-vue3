<template>
  <li class="cart__order">
    <h3>{{ item.product.title }} x {{ item.quantity }}</h3>
    <b>{{ computedPrice | numberFormat }} ₽</b>
    <div class="cart__order-props">
      <span>Цвет: {{ item.color.color.title }}</span>
      <span>Размер: {{ item.size.title }}</span>
      <span>Артикул: {{ item.product.id }}</span>
    </div>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    numberFormat,
  },
  computed: {
    computedPrice() {
      return this.item.price * this.item.quantity;
    },
  },
};
</script>

<style scoped lang="stylus">
.cart
  &__order
    &-props
      display flex
      flex-direction column
      gap 4px
</style>
