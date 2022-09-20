<template>
  <div>

    <BaseHeader/>

    <router-view/>

    <BaseFooter/>

  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  components: { BaseHeader, BaseFooter },
};
</script>

<style lang="stylus">
.content
  min-height calc(100vh - 442px)

.note
  &__error
    color red

  &__centered
    text-align center
    font-size 14px

    .fulfilling-bouncing-circle-spinner
      margin 0 auto

.transition-fade-duration
  animation-duration: 0.3s
</style>
