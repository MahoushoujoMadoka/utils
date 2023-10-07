import { isFunction, pick } from 'lodash-es'
import type {
  ExtarctPairsFromObjectArray,
  ExtractValuesFromObjectArray,
  GroupBy,
  ValidKeys,
} from '../../types'
import { isPropertyKey } from '../is'

/**
 * 类型提示良好的对象数组操作类
 */
export class ObjectArray<const T extends readonly Record<string, any>[]> extends Array<T[number]> {
  public constructor(data?: T) {
    super(...(data || []))
  }

  public static get [Symbol.species]() {
    return Array
  }

  /**
   * 获取由指定的键的值组成的数组
   */
  public valuesBy = <K extends keyof T[number]>(keyProp: K) => {
    return this.map((item) => item[keyProp]) as ExtractValuesFromObjectArray<T, K>
  }

  /**
   * 获取由指定的键和值组成的键值对
   */
  public pairs = <K extends ValidKeys<T[number]>, V extends keyof Omit<T[number], K>>(
    keyProp: K,
    valueProp: V,
  ) => {
    return this.reduce((acc, item) => {
      const key = item[keyProp]
      if (!isPropertyKey(key)) {
        return acc
      }
      const val = item[valueProp]
      return { ...acc, [key]: val }
    }, {}) as ExtarctPairsFromObjectArray<T, K, V>
  }

  /**
   * 按指定的键分组
   * @param selector 指定的键名或用于生成键名的函数
   * @param valueProps 指定需要挑选出来的属性的键名，如果不传，则返回对象的全部属
   */
  public groupBy = <K extends ValidKeys<T[number]>, V extends keyof T[number]>(
    selector: K | ((val: T[number]) => unknown),
    valueProps?: V[],
  ) => {
    return this.reduce((acc, item) => {
      const key = isFunction(selector) ? selector(item) : item[selector]
      if (!isPropertyKey(key)) {
        return acc
      }
      return { ...acc, [key]: valueProps ? pick(item, valueProps) : item }
    }, {}) as GroupBy<T, K, V>
  }
}
