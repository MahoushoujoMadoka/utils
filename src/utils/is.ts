import { getTypeName } from './base'

export const isBrowser = typeof window !== 'undefined'

export function isPropertyKey(val: unknown): val is PropertyKey {
  return ['string', 'number', 'symbol'].includes(getTypeName(val) as string)
}
