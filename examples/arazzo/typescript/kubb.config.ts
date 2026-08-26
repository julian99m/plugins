import { adapterArazzo } from '@kubb/adapter-arazzo'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  root: '.',
  input: './workflows.arazzo.yaml',
  output: {
    path: './src/gen',
    clean: true,
  },
  adapter: adapterArazzo(),
  plugins: [
    pluginTs({
      output: {
        path: 'models',
        mode: 'directory',
      },
      enum: { type: 'asConst' },
    }),
  ],
})
