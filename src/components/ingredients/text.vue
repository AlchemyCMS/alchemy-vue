<template>
  <component :is="tag">
    <a
      v-if="linkUrl"
      :href="linkUrl"
      :title="linkTitle"
      :target="linkTarget"
      :class="linkClass"
    >
      {{ value }}
    </a>
    <template v-else>
      {{ value }}
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
