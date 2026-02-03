import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useI18n, type Locale } from '@/i18n'
import type { AppContent } from './types'
import type { ContentRepository } from './repository/ContentRepository'
import { StaticJsonContentRepository } from './repository/StaticJsonContentRepository'

type ContentState = {
  locale: Locale
  setLocale(locale: Locale): void
  content: AppContent
  t(key: string, vars?: Record<string, string | number>): string
}

const ContentContext = createContext<ContentState | null>(null)

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`))
}

export function ContentProvider({
  children,
  repository = new StaticJsonContentRepository(),
}: {
  children: ReactNode
  repository?: ContentRepository
}) {
  const { locale, setLocale } = useI18n()
  const content = repository.get(locale)

  const value = useMemo<ContentState>(
    () => ({
      locale,
      setLocale,
      content,
      t: (key, vars) => interpolate(content.strings[key] ?? key, vars),
    }),
    [locale, setLocale, content],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}

