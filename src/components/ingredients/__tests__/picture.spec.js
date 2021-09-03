import { shallowMount } from "@vue/test-utils"
import AlchemyPicture from "../picture.vue"

function getComponent(
  ingredient = {
    value: "https://source.unsplash.com/random",
  },
  captionClass = null,
  imageClass = null,
) {
  return shallowMount(AlchemyPicture, {
    propsData: {
      ingredient,
      captionClass,
      imageClass,
    },
  })
}

describe("AlchemyPicture", () => {
  it("displays an image", () => {
    const wrapper = getComponent()

    expect(wrapper.find("picture img[src]").exists()).toBeTruthy()
  })

  describe("if a title is given", () => {
    it("image has a title", () => {
      const wrapper = getComponent({
        value: "https://source.unsplash.com/random",
        title: "Some title",
      })

      expect(wrapper.find("img[title='Some title']").exists()).toBeTruthy()
    })
  })

  describe("if a caption is given", () => {
    it("displays the caption", () => {
      const wrapper = getComponent({
        value: "https://source.unsplash.com/random",
        caption: "Some caption",
      })

      expect(wrapper.find("figcaption").exists()).toBeTruthy()
    })
  })

  describe("if a link is given", () => {
    it("has a link", () => {
      const wrapper = getComponent({
        value: "https://source.unsplash.com/random",
        link_url: "http://example.com",
      })

      expect(wrapper.find("picture a[href] img[src]").exists()).toBeTruthy()
    })
  })

  describe("if a link target is given", () => {
    it("link has target", () => {
      const wrapper = getComponent({
        value: "https://source.unsplash.com/random",
        link_url: "http://example.com",
        link_target: "blank",
      })

      expect(
        wrapper.find("picture a[href][target='_blank']").exists(),
      ).toBeTruthy()
    })
  })

  describe("if a link title is given", () => {
    it("link has title", () => {
      const wrapper = getComponent({
        value: "https://source.unsplash.com/random",
        link_url: "http://example.com",
        link_title: "Nice cat",
      })

      expect(
        wrapper.find("picture a[href][title='Nice cat']").exists(),
      ).toBeTruthy()
    })
  })

  describe("if a captionClass is given", () => {
    it("caption has class", () => {
      const wrapper = getComponent(
        {
          value: "https://source.unsplash.com/random",
          caption: "Some caption",
        },
        "caption-class",
      )
      expect(wrapper.find("figcaption.caption-class").exists()).toBeTruthy()
    })
  })

  describe("if a imageClass is given", () => {
    it("image has class", () => {
      const wrapper = getComponent(
        {
          value: "https://source.unsplash.com/random",
        },
        null,
        "image-class",
      )
      expect(wrapper.find("img.image-class").exists()).toBeTruthy()
    })
  })
})
