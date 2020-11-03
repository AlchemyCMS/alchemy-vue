import { shallowMount } from "@vue/test-utils"
import FallbackElement from "../FallbackElement"

function getComponent() {
  return shallowMount(FallbackElement, {
    propsData: {
      element: {
        element_type: "main_header",
        essences: [
          {
            role: "headline",
          },
        ],
        nested_elements: [
          {
            element_type: "header",
          },
        ],
      },
    },
  })
}

describe("FallbackElement", () => {
  it("displays the element type", () => {
    const component = getComponent()
    expect(component.text()).toContain(
      "I am a dummy main_header Alchemy element component",
    )
  })

  it("lists all essences by name", () => {
    const component = getComponent()
    expect(component.text()).toContain("This element has 1 essence(s)")
    expect(component.text()).toContain("headline")
  })

  it("lists all nested elements as FallbackElement", () => {
    const component = getComponent()
    expect(component.findComponent(FallbackElement).exists()).toBeTruthy()
  })
})
