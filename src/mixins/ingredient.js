export default {
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: {
    value() {
      return this.ingredient?.value
    },
    linkUrl() {
      return this.ingredient?.link_url
    },
    linkTarget() {
      return this.ingredient?.link_target === "blank" ? "_blank" : null
    },
    linkTitle() {
      return this.ingredient?.link_title
    },
  },
}
