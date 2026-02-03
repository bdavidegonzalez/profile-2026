import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Locale } from './types'

const STORAGE_KEY = 'profile.locale'

type I18nState = {
  locale: Locale
  setLocale(locale: Locale): void
}

const I18nContext = createContext<I18nState | null>(null)

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'es'
}

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) return stored

  const browser = navigator.language?.toLowerCase() ?? ''
  if (browser.startsWith('es')) return 'es'
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo<I18nState>(() => ({ locale, setLocale }), [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

