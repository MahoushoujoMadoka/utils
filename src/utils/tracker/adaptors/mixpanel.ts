import mixpanel from 'mixpanel-browser'
import type { ITracker, InitOptions } from '../types'

export class MixpanelAdaptor<T = any> implements ITracker<T> {
  public constructor(public id: string) {}
  public init(params: InitOptions) {
    mixpanel.init(this.id, params)
  }

  public event<K extends keyof T & string>(name: K, params?: T[K] & Record<string, any>) {
    mixpanel.track(name, params)
  }

  public pageview(params: Record<string, any>) {
    mixpanel.track_pageview(params)
  }

  public setGlobalParams(params: Record<string, any>) {
    mixpanel.register(params)
  }

  public setPeopleProfile({ uniqueId, ...rest }: { uniqueId: string } & Record<string, any>) {
    mixpanel.identify(uniqueId)
    mixpanel.people.set(rest)
  }
}
