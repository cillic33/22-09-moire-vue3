<template>
  <div>
    <div v-for="(item, index) in gallery" :key="index">
      <img :src="item.file.url" :alt="title" v-if="index === 0">
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'color'],
  computed: {
    gallery() {
      return this.color.gallery ? this.color.gallery : [{ file: { url: '/moire/img/not-img.webp' } }];
    },
  },
};
</script>

<style scoped>

</style>
