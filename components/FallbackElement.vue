<template>
  <div class="alchemy-fallback-element">
    <h2>I am a dummy {{ element.element_type }} Alchemy element component</h2>
    <p>
      To replace me put a Vue component into
      <kbd>~/components/Alchemy/Elements/</kbd>
      and register it as local component.
    </p>
    <template v-if="element.essences.length">
      <h3>This element has {{ element.essences.length }} essence(s)</h3>
      <ul>
        <li v-for="essence in element.essences" :key="essence.id">
          {{ essence.role }}
        </li>
      </ul>
    </template>
    <template v-if="element.nested_elements.length">
      <h3>
        This element has {{ element.nested_elements.length }} nested element(s)
      </h3>
      <FallbackElement
        v-for="nested_element in element.nested_elements"
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
  }
</script>
