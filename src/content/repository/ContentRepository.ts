import type { Locale, AppContent } from '@/models'

export interface ContentRepository {
  get(locale: Locale): AppContent
}

