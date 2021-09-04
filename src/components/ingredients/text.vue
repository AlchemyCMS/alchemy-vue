<template>
  <component :is="tag">
    <a
      v-if="linkUrl"
      :href="linkUrl"
      :title="linkTitle"
      :target="linkTarget"
      :class="linkClass"
    >
      {{ ingredient.value }}
    </a>
    <template v-else>
      {{ ingredient.value }}
    </template>
  </component>
</template>

<script>
  import Ingredient from "../../mixins/ingredient"

  export default {
    mixins: [Ingredient],
    props: {
      tag: {
        type: String,
        default: "span",
      },
      linkClass: {
        type: String,
        default: null,
      },
    },
  }
</script>
