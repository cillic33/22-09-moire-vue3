<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label" :for="'productColorInput' + color.id">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="'productColorInput' + productId"
          :id="'productColorInput' + color.id"
          :checked="color.id === currentColorId"
          :value="color.id"
          v-model="currentColorId"
        />
        <span class="colors__value" :style="{ 'background-color': color.color.code }"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true,
    },
    colorId: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    currentColorId: {
      get() {
        return this.colorId > 0 ? this.colorId : this.colors[0].id;
      },
      set(value) {
        this.$emit("update:colorId", value);
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
