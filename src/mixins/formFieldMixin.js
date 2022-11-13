export default {
  model: {
    prop: 'data',
    event: 'change-data',
  },
  props: {
    data: {
      type: String,
      required: true,
      default: '',
    },
    error: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedData: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit('change-data', value);
      },
    },
  },
};
