import { expect, it } from 'vitest'
import { camelCaseJoin, pascalCaseJoin } from './join'

it('should concat multiple words', () => {
  expect(camelCaseJoin(['add', 'prefix', 'and', 'suffix'])).toBe('addPrefixAndSuffix')
  expect(camelCaseJoin(['', 'add', 'prefix', '', 'and', 'suffix'])).toBe('addPrefixAndSuffix')
  expect(camelCaseJoin(['', 'add', 'suffix'])).toBe('addSuffix')
  expect(camelCaseJoin(['', 'b', ''])).toBe('b')

  expect(pascalCaseJoin(['add', 'prefix', 'and', 'suffix'])).toBe('AddPrefixAndSuffix')
  expect(pascalCaseJoin(['', 'add', 'prefix', '', 'and', 'suffix'])).toBe('AddPrefixAndSuffix')
  expect(pascalCaseJoin(['', 'add', 'suffix'])).toBe('AddSuffix')
  expect(pascalCaseJoin(['', 'b', ''])).toBe('B')
})

it('should handle empty string', () => {
  expect(camelCaseJoin(['', '', ''])).toBe('')
  expect(camelCaseJoin([''])).toBe('')

  expect(pascalCaseJoin(['', '', ''])).toBe('')
  expect(pascalCaseJoin([''])).toBe('')
})
