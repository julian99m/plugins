import type { ast, Generator, Group, Output, Resolver } from 'kubb/kit'
import { pluginTsName } from '@kubb/plugin-ts'
import { pluginZodName } from '@kubb/plugin-zod'
import type { ContractClientFactory } from './types.ts'

type GeneratorDriver = Parameters<NonNullable<Generator<ContractClientFactory>['operations']>>[1]['driver']

/**
 * The two per-operation type names a generated client references: the grouped input and the
 * per-status responses record its `RequestResult` is keyed on.
 */
export type OperationTypeNames = {
  response: {
    /**
     * Resolves the name of the operation's grouped `{ body, path, query, headers }` input type.
     */
    options(node: ast.OperationNode): string
    /**
     * Resolves the name of the operation's per-status responses record type.
     */
    responses(node: ast.OperationNode): string
  }
}

/**
 * Where a generated client sources its operation types, plus the resolver and output the file
 * declaring them is resolved with.
 */
export type OperationTypeSource = OperationTypeNames & {
  /**
   * Resolver of the plugin supplying the names, used to resolve the file they are exported from.
   */
  resolver: Pick<Resolver, 'file' | 'pluginName'>
  /**
   * The supplying plugin's own `output`, when it configured one.
   */
  output: Output | undefined
  /**
   * The supplying plugin's own `group`, when it configured one.
   */
  group: Group | undefined
}

/**
 * Warning a client generator reports when neither plugin can supply the operation types, so the
 * pipeline says why nothing was generated instead of silently emitting no files.
 */
export const MISSING_OPERATION_TYPES_WARNING =
  'Skipped: no operation types available. Add `pluginTs()`, or `pluginZod({ inferred: true })` to type the client from its zod schemas.'

/**
 * Picks the plugin a generated client takes its `Options` and `Responses` types from.
 *
 * `plugin-ts` wins whenever it is in the pipeline, so existing configs keep the types they generate
 * today. Without it, `pluginZod({ inferred: true })` takes over: its inferred options and responses
 * types are built from the same shared schemas as the `plugin-ts` ones, so a client typed off
 * `z.infer` carries what the codecs decode to (a `Temporal` instance, a `Date`) rather than the raw
 * wire type. Returns `null` when neither is available, leaving the caller nothing to type against.
 *
 * @example
 * ```ts
 * const types = resolveOperationTypes(ctx.driver)
 * if (!types) return null
 * types.response.options(node) // 'GetPetByIdOptions', or 'GetPetByIdOptionsSchemaType' from zod
 * ```
 */
export function resolveOperationTypes(driver: GeneratorDriver): OperationTypeSource | null {
  const pluginTs = driver.getPlugin(pluginTsName)

  if (pluginTs) {
    const resolver = driver.getResolver(pluginTsName)

    return {
      response: resolver.response,
      resolver,
      output: pluginTs.options?.output,
      group: pluginTs.options?.group,
    }
  }

  const pluginZod = driver.getPlugin(pluginZodName)

  if (!pluginZod?.options?.inferred) return null

  const resolver = driver.getResolver(pluginZodName)

  return {
    response: {
      options: resolver.response.options,
      // `response.responses` names the schema; the client needs the type inferred from it.
      responses: (node) => resolver.schema.type(resolver.response.responses(node)),
    },
    resolver,
    output: pluginZod.options.output,
    group: pluginZod.options.group,
  }
}
