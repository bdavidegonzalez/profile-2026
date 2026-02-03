import { Card } from '@/components'
import { useContent } from '@/content'
import { sections } from '@/config/sections'

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded border border-primary/10 bg-black/30 px-2 py-1 text-[10px] text-gray-300">
      {children}
    </span>
  )
}

function TimelineItem({
  title,
  subtitle,
  period,
  summary,
  tags,
}: {
  title: string
  subtitle: string
  period: string
  summary: string[]
  tags: string[]
}) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1 h-3 w-3 rounded-full border border-primary/40 bg-black" />
      <div className="absolute left-[5px] top-4 h-[calc(100%-8px)] w-px bg-primary/10" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-sm font-bold text-gray-200">{title}</div>
        <div className="text-[10px] uppercase tracking-widest text-primary/60">{period}</div>
      </div>
      <div className="text-[11px] text-gray-500">{subtitle}</div>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px] text-gray-300">
        {summary.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}

export function Trajectory() {
  const { content, t } = useContent()

  return (
    <Card title={t('EXPERIENCE_TITLE')} description={t('EXPERIENCE_SUBTITLE')}>
      {sections.trajectory.timeline ? (
        <div className="space-y-8">
          {content.experience.map((e) => (
            <TimelineItem
              key={e.id}
              title={e.role}
              subtitle={[e.company, e.client ? `— ${e.client}` : ''].filter(Boolean).join(' ')}
              period={`${e.start} — ${e.end}`}
              summary={e.summary}
              tags={sections.trajectory.tags ? e.tags : []}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500">—</div>
      )}
    </Card>
  )
}

