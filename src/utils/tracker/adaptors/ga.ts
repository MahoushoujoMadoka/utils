import ga4 from 'react-ga4'
import type { ITracker } from '../types'

export class GoogleAnalyticsAdaptor<T = any> implements ITracker<T> {
  // public symbol = 'googleAnalytics'
  // public instance = ga4
  private globalParams: Record<string, any> = {}
  public constructor(public id: string) {}
  public init() {
    ga4.initialize(this.id)
  }

  public event<K extends keyof T & string>(name: K, params?: T[K] & Record<string, any>) {
    ga4.event(name, { ...this.globalParams, ...params })
  }

  public pageview(params: Record<string, any>) {
    ga4.send({ ...this.globalParams, ...params, hitType: 'pageview' })
  }

  public setGlobalParams(params: Record<string, any>) {
    this.globalParams = params
  }
}
