<template>
  <video
    v-if="muted"
    muted
    :controls="controls"
    :autoplay="autoplay"
    :loop="loop"
    :preload="preload"
    :poster="poster"
  >
    <source :src="source.src" :type="source.type" />
  </video>
  <video
    v-else
    :controls="controls"
    :autoplay="autoplay"
    :loop="loop"
    :preload="preload"
    :poster="poster"
  >
    <source :src="source.src" :type="source.type" />
  </video>
</template>

<script>
  import Ingredient from "../../mixins/ingredient"

  export default {
    mixins: [Ingredient],
    props: {
      poster: {
        type: String,
        default: null,
      },
    },
    computed: {
      source() {
        return { src: this.value, type: this.ingredient.video_mime_type }
      },
      controls() {
        return "controls" in this.ingredient ? this.ingredient.controls : true
      },
      muted() {
        return "muted" in this.ingredient ? this.ingredient.muted : true
      },
      autoplay() {
        return "autoplay" in this.ingredient ? this.ingredient.autoplay : false
      },
      loop() {
        return "loop" in this.ingredient ? this.ingredient.loop : false
      },
      preload() {
        return this.ingredient?.preload || "auto"
      },
    },
  }
</script>
