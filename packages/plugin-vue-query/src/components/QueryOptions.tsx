import type { ast } from 'kubb/kit'
import type { FunctionParametersNode, ResolverTs } from '@kubb/plugin-ts'
import { functionPrinter } from '@kubb/plugin-ts'
import { File, Function } from 'kubb/jsx'
import type { KubbReactNode } from 'kubb/jsx'
import { buildQueryOptionsParams, buildResponseTypes } from '@internals/tanstack-query'
import { buildVueClientCall, maybeRefOrGetter } from '../utils.ts'
import { buildQueryKeyParamsNode } from './QueryKey.tsx'

type Props = {
  name: string
  clientName: string
  queryKeyName: string
  queryKeyTypeName: string
  node: ast.OperationNode
  tsResolver: ResolverTs
}

const declarationPrinter = functionPrinter({ mode: 'declaration' })
const callPrinter = functionPrinter({ mode: 'call' })

export function getQueryOptionsParams(node: ast.OperationNode, options: { resolver: ResolverTs }): FunctionParametersNode {
  return buildQueryOptionsParams(node, { resolver: options.resolver, memberTypeWrapper: maybeRefOrGetter })
}

export function QueryOptions({ name, clientName, node, tsResolver, queryKeyName, queryKeyTypeName }: Props): KubbReactNode {
  const { TData, TError } = buildResponseTypes(node, tsResolver)

  const queryKeyParamsNode = buildQueryKeyParamsNode(node, { resolver: tsResolver })
  const queryKeyParamsCall = callPrinter.print(queryKeyParamsNode) ?? ''

  const paramsNode = getQueryOptionsParams(node, { resolver: tsResolver })
  const paramsSignature = declarationPrinter.print(paramsNode) ?? ''
  const queryFnBody = `const { data } = await ${buildVueClientCall(node, { clientName, signal: true })}
          return data`

  // Explicit return type built from exported public types, so `tsc` never has to infer and
  // name `queryOptions`'s branded return type (unexported `dataTagSymbol`) in declaration emit.
  // See https://github.com/TanStack/query/issues/10904.
  const returnType = `UndefinedInitialQueryOptions<${TData}, ${TError}, ${TData}, ${queryKeyTypeName}> & { queryKey: DataTag<${queryKeyTypeName}, ${TData}, ${TError}> }`

  return (
    <File.Source name={name} isExportable isIndexable>
      <Function name={name} export params={paramsSignature} returnType={returnType}>
        {`
      const queryKey = ${queryKeyName}(${queryKeyParamsCall})
      return queryOptions<${TData}, ${TError}, ${TData}, ${queryKeyTypeName}>({
       queryKey,
       queryFn: async ({ signal }) => {
          ${queryFnBody}
       },
      })
`}
      </Function>
    </File.Source>
  )
}
