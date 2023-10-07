import { describe, expect, it } from 'vitest'
import { ObjectArray } from '.'

describe('ObjectArray', () => {
  const data = [
    { name: 'John', age: 20 },
    { name: 'Mary', age: 25 },
    { name: 'Peter', age: 30 },
  ] as const

  const objectArray = new ObjectArray(data)

  describe('valuesBy', () => {
    it('should correctly get values by key', () => {
      const ages = objectArray.valuesBy('age')

      expect(ages).toEqual([20, 25, 30])
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]
      expect(new ObjectArray(data).valuesBy('name')).toEqual(['Alice', 'Bob'])
    })
    it('should return empty array when getting values by key from empty array', () => {
      const objectArray = new ObjectArray([])
      const values = objectArray.valuesBy('name')
      expect(values).toEqual([])
    })

    it('should return undefined array when getting values by key', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]
      const objectArray = new ObjectArray(data)
      // @ts-expect-error
      expect(objectArray.valuesBy('nonexistentKey')).toEqual([undefined, undefined])
    })
  })

  describe('pairs', () => {
    it('should correctly get key-value pairs', () => {
      const pairs = objectArray.pairs('name', 'age')

      expect(pairs).toEqual({
        John: 20,
        Mary: 25,
        Peter: 30,
      })

      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]
      expect(new ObjectArray(data).pairs('id', 'name')).toEqual({ 1: 'Alice', 2: 'Bob' })
    })
    it('should return empty object when getting key-value pairs from empty array', () => {
      const objectArray = new ObjectArray([])
      const pairs = objectArray.pairs('id', 'name')
      expect(pairs).toEqual({})
    })
  })

  describe('groupBy', () => {
    it('should group by age and pick name', () => {
      const grouped = objectArray.groupBy('age', ['name'])

      expect(grouped).toEqual({
        20: { name: 'John' },
        25: { name: 'Mary' },
        30: { name: 'Peter' },
      })
    })

    it('should group by age with full object value', () => {
      const grouped = objectArray.groupBy('age')

      expect(grouped).toEqual({
        20: { name: 'John', age: 20 },
        25: { name: 'Mary', age: 25 },
        30: { name: 'Peter', age: 30 },
      })
    })
    it('should return empty object when grouping and picking from empty array', () => {
      const objectArray = new ObjectArray([])
      const groups = objectArray.groupBy('group', ['name'])
      expect(groups).toEqual({})
    })

    it('should return correctly object when grouping and picking with keys that do not exist', () => {
      const data = [
        { id: 1, name: 'Alice', group: 'A' },
        { id: 2, name: 'Bob', group: 'B' },
      ]
      const objectArray = new ObjectArray(data)
      // @ts-expect-error
      expect(objectArray.groupBy('nonexistentKey', ['name'])).toEqual({})
      // @ts-expect-error
      expect(objectArray.groupBy('group', ['nonexistentKey'])).toEqual({
        A: {},
        B: {},
      })
    })
  })
})
