import { resolve } from 'path'
import { defineConfig } from 'vite'
import dtsBundleGenerator from 'vite-plugin-dts-bundle-generator'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    solid({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', { version: '2023-05' }]],
      },
    }),
    dtsBundleGenerator(
      {
        fileName: name => `${name}.d.ts`,
        libraries: {
          importedLibraries: ['solid-js'],
        },
        output: {
          sortNodes: true, // Helps in maintaining the order but check if additional flags are necessary
        },
      },
      {
        preferredConfigPath: './tsconfig.json',
      },
    ),
  ],
  server: { port: 3000 },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.tsx'),
        solid: resolve(__dirname, 'src/contenteditable.tsx'),
      },
      name: 'input-autosize',
      fileName: (format, name) => `${name}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'solidjs',
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
})
