<template>
  <div class="cart__data">
    <FormFieldText
      v-model="computedData.name"
      :error="errors.name ? errors.name : ''"
      placeholder="Введите ваше полное имя"
      name="name"
      title="ФИО"
    />
    <FormFieldText
      v-model="computedData.address"
      :error="errors.address ? errors.address : ''"
      placeholder="Введите ваш адрес"
      name="address"
      title="Адрес доставки"
    />
    <FormFieldPhone
      v-model="computedData.phone"
      :error="errors.phone ? errors.phone : ''"
      placeholder="Введите ваш телефон"
      name="phone"
      title="Телефон"
    />
    <FormFieldText
      v-model="computedData.email"
      :error="errors.email ? errors.email : ''"
      placeholder="Введи ваш Email"
      name="email"
      title="Email"
      type="email"
    />
    <FormFieldTextarea
      title="Комментарий к заказу"
      name="comments"
      placeholder="Ваши пожелания"
      :error="errors.comment ? errors.comment : ''"
      v-model="computedData.comment"
    />
  </div>
</template>

<script>
import FormFieldText from "@/components/forms/FormFieldText.vue";
import FormFieldTextarea from "@/components/forms/FormFieldTextarea.vue";
import FormFieldPhone from "@/components/forms/FormFieldPhone.vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentData: {},
    };
  },
  components: {
    FormFieldPhone,
    FormFieldText,
    FormFieldTextarea,
  },
  computed: {
    computedData: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit('update:data', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
