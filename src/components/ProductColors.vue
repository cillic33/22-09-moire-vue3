<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="(color, index) in colors" :key="color.id">
      <label class="colors__label" :for="'productColorInput'+color.id">
        <input class="colors__radio sr-only"
               type="radio"
               :name="'productColorInput'+productId"
               :id="'productColorInput'+color.id"
               :checked="index === 0"
               @change="modelValue = color"
        >
        <span class="colors__value" :style="{'background-color': color.color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['value', 'colors', 'productId'],
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="stylus">
.colors__value
  outline 1px solid #bfbfbf

.colors__radio:checked ~ .colors__value::before
  border-color var(--border-color)
</style>
