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
    getIngredient(name, warn = false) {
      if (this.hasIngredients) {
        if (warn) {
          console.warn(
            `Element "${this.element.name}" has ingredients! We returned an ingredient object instead of a single value. Please use getValue("${name}") or use the value property to get the value of the "${name}" ingredient.`
          )
        }
        return this.element.ingredients.find((i) => i.role === name)
      }
      return this.getEssence(name)?.ingredient
    },
    getRichtext(name) {
      let thing
      if (this.hasIngredients) {
        thing = this.getIngredient(name, false) || {}
      } else {
        thing = this.getEssence(name) || {}
      }
      return thing.sanitized_body || thing.value || thing.body
    },
    getEssence(name) {
      if (this.hasIngredients) {
        console.warn(
          `Element "${this.element.name}" has ingredients! We returned the ingredient object, but please use getIngredient("${name}") instead.`
        )
        return this.getIngredient(name, false)
      }
      return this.element.essences.find((e) => e.role === name)
    },
    getValue(name) {
      return this.getIngredient(name, false)?.value
    },
    componentName(element) {
      const name = element.name
      if (this.$options.components[name]) {
        return name
      }
      return "FallbackElement"
    },
  },
  computed: {
    hasIngredients() {
      return this.element.ingredients && this.element.ingredients.length > 0
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
