'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function hasIngredients(element) {
  return element.ingredients && element.ingredients.length > 0;
}

function getElementsEssence(element, name) {
  if (hasIngredients(element)) {
    console.warn("Element \"".concat(element.name, "\" has ingredients! We returned the ingredient object, but please use getIngredient(\"").concat(name, "\") instead."));
    return getElementsIngredient(element, name);
  }

  return element.essences.find(function (e) {
    return e.role === name;
  });
}
function getElementsIngredient(element, name) {
  var _getElementsEssence;

  if (hasIngredients(element)) {
    return element.ingredients.find(function (i) {
      return i.role === name;
    });
  }

  return (_getElementsEssence = getElementsEssence(element, name)) === null || _getElementsEssence === void 0 ? void 0 : _getElementsEssence.ingredient;
}
function getElementsRichtext(element, name) {
  var thing;

  if (hasIngredients(element)) {
    thing = getElementsIngredient(element, name) || {};
  } else {
    thing = getElementsEssence(element, name) || {};
  }

  return thing.sanitizedBody || thing.sanitized_body || thing.value || thing.body;
}
function getElementsValue(element, name) {
  var _getElementsIngredien;

  return (_getElementsIngredien = getElementsIngredient(element, name)) === null || _getElementsIngredien === void 0 ? void 0 : _getElementsIngredien.value;
}

var AlchemyElement = {
  mounted: function mounted() {
    var _this = this;

    if (window.location.search.match("alchemy_preview_mode=true")) {
      window.addEventListener("message", function (evt) {
        if (evt.data.message === "Alchemy.focusElement") {
          _this.focusAlchemyElement(evt.data.element_id);
        }
      });
      this.$el.addEventListener("click", function () {
        _this.focusAlchemyElement(_this.element.id);

        window.parent.postMessage({
          message: "Alchemy.focusElementEditor",
          element_id: _this.element.id
        }, "*");
      });
    }
  },
  methods: {
    focusAlchemyElement: function focusAlchemyElement(id) {
      if (id === this.element.id) {
        this.elementFocused = true;
        this.$el.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    },
    getIngredient: function getIngredient(name) {
      return getElementsIngredient(this.element, name);
    },
    getRichtext: function getRichtext(name) {
      return getElementsRichtext(this.element, name);
    },
    getEssence: function getEssence(name) {
      return getElementsEssence(this.element, name);
    },
    getValue: function getValue(name) {
      return getElementsValue(this.element, name);
    },
    componentName: function componentName(element) {
      var name = element.name;

      if (this.$options.components[name]) {
        return name;
      }

      return "FallbackElement";
    }
  },
  props: {
    element: {
      type: Object,
      required: true,
      default: function _default() {
        return {
          essences: []
        };
      }
    }
  }
};

//

var script = {
  name: "FallbackElement",
  mixins: [AlchemyElement],
  computed: {
    nestedElements() {
      return this.element.nested_elements || this.element.nestedElements
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "alchemy-fallback-element" },
    [
      _c("h2", [
        _vm._v(
          "I am a dummy " +
            _vm._s(_vm.element.name) +
            " Alchemy element component"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "\n    To replace me register a local Vue component named\n    "
        ),
        _c("kbd", [_vm._v(_vm._s(_vm.element.name))]),
        _vm._v(" at your\n    "),
        _c("kbd", [
          _vm._v(
            _vm._s(
              _vm.$parent.$options.name || _vm.$parent.$options._componentTag
            )
          )
        ]),
        _vm._v("\n    component.\n  ")
      ]),
      _vm._v(" "),
      _vm.element.essences.length
        ? [
            _c("h3", [
              _vm._v(
                "This element has " +
                  _vm._s(_vm.element.essences.length) +
                  " essence(s)"
              )
            ]),
            _vm._v(" "),
            _c(
              "ul",
              _vm._l(_vm.element.essences, function(essence) {
                return _c("li", { key: essence.id }, [
                  _vm._v("\n        " + _vm._s(essence.role) + "\n      ")
                ])
              }),
              0
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.nestedElements.length
        ? [
            _c("h3", [
              _vm._v(
                "This element has " +
                  _vm._s(_vm.nestedElements.length) +
                  " nested element(s)"
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.nestedElements, function(nested_element) {
              return _c("FallbackElement", {
                key: nested_element.id,
                attrs: { element: nested_element }
              })
            })
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var page = {
  components: {
    FallbackElement: __vue_component__
  },
  props: {
    page: {
      type: Object,
      required: true,
      default: function _default() {
        return {
          elements: []
        };
      }
    }
  },
  methods: {
    componentName: function componentName(element) {
      var name = element.name;

      if (this.$options.components[name]) {
        return name;
      }

      return "FallbackElement";
    },
    elementByName: function elementByName(name) {
      return this.elementsByName(name)[0] || {};
    },
    elementsByName: function elementsByName(name) {
      return this.page.elements.filter(function (e) {
        return e.name === name;
      });
    }
  }
};

exports.AlchemyElement = AlchemyElement;
exports.AlchemyPage = page;
exports.getElementsEssence = getElementsEssence;
exports.getElementsIngredient = getElementsIngredient;
exports.getElementsRichtext = getElementsRichtext;
exports.getElementsValue = getElementsValue;
