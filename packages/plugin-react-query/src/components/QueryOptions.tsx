import type { ast } from 'kubb/kit'
import type { ResolverTs } from '@kubb/plugin-ts'
import { functionPrinter } from '@kubb/plugin-ts'
import { File, Function } from 'kubb/jsx'
import type { KubbReactNode } from 'kubb/jsx'
import { buildQueryOptionsParams, buildClientCall } from '@internals/tanstack-query'
import { buildQueryKeyParams, buildResponseTypes } from '../utils.ts'

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

export function QueryOptions({ name, clientName, node, tsResolver, queryKeyName, queryKeyTypeName }: Props): KubbReactNode {
  const { TData, TError } = buildResponseTypes(node, tsResolver)

  const queryKeyParamsNode = buildQueryKeyParams(node, { resolver: tsResolver })
  const queryKeyParamsCall = callPrinter.print(queryKeyParamsNode) ?? ''

  const paramsNode = buildQueryOptionsParams(node, { resolver: tsResolver })
  const paramsSignature = declarationPrinter.print(paramsNode) ?? ''
  const queryFnBody = `const { data } = await ${buildClientCall(node, { clientName, signal: true })}
          return data`

  // Explicit return type built from exported public types, so `tsc` never has to infer and
  // name `queryOptions`'s branded return type (unexported `dataTagSymbol`) in declaration emit.
  // See https://github.com/TanStack/query/issues/10904.
  const returnType = `UndefinedInitialDataOptions<${TData}, ${TError}, ${TData}, ${queryKeyTypeName}> & { queryKey: DataTag<${queryKeyTypeName}, ${TData}, ${TError}> }`

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
