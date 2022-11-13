<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="computedAmount--"
      :disabled="computedAmount == 1"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="productCountInput">
      <input type="text" v-model.number="computedAmount" name="count" id="productCountInput" />
    </label>

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="computedAmount++"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: "amount",
    event: "change-amount",
  },
  props: {
    amount: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  computed: {
    computedAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        if (value > 0) {
          this.$emit("change-amount", value);
        }
      },
    },
  },
};
</script>

<style scoped></style>
