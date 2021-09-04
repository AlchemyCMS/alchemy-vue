<template>
  <picture>
    <a v-if="linkUrl" :href="linkUrl" :title="linkTitle" :target="linkTarget">
      <img
        :class="imageClass"
        :src="src"
        :alt="altText"
        :title="title"
        @error="$emit('error')"
      />
      <figcaption v-if="caption" :class="captionClass">
        {{ caption }}
      </figcaption>
    </a>
    <template v-else>
      <img
        :class="imageClass"
        :src="src"
        :alt="altText"
        :title="title"
        @error="$emit('error')"
      />
      <figcaption v-if="caption" :class="captionClass">
        {{ caption }}
      </figcaption>
    </template>
  </picture>
</template>

<script>
  import Ingredient from "../../mixins/ingredient"

  export default {
    mixins: [Ingredient],
    props: {
      imageClass: {
        type: String,
        default: null,
      },
      captionClass: {
        type: String,
        default: null,
      },
    },
    computed: {
      src() {
        return this.ingredient?.value
      },
      caption() {
        return this.ingredient?.caption
      },
      title() {
        return this.ingredient?.title
      },
      altText() {
        return this.ingredient?.alt_text
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
</script>
