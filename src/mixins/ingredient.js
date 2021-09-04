export default {
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: {
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
