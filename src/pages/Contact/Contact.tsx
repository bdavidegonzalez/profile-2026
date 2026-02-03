import { Card } from '@/components'
import { useContent } from '@/content'
import { sections } from '@/config/sections'

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

export function Contact() {
  const { content, t } = useContent()

  return (
    <div className="grid grid-cols-12 gap-6">
      {sections.contact.details && (
        <Card className="col-span-12 lg:col-span-7" title={t('CONTACT_TITLE')} description={t('CONTACT_SUBTITLE')}>
          <div className="space-y-4 text-[13px] text-gray-300">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/10 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">{t('CONTACT_EMAIL')}</span>
              <a className="text-primary hover:underline" href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </a>
            </div>

            {content.contact.phone && (
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">{t('CONTACT_PHONE')}</span>
                <a className="text-primary hover:underline" href={`tel:${content.contact.phone}`}>
                  {content.contact.phone}
                </a>
              </div>
            )}

            {content.contact.location && (
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">{t('CONTACT_LOCATION')}</span>
                <span className="text-gray-200">{content.contact.location}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {sections.contact.links && (
        <Card className="col-span-12 lg:col-span-5" title={t('LINKS_TITLE')}>
          <div className="flex flex-wrap gap-2">
            {content.contact.links.map((l) => (
              <LinkButton key={l.url} href={l.url}>
                {l.label}
              </LinkButton>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

