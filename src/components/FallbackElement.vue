<template>
  <div class="alchemy-fallback-element">
    <h2>I am a dummy {{ element.name }} Alchemy element component</h2>
    <p>
      To replace me register a local Vue component named
      <kbd>{{ element.name }}</kbd> at your
      <kbd>{{ $parent.$options.name || $parent.$options._componentTag }}</kbd>
      component.
    </p>
    <template v-if="element.essences.length">
      <h3>This element has {{ element.essences.length }} essence(s)</h3>
      <ul>
        <li v-for="essence in element.essences" :key="essence.id">
          {{ essence.role }}
        </li>
      </ul>
    </template>
    <template v-if="nestedElements.length">
      <h3>This element has {{ nestedElements.length }} nested element(s)</h3>
      <FallbackElement
        v-for="nested_element in nestedElements"
        :key="nested_element.id"
        :element="nested_element"
      />
    </template>
  </div>
</template>

<script>
  import AlchemyElement from "../mixins/element"

  export default {
    name: "FallbackElement",
    mixins: [AlchemyElement],
    computed: {
      nestedElements() {
        return this.element.nested_elements || this.element.nestedElements
      },
    },
  }
</script>
