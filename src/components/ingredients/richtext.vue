<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <component :is="tag" v-html="content" />
</template>

<script>
  import Ingredient from "../../mixins/ingredient"

  export default {
    mixins: [Ingredient],
    props: {
      tag: {
        type: String,
        default: "div",
      },
    },
    computed: {
      content() {
        return this.ingredient?.sanitized_body || this.ingredient?.value
      },
    },
  }
</script>
