function hasIngredients(element) {
  return element.ingredients && element.ingredients.length > 0
}

export function getElementsEssence(element, name) {
  if (hasIngredients(element)) {
    console.warn(
      `Element "${element.name}" has ingredients! We returned the ingredient object, but please use getIngredient("${name}") instead.`
    )
    return getElementsIngredient(element, name, false)
  }
  return element.essences.find((e) => e.role === name)
}

export function getElementsIngredient(element, name, warn = true) {
  if (hasIngredients(element)) {
    if (warn) {
      console.warn(
        `Element "${element.name}" has ingredients! We returned an ingredient object instead of a single value. Please use getValue("${name}") or use the value property to get the value of the "${name}" ingredient.`
      )
    }
    return element.ingredients.find((i) => i.role === name)
  }
  return getElementsEssence(element, name)?.ingredient
}

export function getElementsRichtext(element, name) {
  let thing
  if (hasIngredients(element)) {
    thing = getElementsIngredient(element, name, false) || {}
  } else {
    thing = getElementsEssence(element, name) || {}
  }
  return thing.sanitized_body || thing.value || thing.body
}

export function getElementsValue(element, name) {
  return getElementsIngredient(element, name, false)?.value
}
