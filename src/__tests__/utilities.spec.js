import {
  getElementsEssence,
  getElementsIngredient,
  getElementsRichtext,
  getElementsValue,
} from "../utilities"

beforeEach(() => {
  // Mock the console.warn we use in the element mixin functions
  jest.spyOn(console, "warn").mockImplementation(() => {})
})

describe("Alchemy element utilities", () => {
  describe("getElementsEssence", () => {
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "article",
            ingredients: [],
            essences: [],
          }
          expect(getElementsEssence(element, "foo")).toBeUndefined()
        })
      })

      describe("if ingredient exists", () => {
        it("returns ingredient", () => {
          const ingredient = {
            role: "foo",
            value: "baz",
          }
          const element = {
            name: "article",
            ingredients: [ingredient],
            essences: [],
          }
          expect(getElementsEssence(element, "foo")).toEqual(ingredient)
        })
      })
    })

    describe("if element has essences", () => {
      describe("if essence does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "content_page",
            ingredients: [],
            essences: [],
          }
          expect(getElementsEssence(element, "foo")).toBeUndefined()
        })
      })

      describe("if essence exists", () => {
        it("returns the essence", () => {
          const headline = { role: "headline" }
          const element = {
            name: "content_page",
            ingredients: [],
            essences: [headline],
          }
          expect(getElementsEssence(element, "headline")).toEqual(headline)
        })
      })
    })
  })

  describe("getElementsIngredient", () => {
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "article",
            ingredients: [],
            essences: [],
          }
          expect(getElementsIngredient(element, "foo")).toBeUndefined()
        })
      })

      describe("if ingredient exists", () => {
        it("returns ingredient", () => {
          const ingredient = {
            role: "foo",
            value: "baz",
          }
          const element = {
            name: "article",
            ingredients: [ingredient],
            essences: [],
          }
          expect(getElementsIngredient(element, "foo")).toEqual(ingredient)
        })
      })
    })

    describe("if element has essences", () => {
      describe("if essence does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "content_page",
            essences: [],
          }
          expect(getElementsIngredient(element, "foo")).toBeUndefined()
        })
      })

      describe("if essence exists", () => {
        it("returns the essences ingredient", () => {
          const headline = { role: "headline", ingredient: "The Headline" }
          const element = {
            name: "content_page",
            essences: [headline],
          }
          expect(getElementsIngredient(element, "headline")).toEqual(
            "The Headline"
          )
        })
      })
    })
  })

  describe("getElementsRichtext", () => {
    describe("if element has ingredients", () => {
      describe("if ingredient does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "article",
            ingredients: [],
            essences: [],
          }
          expect(getElementsRichtext(element, "foo")).toBeUndefined()
        })
      })

      describe("if ingredient with sanitized_body exists", () => {
        describe("with default casing", () => {
          it("returns the ingredients sanitized_body", () => {
            const headline = {
              role: "headline",
              sanitized_body: "The Headline",
            }
            const element = {
              name: "article",
              ingredients: [headline],
            }
            expect(getElementsRichtext(element, "headline")).toEqual(
              "The Headline"
            )
          })
        })

        describe("with camel casing", () => {
          it("returns the ingredients sanitizedBody", () => {
            const headline = {
              role: "headline",
              sanitizedBody: "The Headline",
            }
            const element = {
              name: "article",
              ingredients: [headline],
            }
            expect(getElementsRichtext(element, "headline")).toEqual(
              "The Headline"
            )
          })
        })
      })

      describe("if ingredient with value and no sanitized body exists", () => {
        it("returns the ingredients value", () => {
          const headline = { role: "headline", value: "<h1>The Headline</h1>" }
          const element = {
            name: "article",
            essences: [headline],
          }
          expect(getElementsRichtext(element, "headline")).toEqual(
            "<h1>The Headline</h1>"
          )
        })
      })
    })

    describe("if element has essences", () => {
      describe("if essence does not exist", () => {
        it("returns undefined", () => {
          const element = {
            name: "content_page",
            essences: [],
          }
          expect(getElementsRichtext(element, "foo")).toBeUndefined()
        })
      })

      describe("if essence with sanitized_body exists", () => {
        it("returns the essences ingredient", () => {
          const headline = { role: "headline", sanitized_body: "The Headline" }
          const element = {
            name: "content_page",
            essences: [headline],
          }
          expect(getElementsRichtext(element, "headline")).toEqual(
            "The Headline"
          )
        })
      })

      describe("if essence with body and no sanitized body exists", () => {
        it("returns the essences body", () => {
          const headline = { role: "headline", body: "<h1>The Headline</h1>" }
          const element = {
            name: "content_page",
            essences: [headline],
          }
          expect(getElementsRichtext(element, "headline")).toEqual(
            "<h1>The Headline</h1>"
          )
        })
      })
    })
  })

  describe("getElementsValue", () => {
    describe("if ingredient does not exist", () => {
      it("returns undefined", () => {
        const element = {
          name: "content_page",
          ingredients: [],
          essences: [],
        }
        expect(getElementsValue(element, "foo")).toBeUndefined()
      })
    })

    describe("if ingredient exists", () => {
      it("returns the ingredients value", () => {
        const headline = { role: "headline", value: "The Headline" }
        const element = {
          name: "content_page",
          ingredients: [headline],
        }
        expect(getElementsValue(element, "headline")).toEqual("The Headline")
      })
    })
  })
})
