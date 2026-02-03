import { useFetch } from '@/hooks'
import { systemApi } from '@/services'
import { useContent } from '@/content'
import { Profile } from '@/pages/Profile'
import { modules } from '@/config/modules'
import { sections } from '@/config/sections'

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border-l-2 border-primary/40 pl-2">
      <div className="text-[10px] text-gray-500">{label}</div>
      <div
        className={[
          'text-lg font-bold md:text-xl',
          accent ? 'text-primary/50' : '',
          'leading-none',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {value}
      </div>
    </div>
  )
}

export function Home() {
  const { t } = useContent()
  const { data, isLoading, error, refetch } = useFetch((signal) => systemApi.getDashboard(signal), [])

  return (
    <>
      <header className="terminal-panel overflow-hidden p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            {sections.profile.heroActiveLabel && (
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                {isLoading ? t('LOADING') : t('ACTIVE')}
              </div>
            )}
            {sections.profile.heroTitle && (
              <h1 className="glow-text text-3xl font-bold leading-tight text-primary md:text-4xl">{t('HERO_TITLE')}</h1>
            )}
            {sections.profile.heroSubtitle && (
              <p className="mt-3 text-[13px] uppercase tracking-widest text-gray-400">{t('HERO_SUBTITLE')}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {sections.profile.heroCtaPrimary && (
                <button
                  type="button"
                  className="group relative overflow-hidden border border-primary bg-primary/10 px-5 py-3 text-[11px] font-bold text-primary transition-all hover:bg-primary hover:text-black"
                  onClick={refetch}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                    {t('CTA_PRIMARY')}
                  </span>
                </button>
              )}

              {sections.profile.heroCtaProjects && modules.portfolio.enabled && (
                <a
                  href="/portfolio"
                  className="rounded border border-primary/20 bg-black/30 px-5 py-3 text-[11px] font-bold text-gray-200 hover:bg-primary/10 hover:text-primary"
                >
                  {t('CTA_VIEW_PROJECTS')}
                </a>
              )}
            </div>
          </div>

          {sections.profile.heroKpis && (
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:w-[420px]">
              <Kpi label={t('KPI_UPTIME')} value={data ? `${data.uptimePct.toFixed(2)}%` : '—'} />
              <Kpi label={t('KPI_LATENCY')} value={data ? `${data.latencyMs}ms` : '—'} />
              <Kpi label={t('KPI_ROLE')} value={t('KPI_ROLE_VALUE')} accent />
              <div className="flex items-end justify-between border-l-2 border-primary/40 pl-2">
                <div>
                  <div className="text-[10px] text-gray-500">{t('KPI_STACK')}</div>
                  <div className="text-lg font-bold leading-none text-primary/50 md:text-xl">{t('KPI_STACK_VALUE')}</div>
                </div>
                <button
                  type="button"
                  onClick={refetch}
                  className="rounded border border-primary/20 bg-primary/5 px-3 py-2 text-[10px] font-bold text-primary hover:bg-primary/10"
                >
                  {t('REFRESH')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error.message}
        </div>
      )}

      <div className="mt-6">
        <Profile />
      </div>

      <footer className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-primary/30">
        {t('FOOTER_COPYRIGHT')}
      </footer>
    </>
  )
}

