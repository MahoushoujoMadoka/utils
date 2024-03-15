import type { Falsey } from './aliases'
import type { Equal } from './tools'

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
export type CamelCaseJoin<T extends readonly unknown[]> = Equal< PascalCaseJoinInernal<T>, string> extends true
  ? string
  : Uncapitalize<PascalCaseJoinInernal<T>>
