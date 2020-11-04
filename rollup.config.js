import vue from "rollup-plugin-vue"
import babel from "@rollup/plugin-babel"

export default {
  input: "src/main.js",
  output: {
    file: "dist/alchemy-vue.js",
    format: "cjs",
  },
  plugins: [vue(), babel({ babelHelpers: "bundled" })],
}
