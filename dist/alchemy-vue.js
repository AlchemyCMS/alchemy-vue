'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
      var _this$getEssence;

      var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.hasIngredients) {
        if (warn) {
          console.warn("Element \"".concat(this.element.name, "\" has ingredients! We returned an ingredient object instead of a single value. Please use getValue(\"").concat(name, "\") or use the value property to get the value of the \"").concat(name, "\" ingredient."));
        }

        return this.element.ingredients.find(function (i) {
          return i.role === name;
        });
      }

      return (_this$getEssence = this.getEssence(name)) === null || _this$getEssence === void 0 ? void 0 : _this$getEssence.ingredient;
    },
    getRichtext: function getRichtext(name) {
      var thing;

      if (this.hasIngredients) {
        thing = this.getIngredient(name, false) || {};
      } else {
        thing = this.getEssence(name) || {};
      }

      return thing.sanitized_body || thing.value || thing.body;
    },
    getEssence: function getEssence(name) {
      if (this.hasIngredients) {
        console.warn("Element \"".concat(this.element.name, "\" has ingredients! We returned the ingredient object, but please use getIngredient(\"").concat(name, "\") instead."));
        return this.getIngredient(name, false);
      }

      return this.element.essences.find(function (e) {
        return e.role === name;
      });
    },
    getValue: function getValue(name) {
      var _this$getIngredient;

      return (_this$getIngredient = this.getIngredient(name, false)) === null || _this$getIngredient === void 0 ? void 0 : _this$getIngredient.value;
    },
    componentName: function componentName(element) {
      var name = element.name;

      if (this.$options.components[name]) {
        return name;
      }

      return "FallbackElement";
    }
  },
  computed: {
    hasIngredients: function hasIngredients() {
      return this.element.ingredients && this.element.ingredients.length > 0;
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
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
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
      _vm.element.nested_elements.length
        ? [
            _c("h3", [
              _vm._v(
                "\n      This element has " +
                  _vm._s(_vm.element.nested_elements.length) +
                  " nested element(s)\n    "
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.element.nested_elements, function(nested_element) {
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
