export type TrackerType = 'googleAnalytics' | 'mixpanel'

export interface InitOptions {
  persistence?: 'localStorage' | 'cookie'
  debug?: boolean
}

export interface ITracker<T> {
  init: (options: InitOptions) => void
  event: <K extends keyof T & string>(name: K, params?: T[K] & Record<string, any>) => void
  pageview: (params: Record<string, any>) => void
  setPeopleProfile?: (options: { uniqueId: string } & Record<string, any>) => void
  setGlobalParams: (params: Record<string, any>) => void
}
