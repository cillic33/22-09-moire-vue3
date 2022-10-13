<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: "ProductTabInfo",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
