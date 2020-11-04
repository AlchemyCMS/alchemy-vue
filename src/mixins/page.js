import FallbackElement from "../components/FallbackElement.vue"

export default {
  components: { FallbackElement },
  methods: {
    elementType(element) {
      const name = element.element_type
      if (this.$options.components[name]) {
        return name
      }
      return "FallbackElement"
    },
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
}
