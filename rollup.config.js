const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const dts = require("rollup-plugin-dts")
const packageJson = require("./package.json");
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const sass = require('rollup-plugin-sass')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')



module.exports =  [
  {
    input: "src/index.ts",
    output: [
      // {
      //   file: packageJson.module,
      //   format: 'cjs',
     
      // },
      // {
      //   file: packageJson.main,
      //   format: 'esm',
    
      // },
      {
        name: packageJson.module,
        sourcemap: true,
        file: packageJson.main,
        format: 'umd',
        globals: { react: 'React' },
      },
    ],
    external: ['react'],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx']
      }),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
        // extract: 'styles.css',
        // modules: {},
        // use: ['sass'],
        // extract: false,
        // minimize: true
      }),
      terser(),
      sass()
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    external: [/\.(css|scss|sass)$/],
    plugins: [dts.default()]
  }
];