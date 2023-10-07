import { describe, expect, it } from 'vitest'
import { Tree } from '.'

const data = [
  { name: 'a', children: [{ name: 'a1', children: [{ name: 'a3', value: 3 }] }, { name: 'a2' }] },
  { name: 'b', children: [{ name: 'b1', children: undefined }, { name: 'b2' }] },
  { name: 'c', children: [{ name: 'c1', children: [] }, { name: 'c2' }] },
]
const tree = new Tree(data)

describe('find', () => {
  it('should find item', () => {
    expect(tree.find((item) => item.name === 'a3')).toEqual({ name: 'a3', value: 3 })
    expect(tree.find((item) => item.name === 'a')).toBe(data[0])
    expect(tree.find((item) => item.name === 'dgawq')).toBeUndefined()
  })
  it('should work on empty tree', () => {
    expect(new Tree().find((n) => n.name === 'a3')).toBeUndefined()
  })
})

describe('findPath', () => {
  it('should find path', () => {
    expect(tree.findPath((item) => item.name === 'b2')).toEqual([data[1], data[1].children[1]])
    expect(tree.findPath((item) => item.name === 'a3')).toEqual([
      data[0],
      data[0].children[0],
      data[0].children[0]?.children?.[0],
    ])
    expect(tree.findPath((item) => item.name === 'dshswea')).toEqual([])
  })

  it('should return empty array for empty tree', () => {
    expect(new Tree().findPath((n) => n.name === 'a3')).toEqual([])
  })
})

describe('findParents', () => {
  it('should find parents', () => {
    expect(tree.findParents((item) => item.name === 'b2')).toEqual([data[1]])
    expect(tree.findParents((item) => item.name === 'a3')).toEqual([data[0], data[0].children[0]])
    expect(tree.findParents((item) => item.name === 'dshswea')).toEqual([])
  })
  it('should return empty array for empty tree', () => {
    expect(new Tree().findParents((n) => n.name === 'a3')).toEqual([])
  })
})

describe('map', () => {
  it('should map tree', () => {
    expect(tree.map((item) => ({ ...item, name: `${item.name}1` })).toArray()).toEqual([
      {
        name: 'a1',
        children: [{ name: 'a11', children: [{ name: 'a31', value: 3 }] }, { name: 'a21' }],
      },
      { name: 'b1', children: [{ name: 'b11', children: undefined }, { name: 'b21' }] },
      { name: 'c1', children: [{ name: 'c11', children: [] }, { name: 'c21' }] },
    ])
  })
  it('should work on empty tree', () => {
    expect(new Tree().map((n) => n).toArray()).toEqual([])
  })
  it('should work on tree with empty children', () => {
    expect(new Tree([{ name: 'a', children: [] }]).map((n) => n).toArray()).toEqual([
      { name: 'a', children: [] },
    ])
  })
})

describe('childrenField', () => {
  it('should use custom children field', () => {
    const data = [
      { name: 'a', sub: [{ name: 'a1', sub: [{ name: 'a3', value: 3 }] }, { name: 'a2' }] },
    ]
    const tree = new Tree(data, { childField: 'sub' })
    expect(tree.find((item) => item.name === 'a3')).toEqual({ name: 'a3', value: 3 })
    expect(tree.find((item) => item.name === 'a1')).toBe(data[0].sub[0])
    expect(tree.find((item) => item.name === 'dgawq')).toBeUndefined()
  })
})

describe('forEach', () => {
  it('should iterate tree', () => {
    const data = [
      {
        name: 'a',
        children: [{ name: 'a1', children: [{ name: 'a3', value: 3 }] }, { name: 'a2' }],
      },
      { name: 'b', children: [{ name: 'b1' }, { name: 'b2' }] },
      { name: 'c', children: [{ name: 'c1' }, { name: 'c2' }] },
    ]
    const tree = new Tree(data)
    const names: string[] = []
    tree.forEach((item) => {
      names.push(item.name)
    })
    expect(names).toEqual(['a', 'a1', 'a3', 'a2', 'b', 'b1', 'b2', 'c', 'c1', 'c2'])
  })
  it('should work on empty tree', () => {
    new Tree().forEach((n) => n)
  })
})
