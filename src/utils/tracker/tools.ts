import { GoogleAnalyticsAdaptor, MixpanelAdaptor } from './adaptors'
import type { TrackerType } from './types'

const trackerMap = {
  googleAnalytics: GoogleAnalyticsAdaptor,
  mixpanel: MixpanelAdaptor,
}
export function createTracker<T = any>(type: TrackerType, id: string) {
  const Tracker = trackerMap[type]
  return new Tracker<T>(id)
}
