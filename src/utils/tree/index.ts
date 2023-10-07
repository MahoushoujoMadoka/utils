import { cloneDeep } from 'lodash-es'

export interface TreeOptions<T extends Record<string, any>> {
  /**
   * 自定义子级字段名
   */
  childField?: keyof T
}

export class Tree<T extends Record<string, any>> {
  protected childrenField: keyof T
  public constructor(
    protected data: T[] = [],
    protected options?: TreeOptions<T>,
  ) {
    const { childField = 'children' } = options || {}
    this.childrenField = childField
  }

  public find(predicate: (value: T, index: number, obj: T[]) => unknown): T | undefined {
    let result: T | undefined
    let finded = false
    const fn = (currentData: T[]) => {
      result = currentData.find((item, i) => {
        const predicateResult = !!predicate(item, i, this.data)
        if (predicateResult) {
          finded = true
        }
        return predicateResult
      })
      if (!finded) {
        currentData.some((item) => {
          const children = item[this.childrenField] as T[] | undefined
          children && fn(item[this.childrenField])
          return finded
        })
      }
    }
    fn(this.data)
    return result
  }

  public map<U extends Record<string, any>>(
    callbackfn: (value: T, index: number, array: T[]) => U,
  ) {
    const fn = (currentData: T[]) => {
      const tree = currentData.map((item, i) => {
        const children = item[this.childrenField] as T[] | undefined
        const result: Record<string, any> = { ...callbackfn(item, i, this.data) }
        if (children) {
          result[this.childrenField as string] = fn(item[this.childrenField])
        }
        return result
      }) as unknown as T[]

      return tree
    }
    return new Tree(fn(this.data))
  }

  /**
   * 查找predicate为true时的整条路径
   */
  public findPath(predicate: (value: T, index: number, obj: T[]) => unknown) {
    let path: T[] = []
    const fn = (currentData: T[], layer = 1, acc: T[] = []) => {
      currentData.some((item, i) => {
        acc = acc.slice(0, layer - 1)
        acc.push(item)
        const predicateResult = !!predicate(item, i, this.data)
        if (predicateResult) {
          path = acc
          return true
        }
        const children = item[this.childrenField] as T[] | undefined
        children && fn(item[this.childrenField], layer + 1, acc)
        return false
      })
    }
    fn(this.data)
    return path
  }

  toArray() {
    return cloneDeep(this.data)
  }

  /**
   * 查找predicate为true时的所有父级
   */
  public findParents(predicate: (value: T, index: number, obj: T[]) => unknown) {
    const path = this.findPath(predicate)
    path.pop()
    return path
  }

  public forEach(callbackfn: (value: T, index: number, array: T[]) => void) {
    const fn = (currentData: T[]) => {
      currentData.forEach((item, i) => {
        callbackfn(item, i, this.data)
        const children = item[this.childrenField] as T[] | undefined
        children && fn(item[this.childrenField])
      })
    }
    fn(this.data)
  }
}
