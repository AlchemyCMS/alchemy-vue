function hasIngredients(element) {
  return element.ingredients && element.ingredients.length > 0
}

export function getElementsEssence(element, name) {
  if (hasIngredients(element)) {
    console.warn(
      `Element "${element.name}" has ingredients! We returned the ingredient object, but please use getIngredient("${name}") instead.`
    )
    return getElementsIngredient(element, name)
  }
  return element.essences.find((e) => e.role === name)
}

export function getElementsIngredient(element, name) {
  if (hasIngredients(element)) {
    return element.ingredients.find((i) => i.role === name)
  }
  return getElementsEssence(element, name)?.ingredient
}

export function getElementsRichtext(element, name) {
  let thing
  if (hasIngredients(element)) {
    thing = getElementsIngredient(element, name) || {}
  } else {
    thing = getElementsEssence(element, name) || {}
  }
  return (
    thing.sanitizedBody || thing.sanitized_body || thing.value || thing.body
  )
}

export function getElementsValue(element, name) {
  return getElementsIngredient(element, name)?.value
}
