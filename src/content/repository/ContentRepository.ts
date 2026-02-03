import type { Locale } from '@/i18n'
import type { AppContent } from '../types'

export interface ContentRepository {
  get(locale: Locale): AppContent
}

