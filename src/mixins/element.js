export default {
  mounted() {
    if (window.location.search.match("alchemy_preview_mode=true")) {
      window.addEventListener("message", (evt) => {
        if (evt.data.message === "Alchemy.focusElement") {
          this.focusAlchemyElement(evt.data.element_id)
        }
      })
      this.$el.addEventListener("click", () => {
        this.focusAlchemyElement(this.element.id)
        window.parent.postMessage(
          {
            message: "Alchemy.focusElementEditor",
            element_id: this.element.id,
          },
          "*"
        )
      })
    }
  },
  methods: {
    focusAlchemyElement(id) {
      if (id === this.element.id) {
        this.elementFocused = true
        this.$el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    },
    getIngredient(name) {
      return this.getEssence(name).ingredient
    },
    getEssence(name) {
      return this.element.essences.find((e) => e.role === name) || {}
    },
    componentName(element) {
      const name = element.name
      if (this.$options.components[name]) {
        return name
      }
      return "FallbackElement"
    },
  },
  props: {
    element: {
      type: Object,
      required: true,
      default() {
        return {
          essences: [],
        }
      },
    },
  },
}
