import type { ReactNode } from 'react'

type CardProps = {
  title?: string
  description?: string
  className?: string
  children: ReactNode
}

export function Card({ title, description, className, children }: CardProps) {
  return (
    <section className={['terminal-panel', 'p-6', className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <header className="mb-4">
          {title && <h3 className="text-xs font-bold text-primary">{title}</h3>}
          {description && <p className="mt-1 text-[10px] text-gray-600">{description}</p>}
        </header>
      )}
      {children}
    </section>
  )
}

