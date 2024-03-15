import { describe, expect, it } from 'vitest'
import { unionIs } from './is'

describe('unionIs with union types and case sensitivity', () => {
  it('returns true for "isSmall" when "small" is the type', () => {
    const { isSmall, isLarge } = unionIs<'small' | 'large'>('small')
    expect(isSmall).toBe(true)
    expect(isLarge).toBe(false)
  })

  it('returns false for "isSmall" and "isLarge" when input is "Small" (case-sensitive)', () => {
    // @ts-expect-error
    const { isSmall, isLarge } = unionIs<'small' | 'large'>('Small')
    expect(isSmall).toBe(true)
    expect(isLarge).toBe(false)
  })

  it('returns false for any undefined property access', () => {
    const result = unionIs<'small' | 'large'>('small')
    // @ts-expect-error
    expect(result.isUnknown).toBe(false)
  })

  it('returns false for "isSmall" when input is "SMALL" (case-sensitive)', () => {
    // @ts-expect-error
    const { isSmall, isSMALL } = unionIs<'small'>('SMALL')
    expect(isSmall).toBe(false)
    expect(isSMALL).toBe(true)
  })
})
describe('unionIs with edge cases', () => {
  it('handles special characters in type', () => {
    const type = '!@#$%^&*()'
    const result = unionIs<typeof type>(type)
    expect(result[`is${type}`]).toBe(true)
  })
})
