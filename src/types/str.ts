import type { Falsey } from './aliases'

/**
 * @example type Example = PascalCaseJoin<['hello', 'world']> // 'HelloWorld'
 */
export type PascalCaseJoin<T extends readonly unknown[]> = PascalCaseJoinInernal<T>
type PascalCaseJoinInernal<T, Result = ''> = T extends readonly [infer First, ...infer Rest]
  ? First extends Falsey
    ? PascalCaseJoinInernal<Rest, Result>
    : PascalCaseJoinInernal<Rest, `${Result & string}${Capitalize<First & string>}`>
  : Result extends Falsey
  ? string
  : Result
/**
 * @example type Example = CamelCaseJoin<['hello', 'world']> // 'helloWorld'
 */
export type CamelCaseJoin<T extends readonly unknown[]> = PascalCaseJoinInernal<T> extends string
  ? string
  : Uncapitalize<PascalCaseJoinInernal<T>>
