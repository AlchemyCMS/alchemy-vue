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
        :is="componentName(element)"
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

  describe("elementByName", () => {
    describe("if element exists", () =>{
      it("returns element", () => {
        const element = { name: "header" }
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements: [element],
            },
          },
        })
        expect(component.vm.elementByName("header")).toEqual(element)

      })
    })

    describe("if element does not exist", () =>{
      it("returns undefined", () => {
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements: [],
            },
          },
        })
        expect(component.vm.elementByName("foo")).toBeUndefined()
      })
    })
  })

  describe("elementsByName", () => {
    describe("if element exists", () =>{
      it("returns element", () => {
        const elements = [{ name: "header" }]
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements,
            },
          },
        })
        expect(component.vm.elementsByName("header")).toEqual(elements)

      })
    })

    describe("if element does not exist", () =>{
      it("returns undefined", () => {
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements: [],
            },
          },
        })
        expect(component.vm.elementsByName("foo")).toEqual([])
      })
    })
  })

  describe("componentName", () => {
    describe("if element component has been registered", () => {
      it("returns the component name", () => {
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements: [{ name: "element_component" }],
            },
          },
        })
        expect(
          component.findComponent(AlchemyElementComponent).exists()
        ).toBeTruthy()
      })
    })

    describe("if element component has not been registered", () => {
      it("returns the fallback component name", () => {
        const component = shallowMount(AlchemyPageComponent, {
          propsData: {
            page: {
              elements: [{ name: "something" }],
            },
          },
        })
        expect(component.findComponent(FallbackElement).exists()).toBeTruthy()
      })
    })
  })
})
