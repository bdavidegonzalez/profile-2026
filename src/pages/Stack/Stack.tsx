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

export function Stack() {
  const { content, t } = useContent()

  return (
    <Card title={t('STACK_TITLE')} description={t('STACK_SUBTITLE')}>
      {sections.stack.categories ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {content.stack.categories.map((cat) => (
            <section key={cat.id} className="terminal-panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-primary">{cat.title}</h3>
                <span className="text-[10px] text-primary/40">{String(cat.items.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500">—</div>
      )}
    </Card>
  )
}

