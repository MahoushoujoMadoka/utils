import { lowerFirst, upperFirst } from 'lodash-es'
import type { CamelCaseJoin, PascalCaseJoin } from '../../types'

/**
 * 连接多个字符串并转成小驼峰
 */
export function camelCaseJoin<const T extends readonly string[]>(strs: T) {
  return lowerFirst(pascalCaseJoin(strs)) as CamelCaseJoin<T>
}

/**
 * 连接多个字符串并转成大驼峰
 */
export function pascalCaseJoin<const T extends readonly string[]>(strs: T) {
  return strs.reduce((acc, item) => {
    acc += upperFirst(item)
    return acc
  }, '') as PascalCaseJoin<T>
}
