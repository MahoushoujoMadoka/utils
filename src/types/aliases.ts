export type TargetContext = '_self' | '_blank'
export type ValueType = string | number

export type EnumLike = Record<string, string | number>

export type Nil = null | undefined

export type Falsey = Nil | false | '' | 0 | 0n
