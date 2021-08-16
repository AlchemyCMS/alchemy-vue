import { shallowMount } from "@vue/test-utils"
import AlchemyElement from "../element"

const AlchemyElementComponent = {
  mixins: [AlchemyElement],
  template: `<div class="alchemy-element" />`,
}

beforeEach(() => {
  // Mock the console.warn we use in the element mixin functions
  jest.spyOn(console, "warn").mockImplementation(() => {})
})

describe("Alchemy element mixin", () => {
  it("without element has default object", () => {
    const comp = shallowMount(AlchemyElementComponent, {
      propsData: {
        element: undefined,
      },
    })
    expect(comp.vm.element).toEqual({ essences: [] })
  })

  it("has access to the element", () => {
    const element = {
      name: "content_page",
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
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [],
                essences: [],
              },
            },
          })
          expect(comp.vm.getEssence("foo")).toBeUndefined()
        })
      })

      describe("if ingredient exists", () => {
        it("returns ingredient", () => {
          const ingredient = {
            role: "foo",
            value: "baz",
          }
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [ingredient],
                essences: [],
              },
            },
          })
          expect(comp.vm.getEssence("foo")).toEqual(ingredient)
        })
      })
    })

    describe("if essence does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              ingredients: [],
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
              name: "content_page",
              ingredients: [],
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getEssence("headline")).toEqual(headline)
      })
    })
  })

  describe("getIngredient", () => {
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [],
                essences: [],
              },
            },
          })
          expect(comp.vm.getIngredient("foo")).toBeUndefined()
        })
      })

      describe("if ingredient exists", () => {
        it("returns ingredient", () => {
          const ingredient = {
            role: "foo",
            value: "baz",
          }
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [ingredient],
              },
            },
          })
          expect(comp.vm.getIngredient("foo")).toEqual(ingredient)
        })
      })
    })

    describe("if essence does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
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
              name: "content_page",
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getIngredient("headline")).toEqual("The Headline")
      })
    })
  })

  describe("getRichtext", () => {
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [],
                essences: [],
              },
            },
          })
          expect(comp.vm.getRichtext("foo")).toBeUndefined()
        })
      })

      describe("if ingredient with sanitized_body exists", () => {
        it("returns the ingredients sanitized_body", () => {
          const headline = { role: "headline", sanitized_body: "The Headline" }
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                ingredients: [headline],
              },
            },
          })
          expect(comp.vm.getRichtext("headline")).toEqual("The Headline")
        })
      })

      describe("if essence with body and no sanitized body exists", () => {
        it("returns the ingredients value", () => {
          const headline = { role: "headline", value: "<h1>The Headline</h1>" }
          const comp = shallowMount(AlchemyElementComponent, {
            propsData: {
              element: {
                name: "article",
                essences: [headline],
              },
            },
          })
          expect(comp.vm.getRichtext("headline")).toEqual(
            "<h1>The Headline</h1>"
          )
        })
      })
    })

    describe("if essence does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              essences: [],
            },
          },
        })
        expect(comp.vm.getRichtext("foo")).toBeUndefined()
      })
    })

    describe("if essence with sanitized_body exists", () => {
      it("returns the essences ingredient", () => {
        const headline = { role: "headline", sanitized_body: "The Headline" }
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getRichtext("headline")).toEqual("The Headline")
      })
    })

    describe("if essence with body and no sanitized body exists", () => {
      it("returns the essences ingredient", () => {
        const headline = { role: "headline", body: "<h1>The Headline</h1>" }
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              essences: [headline],
            },
          },
        })
        expect(comp.vm.getRichtext("headline")).toEqual("<h1>The Headline</h1>")
      })
    })
  })

  describe("getValue", () => {
    describe("if ingredient does not exist", () => {
      it("returns undefined", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              ingredients: [],
              essences: [],
            },
          },
        })
        expect(comp.vm.getValue("foo")).toBeUndefined()
      })
    })

    describe("if ingredient exists", () => {
      it("returns the ingredients value", () => {
        const headline = { role: "headline", value: "The Headline" }
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {
              name: "content_page",
              ingredients: [headline],
            },
          },
        })
        expect(comp.vm.getValue("headline")).toEqual("The Headline")
      })
    })
  })

  describe("focusAlchemyElement", () => {
    describe("if id matches elements id", () => {
      it.skip("scrolls element into view", () => {
        const comp = shallowMount(AlchemyElementComponent, {
          propsData: {
            element: {},
          },
          mocks: {
            $el: {},
          },
        })
        const spy = jest.spyOn(comp.vm.$el, "scrollIntoView")
        comp.vm.focusAlchemyElement(1001)
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})
