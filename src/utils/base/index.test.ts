import { expect, it } from 'vitest'
import { getTypeName } from '.'

it('should return "string" for strings', () => {
  expect(getTypeName('foo')).toBe('string')
  expect(getTypeName('')).toBe('string')
})

it('should return "number" for numbers', () => {
  expect(getTypeName(123)).toBe('number')
  expect(getTypeName(Number.NaN)).toBe('number')
})

it('should return "bigint" for bigints', () => {
  expect(getTypeName(123n)).toBe('bigint')
  expect(getTypeName(0n)).toBe('bigint')
})

it('should return "boolean" for booleans', () => {
  expect(getTypeName(true)).toBe('boolean')
  expect(getTypeName(false)).toBe('boolean')
})

it('should return "symbol" for symbols', () => {
  expect(getTypeName(Symbol('test'))).toBe('symbol')
})

it('should return "undefined" for undefined', () => {
  expect(getTypeName(undefined)).toBe('undefined')
  expect(getTypeName(void 0)).toBe('undefined')
})

it('should return "object" for objects', () => {
  expect(getTypeName({})).toBe('object')
})

it('should return "function" for functions', () => {
  expect(getTypeName(() => {})).toBe('function')
})

it('should return "null" for null', () => {
  expect(getTypeName(null)).toBe('null')
})

it('should return "array" for arrays', () => {
  expect(getTypeName([])).toBe('array')
})

it('should return "date" for dates', () => {
  expect(getTypeName(new Date())).toBe('date')
})

it('should return "regexp" for regex', () => {
  expect(getTypeName(/foo/)).toBe('regexp')
})

it('should return "set" for set', () => {
  expect(getTypeName(new Set())).toBe('set')
})

it('should return "map" for maps', () => {
  expect(getTypeName(new Map())).toBe('map')
})

it('should return "weakset" for weaksets', () => {
  expect(getTypeName(new WeakSet())).toBe('weakset')
})

it('should return "weakmap" for weakmaps', () => {
  expect(getTypeName(new WeakMap())).toBe('weakmap')
})

it('should return "undefined" for empty args', () => {
  // @ts-expect-error
  expect(getTypeName()).toBe('undefined')
})
