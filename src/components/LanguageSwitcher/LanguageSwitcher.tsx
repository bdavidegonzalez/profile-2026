import { useContent } from '@/content'
import type { Locale } from '@/i18n'

function LocaleButton({
  locale,
  current,
  onChange,
  label,
}: {
  locale: Locale
  current: Locale
  onChange(locale: Locale): void
  label: string
}) {
  const isActive = locale === current
  return (
    <button
      type="button"
      onClick={() => onChange(locale)}
      className={[
        'rounded border px-2 py-1 text-[10px] font-bold tracking-widest transition-colors',
        isActive ? 'border-primary/50 bg-primary/10 text-primary' : 'border-primary/10 bg-black/30 text-gray-500 hover:text-primary',
      ].join(' ')}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useContent()

  return (
    <div className="flex items-center gap-2">
      <LocaleButton locale="en" current={locale} onChange={setLocale} label="EN" />
      <LocaleButton locale="es" current={locale} onChange={setLocale} label="ES" />
    </div>
  )
}

