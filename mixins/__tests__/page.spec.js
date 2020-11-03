import { shallowMount } from "@vue/test-utils"
import AlchemyPage from "../page"
import FallbackElement from "../../components/FallbackElement"

const AlchemyElementComponent = {
  template: '<div class="alchemy-element" />',
}

const AlchemyPageComponent = {
  mixins: [AlchemyPage],
  template: `
    <div class="alchemy-page">
      <component
        :is="elementType(element)"
        v-for="element in page.elements"
        :key="element.id"
        :element="element"
      />
    </div>
  `,
  components: {
    element_component: AlchemyElementComponent,
  },
}

describe("Alchemy page mixin", () => {
  it("has access to the page", () => {
    const page = {
      page_layout: "content_page",
      elements: [],
    }
    const comp = shallowMount(AlchemyPageComponent, {
      propsData: {
        page,
      },
    })
    expect(comp.vm.page).toEqual(page)
  })

  describe("if element component has been registered", () => {
    it("loads the component", () => {
      const component = shallowMount(AlchemyPageComponent, {
        propsData: {
          page: {
            elements: [{ element_type: "element_component" }],
          },
        },
      })
      expect(
        component.findComponent(AlchemyElementComponent).exists()
      ).toBeTruthy()
    })
  })

  describe("if element component has not been registered", () => {
    it("loads the fallback component", () => {
      const component = shallowMount(AlchemyPageComponent, {
        propsData: {
          page: {
            elements: [{ element_type: "something" }],
          },
        },
      })
      expect(component.findComponent(FallbackElement).exists()).toBeTruthy()
    })
  })
})
