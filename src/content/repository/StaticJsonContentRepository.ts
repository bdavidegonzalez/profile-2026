import type { Locale } from '@/i18n'
import type { AppContent } from '../types'
import type { ContentRepository } from './ContentRepository'

import en from '../static/en.json'
import es from '../static/es.json'

const byLocale: Record<Locale, AppContent> = {
  en,
  es,
}

export class StaticJsonContentRepository implements ContentRepository {
  get(locale: Locale): AppContent {
    return byLocale[locale]
  }
}

