import { Card } from '@/components'
import { useContent } from '@/content'

export function Placeholder({ title, subtitle }: { title: string; subtitle?: string }) {
  const { t } = useContent()

  return (
    <Card title={t(title)} description={subtitle ? t(subtitle) : t('COMING_SOON')}>
      <div className="text-sm text-gray-300">
        {t('PLACEHOLDER_COPY')}
      </div>
    </Card>
  )
}

