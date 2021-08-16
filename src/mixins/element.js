import {
  getElementsEssence,
  getElementsIngredient,
  getElementsRichtext,
  getElementsValue,
} from "../utilities"

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
      return getElementsIngredient(this.element, name)
    },
    getRichtext(name) {
      return getElementsRichtext(this.element, name)
    },
    getEssence(name) {
      return getElementsEssence(this.element, name)
    },
    getValue(name) {
      return getElementsValue(this.element, name)
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
