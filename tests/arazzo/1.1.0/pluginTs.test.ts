import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRelativePath } from '@internals/utils'
import { adapterArazzo } from '@kubb/adapter-arazzo'
import { Hookable, createKubb } from '@kubb/core'
import { type Config, Diagnostics, type KubbHooks, fsStorage } from 'kubb/kit'
import { parserTs } from '@kubb/parser-ts'
import { pluginTs } from '@kubb/plugin-ts'
import { describe, expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const version = '1.1.0'

type BuildConfig = Omit<Config, 'plugins' | 'reporters'> & { plugins: unknown }

const configs: Array<{ name: string; config: BuildConfig }> = [
  {
    /**
     * Every workflow becomes one operation with an `<Workflow>Inputs` schema, so `plugin-ts`
     * must generate a type for each workflow's inputs and named `components.inputs` entries.
     */
    name: 'workflows',
    config: {
      root: __dirname,
      input: './mocks/workflows.arazzo.yaml',
      output: { path: './gen', barrel: false },
      adapter: adapterArazzo({ validate: false }),
      parsers: [parserTs()],
      storage: fsStorage(),
      plugins: [
        pluginTs({
          output: { path: './types', mode: 'directory', barrel: false },
          enum: { type: 'asConst' },
        }),
      ],
    },
  },
]

describe(`plugin-ts options with @kubb/adapter-arazzo ${version}`, () => {
  test.each(configs)('config testing with config as $name', async ({ name, config }) => {
    const tmpDir = path.join(os.tmpdir(), `kubb-test-${name}-${Date.now()}`)
    const output = path.join(tmpDir, name)
    const { files, diagnostics } = await createKubb(
      {
        ...config,
        output: {
          ...config.output,
          path: output,
        },
      } as Config,
      {
        hooks: new Hookable<KubbHooks>(),
      },
    ).safeBuild()

    expect(files.length).toBeGreaterThan(0)
    expect(Diagnostics.hasError(diagnostics)).toBe(false)

    for (const file of files) {
      const fileContent = await fs.readFile(file.path, 'utf-8')
      await expect(fileContent).toMatchFileSnapshot(path.join(__dirname, '__snapshots__', 'pluginTs', name, getRelativePath(output, file.path)))
    }

    await fs.rm(tmpDir, { recursive: true, force: true })
  })
})
