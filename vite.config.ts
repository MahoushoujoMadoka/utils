import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import typescript from '@rollup/plugin-typescript'

const resolvePath = (str: string) => resolve(__dirname, str)

export default defineConfig({
  resolve: {
    alias: [],
  },
  test: {
    coverage: {
      include: ['src/**/*'],
    },
  },
  plugins: [],
  build: {
    // sourcemap:true
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: () => 'index.js',
      formats: ['es'],
    },
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      input: resolvePath('src/index.ts'),
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
        }),
      ],
      external: ['moment', 'mixpanel-browser', 'react-ga4', 'lodash-es'],
    },
  },
})
