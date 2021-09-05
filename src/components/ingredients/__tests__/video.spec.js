import { shallowMount } from "@vue/test-utils"
import Video from "../video.vue"

function getComponent(
  ingredient = {
    value: "https://vimeo.com/12345678",
    video_mime_type: "video/mp4",
  },
  poster = null,
) {
  return shallowMount(Video, {
    propsData: {
      ingredient,
      poster,
    },
  })
}

describe("Video", () => {
  it("displays a video with source", () => {
    const wrapper = getComponent()
    expect(
      wrapper.find("video source[src][type='video/mp4']").exists(),
    ).toBeTruthy()
  })

  it("displays a poster if given", () => {
    const wrapper = getComponent(undefined, "https://unsplash.com/random")
    expect(
      wrapper.find("video[poster='https://unsplash.com/random']").exists(),
    ).toBeTruthy()
  })

  it("video has controls by default", () => {
    const wrapper = getComponent()
    console.log(wrapper.html())
    expect(wrapper.find("video[controls]").exists()).toBeTruthy()
  })

  it("video is muted by default", () => {
    const wrapper = getComponent()
    console.log(wrapper.html())
    expect(wrapper.find("video[muted]").exists()).toBeTruthy()
  })

  it("video does not autoplay by default", () => {
    const wrapper = getComponent()
    expect(wrapper.find("video:not([autoplay])").exists()).toBeTruthy()
  })

  it("video does not loop by default", () => {
    const wrapper = getComponent()
    expect(wrapper.find("video:not([loop])").exists()).toBeTruthy()
  })

  it("video preloads auto by default", () => {
    const wrapper = getComponent()
    expect(wrapper.find("video[preload='auto']").exists()).toBeTruthy()
  })

  describe("if ingredient has no controls", () => {
    it("video has no controls", () => {
      const wrapper = getComponent({
        value: "https://vimeo.com/12345678",
        controls: false,
      })
      expect(wrapper.find("video:not([controls])").exists()).toBeTruthy()
    })
  })

  describe("if ingredient is not muted", () => {
    it("mutes video", () => {
      const wrapper = getComponent({
        value: "https://vimeo.com/12345678",
        muted: false,
      })
      expect(wrapper.find("video:not([muted])").exists()).toBeTruthy()
    })
  })

  describe("if ingredient is set to autoplay", () => {
    it("autoplays video", () => {
      const wrapper = getComponent({
        value: "https://vimeo.com/12345678",
        autoplay: true,
      })
      expect(wrapper.find("video[autoplay]").exists()).toBeTruthy()
    })
  })

  describe("if ingredient is set to preload none", () => {
    it("does not peload video", () => {
      const wrapper = getComponent({
        value: "https://vimeo.com/12345678",
        preload: "none",
      })
      expect(wrapper.find("video[preload='none']").exists()).toBeTruthy()
    })
  })
})
