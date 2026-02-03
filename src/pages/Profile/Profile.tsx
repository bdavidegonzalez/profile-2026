import { Card } from '@/components'
import { useContent } from '@/content'
import { diplomadoPdfUrl } from '@/assets/documents'
import { sections } from '@/config/sections'

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded border border-primary/10 bg-black/30 px-2 py-1 text-[10px] text-gray-300">
      {children}
    </span>
  )
}

export function Profile() {
  const { content, t } = useContent()

  const degrees = content.education.filter((e) => e.type === 'degree')
  const diplomas = content.education.filter((e) => e.type !== 'degree')

  const evidenceByEducationId: Record<string, string> = {
    'edu-diplomado-arq': diplomadoPdfUrl,
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {sections.profile.about && (
        <Card className="col-span-12 lg:col-span-7" title={t('ABOUT_TITLE')} description={t('ABOUT_SUBTITLE')}>
          <div className="space-y-4 text-[13px] leading-relaxed text-gray-300">
            {content.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Card>
      )}

      {sections.profile.education && (
        <Card className="col-span-12 lg:col-span-5" title={t('EDUCATION_TITLE')} description={t('EDUCATION_SUBTITLE')}>
        <div className="space-y-6">
          {sections.profile.educationDegrees && (
            <div className="space-y-5">
              {degrees.map((e) => (
                <div key={e.id} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-bold text-gray-200">{e.program}</div>
                    <div className="text-[10px] uppercase tracking-widest text-primary/60">
                      {e.start} — {e.end}
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500">{e.institution}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections.profile.educationDiplomasAndCertificates && diplomas.length > 0 && (
            <div className="border-t border-primary/10 pt-6">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                {t('DIPLOMA_LABEL')}
              </div>
              <div className="space-y-5">
                {diplomas.map((e) => (
                  <div key={e.id} className="border-l-2 border-primary/20 pl-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="text-sm font-bold text-gray-200">{e.program}</div>
                      {e.start !== '—' && e.end !== '—' && (
                        <div className="text-[10px] uppercase tracking-widest text-primary/60">
                          {e.start} — {e.end}
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500">{e.institution}</div>
                    {e.summary && <p className="mt-2 text-[12px] text-gray-300">{e.summary}</p>}

                    {sections.profile.educationEvidencePdf && evidenceByEducationId[e.id] && (
                      <div className="mt-3">
                        <a
                          href={evidenceByEducationId[e.id]}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded border border-primary/20 bg-primary/5 px-3 py-2 text-[10px] font-bold text-primary hover:bg-primary/10"
                        >
                          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                          {t('VIEW_PDF')}
                        </a>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </Card>
      )}
    </div>
  )
}

