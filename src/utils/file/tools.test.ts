import { expect, it } from 'vitest'
import { formatFileSize } from './tools'

it('should format file size in units', () => {
  expect(formatFileSize(100)).toBe('100B')
  expect(formatFileSize(1024)).toBe('1KB')
  expect(formatFileSize(1024 * 1024)).toBe('1MB')
})

it('should handle boundary values', () => {
  expect(formatFileSize(0)).toBe('0B')
  expect(formatFileSize(-100)).toBe('')
})

it('should use units', () => {
  expect(formatFileSize(100, [])).toBe('100')
  expect(formatFileSize(1, ['KB'])).toBe('1KB')
  expect(formatFileSize(1024, ['KB', 'GB'])).toBe('1GB')
})

it('should validate params', () => {
  // @ts-expect-error
  expect(formatFileSize('invalid')).toBe('')
})
