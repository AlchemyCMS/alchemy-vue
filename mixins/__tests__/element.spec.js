import { shallowMount } from "@vue/test-utils"
import AlchemyElement from "../element"

const AlchemyElementComponent = {
  mixins: [AlchemyElement],
  template: `<div class="alchemy-element" />`,
}

describe("Alchemy element mixin", () => {
  it("has access to the element", () => {
    const element = {
      element_type: "content_page",
      essences: [],
    }
    const comp = shallowMount(AlchemyElementComponent, {
      propsData: {
        element,
      },
    })
    expect(comp.vm.element).toEqual(element)
  })

  describe("getEssence", () => {
    describe("if essence does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              element_type: "content_page",
              essences: [],
            },
          },
        })
        expect(comp.vm.getEssence("foo")).toBeUndefined()
      })
    })

    describe("if essence exists", () => {
      it("returns the essence", () => {
        const headline = { role: "headline" }
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              element_type: "content_page",
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getEssence("headline")).toEqual(headline)
      })
    })
  })

  describe("getIngredient", () => {
    describe("if essence does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              element_type: "content_page",
              essences: [],
            },
          },
        })
        expect(comp.vm.getIngredient("foo")).toBeUndefined()
      })
    })

    describe("if essence exists", () => {
      it("returns the essences ingredient", () => {
        const headline = { role: "headline", ingredient: "The Headline" }
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              element_type: "content_page",
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getIngredient("headline")).toEqual("The Headline")
      })
    })
  })

  describe("focusAlchemyElement", () => {
    describe("if id matches elements id", () => {
      it.skip("scrolls element into view", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {}
          },
          mocks: {
            $el: {}
          }
        })
        const spy = jest.spyOn(comp.vm.$el, "scrollIntoView")
        comp.vm.focusAlchemyElement(1001)
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})
