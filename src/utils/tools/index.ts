import { isObject } from 'lodash-es'
import type { NotOnly, RequiredBy, TargetContext } from '../../types'

/**
 * Opens a new window with the specified URL, centered on the screen.
 * @param url - The URL of the webpage to open.
 * @param options - An object containing the width and height of the new window.
 */
export function openCenteredWindow(
  url: string,
  options: RequiredBy<OpenWindowOptions, 'width' | 'height'>,
) {
  const { width, height } = options
  const top = (window.screen.availHeight - height) / 2
  const left = (window.screen.availWidth - width) / 2
  window.open(url, '_blank', `height=${height}, width=${width}, top=${top}, left=${left}`)
}

/**
 * Opens a new window with the specified URL.
 * @param url - The URL of the webpage to open.
 * @param opt - An optional object containing the target context, rel=noopener attribute, and rel=noreferrer attribute.
 */
export interface OpenWindowOptions {
  target?: NotOnly<string, TargetContext>
  width?: number
  height?: number
  top?: number
  left?: number
  noopener?: boolean
  noreferrer?: boolean
}

export function openWindow(url: string, opt?: OpenWindowOptions) {
  const { target = '_blank', noopener = true, noreferrer = true, ...rest } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')
  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      feature.push(`${key}=${rest[key as keyof typeof rest]}`)
    }
  }
  window.open(url, target as string, feature.join(','))
}

/**
 * Delays the execution of the subsequent code for the specified amount of milliseconds.
 * @param delay - The delay in milliseconds.
 * @returns A promise that resolves after the delay.
 */
export function sleep(delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * Omits null and undefined values from an object recursively.
 * @param value - The object to process
 * @returns The processed object with null and undefined values omitted
 */
export function OmitNil<T extends Record<string, any>>(value: T) {
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      const element = value[key]
      if ([null, undefined].includes(element)) {
        delete value[key]
        continue
      }
      if (isObject(element)) {
        value[key] = OmitNil(element)
      }
    }
  }
  return value
}

export function buildFormData(data: Record<string, any>) {
  const formData = new FormData()
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      formData.append(key, data[key])
    }
  }
  return formData
}
