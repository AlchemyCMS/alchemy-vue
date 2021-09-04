import { shallowMount } from "@vue/test-utils"
import Richtext from "../richtext.vue"

function getComponent(
  ingredient = {
    value: "<p>Hello world <script>alert('Hack')</script></p>",
    sanitized_body: "<p>Hello world</p>",
  },
  tag = undefined,
) {
  return shallowMount(Richtext, {
    propsData: {
      ingredient,
      tag,
    },
  })
}

describe("Richtext", () => {
  describe("if no tag is given", () => {
    it("div tag is used", () => {
      const wrapper = getComponent()

      expect(wrapper.find("div").exists()).toBeTruthy()
    })
  })

  describe("if a tag is given", () => {
    it("this tag is used", () => {
      const wrapper = getComponent(undefined, "section")

      expect(wrapper.find("section").exists()).toBeTruthy()
    })
  })

  describe("with sanitized body", () => {
    it("displays sanitized html", () => {
      const wrapper = getComponent()

      expect(wrapper.find("p").exists()).toBeTruthy()
      expect(wrapper.find("script").exists()).toBeFalsy()
    })
  })

  describe("without sanitized body", () => {
    it("displays unsanitized value", () => {
      const wrapper = getComponent({
        value: "<p>Hello world <script>alert('Hack')</script></p>",
      })

      expect(wrapper.find("p").exists()).toBeTruthy()
      expect(wrapper.find("script").exists()).toBeTruthy()
    })
  })
})
