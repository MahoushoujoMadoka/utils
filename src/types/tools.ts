import type { Falsey } from './aliases'

/**
 * Strict Omit with type constraint that omitted keys must be in object
 * @example type Example = StrictOmit<{ a: 1; b: 2;}, 'a'> // { b: 2; }
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * A utility type that makes specific keys of an object type optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
/**
 * Extract keys from T that conform to PropertyKey constraint
 */
export type ValidKeys<T, K extends keyof T = keyof T> = K extends K
  ? T[K] extends PropertyKey
    ? K
    : never
  : never

/**
 * Make keys K in T required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Make return value of any function Promise
 */
export type Promisify<T extends (...args: any[]) => any> = (
  ...arg: Parameters<T>
) => Promise<ReturnType<T>>

/**
 * Make all nested objects in T optional
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K]
}

export type DeepClone<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any> ? DeepClone<T[K]> : T[K]
}

/**
 * Get array of values of key K from array of objects
 * @example type Example = ExtractValuesFromObjectArray<
 [
  {
      value: 1
      type: 'a'
    },
    {
      value: 2
      type: 'b'
    },
 ],
 'type'
> // ['a', 'b']
 */
export type ExtractValuesFromObjectArray<
  T extends readonly unknown[],
  K extends keyof T[number],
> = IsTuple<T> extends true ? ExtractValuesFromObjectArrayInternal<T, K> : T[number][K][]

type ExtractValuesFromObjectArrayInternal<
  T extends readonly unknown[],
  K extends keyof T[number],
  Result extends unknown[] = [],
> = T extends readonly [infer Item, ...infer Rest]
  ? ExtractValuesFromObjectArrayInternal<Rest, K, [...Result, Item[K]]>
  : Result

/**
 * Get key-value pairs from array of objects with key K and value V
 * @example type Example = ExtarctPairsFromObjectArray<
 [
 {
   value: 1
   type: 'a'
  },
  {
   value: 2
   type: 'b'
  },
 ],
 'type',
 'value'
> // { a: 1;b: 2;}
 */
export type ExtarctPairsFromObjectArray<
  T extends readonly unknown[],
  K extends ValidKeys<T[number]>,
  V extends keyof Omit<T[number], K>,
> = IsTuple<T> extends true
  ? ExtarctPairsFromObjectArrayInternal<T, K, V, object>
  : Record<T[number][K] extends PropertyKey ? T[number][K] : never, T[number][V]>

type ExtarctPairsFromObjectArrayInternal<
  T extends readonly unknown[],
  K extends ValidKeys<T[number]>,
  V extends keyof Omit<T[number], K>,
  Result,
> = T extends readonly [infer Item, ...infer Others]
  ? ExtarctPairsFromObjectArrayInternal<
      Others,
      K,
      V,
      {
        [Key in keyof Item | keyof Result as Key extends keyof Result
          ? Key
          : Key extends K
            ? Item[K] extends PropertyKey
              ? Item[K]
              : never
            : never]: Key extends keyof Result ? Result[Key] : Item[V]
      }
    >
  : Result

/**
 * Group array by key K
 */
export type GroupBy<
  T extends readonly unknown[],
  K extends keyof T[number],
  Keys extends keyof T[number],
> = IsTuple<T> extends true
  ? GroupByInteralType<T, K, Keys, object>
  : Record<T[number][K] extends PropertyKey ? T[number][K] : never, Pick<T[number], Keys>>

type GroupByInteralType<
  T extends readonly unknown[],
  K extends keyof T[number],
  Keys extends keyof T[number],
  Result,
> = T extends readonly [infer Item, ...infer Others]
  ? GroupByInteralType<
      Others,
      K,
      Keys,
      {
        [Key in keyof Item | keyof Result as Key extends keyof Result
          ? Key
          : Key extends K
            ? Item[K] extends string | number
              ? Item[K]
              : never
            : never]: Key extends keyof Result ? Result[Key] : Pick<Item, Keys>
      }
    >
  : Result

// TODO:
// export type GroupBy<
//  T extends readonly any[],
//  K extends keyof T[number],
//  Keys extends readonly (keyof any)[],
//  Result ,
// > = T extends readonly [infer Item, ...infer Others]
//  ? GroupBy<
//    Others,
//    K,
//    Keys,
//    {
//     [Key in keyof Item | keyof Result as Key extends keyof Result
//      ? Key
//      : Key extends K
//      ? Item[K] extends string | number
//       ? Item[K]
//       : never
//      : never]: Key extends keyof Result ? Result[Key] : MyPick<Item, ArrToUnion<Keys>>
//    }
//    >
//  : Result

// type MyPick<T, K extends keyof any> = {
//  [Key in K]: Key extends keyof T ? T[Key] : never
// }

/**
 * @example type Example = ArrayToUnion<['1', 1, 'g']> // '1' | 1 | 'g'
 */
export type ArrayToUnion<T extends readonly any[]> = T extends [infer Key, ...infer Rest]
  ? Key | ArrayToUnion<Rest>
  : never

/**
 * 从对象中拿出key类型为string的成员
 * @example type Example = PickString<{ a: 1; b: 2;}> // { a: 1; b: 2; }
 */
export type PickString<T> = T extends Record<string, any>
  ? {
      [K in keyof T as K & string]: T[K]
    }
  : never
/**
 * Make any one property in T required, others optional
 * @example type Example = RequiredAnyOne<{ a: 1; b: 2;}> // { a: 1; b?: 2; } | { a?: 1; b: 2; }
 */
export type RequiredAnyOne<T extends Record<string, any>> = RequiredAnyOneInternal<T>

type RequiredAnyOneInternal<T extends Record<string, any>, K = keyof T> = K extends keyof T
  ? Partial<Omit<T, K>> & Required<Pick<T, K>>
  : never

/**
 * @example type Example = IsTuple<[1, '2', 'a']> // true
 * type Example = IsTuple<string[]> // false
 */
export type IsTuple<T> = T extends readonly [...params: infer Eles]
  ? NotEqual<Eles['length'], number>
  : false

/**
 * @example type Example = Equal<1, 1> // true
 * type Example = Equal<1, 2> // false
 */
export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false

export type NotEqual<A, B> = Equal<A, B> extends true ? false : true

export type NotOnly<T, K extends keyof any> = K | Omit<T, K>

/**
 * Create new array with all truthy values
 * @example const example = ['1', 1, undefined, 5, 0, 6, 0n, '', 'g', NaN, 5, false, null] as const
 * type Example = Compact<typeof example> // ["1", 1, 5, 6, "g", 5]
 */
export type Compact<
  Arr extends readonly unknown[],
  Result extends unknown[] = [],
> = Arr extends readonly [infer First, ...infer Rest]
  ? Compact<
  Rest,
  First extends Falsey
    ? Result
    : Equal<First, number> extends true
      ? Result
      : [...Result, First]
 >
  : Result
