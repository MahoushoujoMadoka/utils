import type { CamelCaseJoin } from '../types'
import { getTypeName } from './base'
import { camelCaseJoin } from './str'

export const isBrowser = typeof window !== 'undefined'

export function isPropertyKey(val: unknown): val is PropertyKey {
  return ['string', 'number', 'symbol'].includes(getTypeName(val) as string)
}

/**
 * 传入联合类型会有类型提示
 * @example const { isSmall, isLarge } = unionIs<'small' | 'large'>('small')
 *
 */
export function unionIs<T extends string>(unionType: T) {
  const type = camelCaseJoin(['is', unionType])
  const proxyObj = new Proxy(
    {
      [type]: true,
    },
    {
      get: (_, prop) => {
        if (prop === type) {
          return true
        }
        return false
      },
    },
  ) as Record<CamelCaseJoin<['is', T]>, boolean>
  return proxyObj
}
