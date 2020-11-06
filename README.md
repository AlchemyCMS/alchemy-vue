# AlchemyCMS mixins for VueJS

[![Build Status](https://travis-ci.com/AlchemyCMS/alchemy-vue.svg?branch=main)](https://travis-ci.com/AlchemyCMS/alchemy-vue)
[![npm version](https://badge.fury.io/js/%40alchemy_cms%2Fvue.svg)](https://badge.fury.io/js/%40alchemy_cms%2Fvue)

[VueJS](https://vuejs.org) mixins for rendering content from [AlchemyCMS](https://alchemy-cms.com)

## Install

```
yarn add @alchemy_cms/vue
```

## Usage

### In a page component

```js
import { AlchemyPage } from "@alchemy_cms/vue"

export default {
  mixins: [AlchemyPage],
}
```

You now have acces to the `page` prop and its `elements`. Also you have access to the `componentName()` method that you can use to dynamically render element components.

```html
<template>
  <div :class="page.page_layout">
    <component
      :is="componentName(element)"
      v-for="element in page.elements"
      :key="element.id"
      :element="element"
    />
  </div>
</template>

<script>
  import { AlchemyPage } from "@alchemy_cms/vue"
  import MainHeader from "~/alchemy/elements/main_header"
  import TextBlock from "~/alchemy/elements/text_block"

  export default {
    components: {
      main_header: MainHeader,
      text_block: TextBlock,
    },
    mixins: [AlchemyPage],
  }
</script>
```

_**Note** you need to pass the data into the components `page` prop either by fetching it from the Alchemy API or by erb interpolation._

### In an element component

```js
import { AlchemyElement } from "@alchemy_cms/vue"

export default {
  mixins: [AlchemyElement],
}
```

With this mixin you have acces to the `element` prop and its `ingredients`.

Also you have access to the `getIngredient()` and `getEssence()` methods that you can use to pass content from Alchemy objects into your components props.

```html
<template>
  <Container>
    <Image :src="imageUrl" :alt="imageAlt" />
    <Paragraph class="text" v-html="text" />
  </Container>
</template>

<script>
  import { AlchemyElement } from "@alchemy_cms/vue"
  import Container from "~/components/Container"
  import Image from "~/components/Image"
  import Paragraph from "~/components/Paragraph"

  export default {
    components: { Container, Image, Paragraph },
    mixins: [AlchemyElement],
    computed: {
      imageUrl() {
        return this.getIngredient("picture")
      },
      altText() {
        return this.getEssence("picture")?.alt_text
      },
      text() {
        return this.getIngredient("text")
      },
    },
  }
</script>
```

_**Note** you need to pass the data into the components `element` prop either by fetching it from the Alchemy API, by passing it from a page component (see example above) or by erb interpolation._
