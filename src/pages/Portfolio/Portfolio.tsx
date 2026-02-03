import { Card } from '@/components'
import { useContent } from '@/content'
import { sections } from '@/config/sections'

function canEmbed(url: string) {
  try {
    const u = new URL(url)
    const allowed = new Set([
      'www.youtube.com',
      'youtube.com',
      'player.vimeo.com',
      'vimeo.com',
      'www.loom.com',
      'loom.com',
      'www.instagram.com',
      'instagram.com',
    ])
    return allowed.has(u.hostname)
  } catch {
    return false
  }
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded border border-primary/10 bg-black/30 px-2 py-1 text-[10px] text-gray-300">
      {children}
    </span>
  )
}

function LinkButton({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded border border-primary/20 bg-primary/5 px-3 py-2 text-[10px] font-bold text-primary hover:bg-primary/10"
    >
      {children}
    </a>
  )
}

export function Portfolio() {
  const { content, t } = useContent()

  return (
    <Card title={t('PORTFOLIO_TITLE')} description={t('PORTFOLIO_SUBTITLE')}>
      <div className="grid grid-cols-12 gap-6">
        {content.portfolio.products.map((p) => (
          <section key={p.id} className="terminal-panel col-span-12 p-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="glow-text text-xl font-bold text-primary">{p.name}</h3>
                <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-gray-300">{p.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <LinkButton key={l.url} href={l.url}>
                    {l.label}
                  </LinkButton>
                ))}
              </div>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
              {sections.portfolio.highlights && (
                <div className="lg:col-span-1">
                <div className="text-xs font-bold text-primary">{t('PORTFOLIO_HIGHLIGHTS')}</div>
                <div className="mt-3 space-y-2 text-[12px] text-gray-300">
                  {p.highlights.map((h) => (
                    <div key={h} className="flex gap-2">
                      <span className="text-primary/60">-</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                </div>
              )}

              {sections.portfolio.role && (
                <div className="lg:col-span-1">
                <div className="text-xs font-bold text-primary">{t('PORTFOLIO_ROLE')}</div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px] text-gray-300">
                  {p.role.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                </div>
              )}

              {sections.portfolio.tech && (
                <div className="lg:col-span-1">
                <div className="text-xs font-bold text-primary">{t('PORTFOLIO_TECH')}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((x) => (
                    <Tag key={x}>{x}</Tag>
                  ))}
                </div>
                </div>
              )}

              {sections.portfolio.media && (
                <div className="lg:col-span-1">
                <div className="text-xs font-bold text-primary">{t('PORTFOLIO_MEDIA')}</div>
                <div className="mt-3 space-y-3">
                  {p.media ? (
                    <>
                      <div className="text-[12px] text-gray-300">{p.media.title}</div>

                      {p.media.embedUrl && canEmbed(p.media.embedUrl) ? (
                        <div
                          className={[
                            'relative w-full overflow-hidden border border-primary/10 bg-black/40',
                            p.media.aspect === '9/16' ? 'aspect-[9/16]' : 'aspect-video',
                          ].join(' ')}
                        >
                          <iframe
                            src={p.media.embedUrl}
                            title={p.media.title}
                            className="absolute inset-0 h-full w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                          />
                        </div>
                      ) : (
                        <div className="rounded border border-primary/10 bg-black/30 p-4 text-[12px] text-gray-300">
                          {t('OPEN_MEDIA')}
                        </div>
                      )}

                      <LinkButton href={p.media.url}>{t('OPEN_DEMO')}</LinkButton>
                    </>
                  ) : (
                    <div className="rounded border border-primary/10 bg-black/30 p-4 text-[12px] text-gray-500">
                      —
                    </div>
                  )}
                </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </Card>
  )
}

