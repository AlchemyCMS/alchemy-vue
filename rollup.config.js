import vue from "rollup-plugin-vue"
import babel from "@rollup/plugin-babel"

const plugins = [vue(), babel({ babelHelpers: "bundled" })]

export default [
  {
    input: "src/main.js",
    output: [
      {
        file: "dist/alchemy-vue.js",
        format: "cjs",
      },
      {
        file: "dist/alchemy-vue.mjs",
        format: "es",
      },
    ],
    plugins,
  },
  {
    input: "src/ingredients.js",
    output: {
      file: "dist/ingredients.js",
      format: "es",
    },
    plugins,
  },
]
