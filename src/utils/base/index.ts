import type { NotOnly } from '../../types'
import { toString } from '../internal'

export function getTypeName(val: unknown) {
  return toString(val).slice(8, -1).toLowerCase() as NotOnly<
    string,
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'
    | 'null'
    | 'array'
    | 'date'
    | 'regexp'
    | 'set'
    | 'map'
    | 'weakset'
    | 'weakmap'
    | 'promise'
    | 'file'
    // ...
  >
}
