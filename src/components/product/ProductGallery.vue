<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img :src="currentUrl" :alt="title" />
    </div>
    <ul class="pics__list">
      <li class="pics__item" v-for="(color, n) in safeColors" :key="n">
        <a
          class="pics__link"
          :class="[color.id === currentColorId ? 'pics__link--current' : '']"
          @click.prevent="currentColorId = color.id"
        >
          <img :src="color.gallery[0].file.url" :alt="title" />
        </a>
      </li>
    </ul>
  </div>
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
    title: {
      type: String,
      required: false,
      default: "Товар из каталога Moire",
    },
  },
  computed: {
    safeColors() {
      return this.colors.map((item) => ({
        ...item,
        gallery: item.gallery ? item.gallery : [{ file: { url: "/moire/img/not-img.webp" } }],
      }));
    },
    currentColorId: {
      get() {
        return this.colorId > 0 ? this.colorId : this.safeColors[0].id;
      },
      set(value) {
        this.$emit("update:colorId", value);
      },
    },
    currentUrl() {
      const currentColor = this.safeColors.find((c) => c.id === this.currentColorId);
      return currentColor.gallery[0].file.url;
    },
  },
};
</script>

<style scoped lang="stylus">
.pics
  &__wrapper
    height 400px
    display flex
    align-items center
    justify-content center
    background #fbfbfb

    > img
      max-height 100%

  &__item
    height 120px

  &__link
    width 100%
    height 120px
    display flex
    align-items center
    justify-content center
    background #fbfbfb

    > img
      height 120px
      object-fit cover

  &__link
    cursor pointer
</style>
