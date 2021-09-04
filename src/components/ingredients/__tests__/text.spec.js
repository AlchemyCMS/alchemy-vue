import { shallowMount } from "@vue/test-utils"
import Text from "../text.vue"

function getComponent(
  ingredient = {
    value: "Hello world",
  },
  tag = undefined,
  linkClass = undefined,
) {
  return shallowMount(Text, {
    propsData: {
      ingredient,
      tag,
      linkClass,
    },
  })
}

describe("Text", () => {
  describe("if no tag is given", () => {
    it("div tag is used", () => {
      const wrapper = getComponent()

      expect(wrapper.find("span").exists()).toBeTruthy()
    })
  })

  describe("if a tag is given", () => {
    it("this tag is used", () => {
      const wrapper = getComponent(undefined, "p")

      expect(wrapper.find("p").exists()).toBeTruthy()
    })
  })

  it("displays the text value", () => {
    const wrapper = getComponent()

    expect(wrapper.text()).toBe("Hello world")
  })

  describe("if a link is given", () => {
    it("has a link", () => {
      const wrapper = getComponent({
        value: "Hello world",
        link_url: "http://example.com",
      })

      expect(wrapper.find("span a[href]").exists()).toBeTruthy()
    })
  })

  describe("if a link target is given", () => {
    it("link has target", () => {
      const wrapper = getComponent({
        value: "Hello world",
        link_url: "http://example.com",
        link_target: "blank",
      })

      expect(
        wrapper.find("span a[href][target='_blank']").exists(),
      ).toBeTruthy()
    })
  })

  describe("if a link title is given", () => {
    it("link has title", () => {
      const wrapper = getComponent({
        value: "Hello world",
        link_url: "http://example.com",
        link_title: "Nice cat",
      })

      expect(
        wrapper.find("span a[href][title='Nice cat']").exists(),
      ).toBeTruthy()
    })
  })

  describe("if linkClass is given", () => {
    it("link has class", () => {
      const wrapper = getComponent(
        {
          value: "Hello world",
          link_url: "http://example.com",
        },
        undefined,
        "link-class",
      )
      expect(wrapper.find("a.link-class").exists()).toBeTruthy()
    })
  })
})
