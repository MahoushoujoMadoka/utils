import type { ITracker, InitOptions } from './types'

export class Trackers<T> implements ITracker<T> {
  public constructor(private trackers: ITracker<T>[]) {}

  public init(params: InitOptions) {
    this.invoke('init', params)
  }

  public event<K extends keyof T & string>(name: K, params?: T[K] & Record<string, any>) {
    this.invoke('event', name, params)
  }

  public pageview(params: Record<string, any>) {
    this.invoke('pageview', params)
  }

  public setGlobalParams(params: Record<string, any>) {
    this.invoke('setGlobalParams', params)
  }

  public setPeopleProfile(params: { uniqueId: string } & Record<string, any>) {
    this.invoke('setPeopleProfile', params)
  }

  protected invoke<M extends keyof ITracker<T>>(
    method: M,
    ...params: Parameters<Required<ITracker<T>>[M]>
  ) {
    // @ts-expect-error
    // eslint-disable-next-line prefer-spread
    this.trackers.forEach((tracker) => tracker[method]?.apply(tracker, params))
  }
}
