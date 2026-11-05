import type { CSSProperties } from 'react'
import type { Icon } from '@phosphor-icons/react'

type Props = { src?: string; alt: string; icon: Icon; accent?: string; className?: string }

/// Рамка телефона. Пока нет снимка экрана — плоская заглушка с иконкой.
/// Внешний радиус 24, зазор 8, внутренний 16 (формула вложенных радиусов).
export default function Phone({ src, alt, icon: Glyph, accent = '#e5507a', className = '' }: Props) {
  return (
    <div
      style={{ '--accent': accent } as CSSProperties}
      className={`relative mx-auto aspect-[9/19] w-64 rounded-3xl border border-(--accent)/40 bg-card p-2 sm:w-72 ${className}`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-raised">
        {src ? (
          <img src={`${import.meta.env.BASE_URL}screens/${src}`} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div role="img" aria-label={alt} className="flex h-full items-center justify-center bg-(--accent)/15">
            <Glyph size={64} weight="light" className="text-(--accent)" />
          </div>
        )}
      </div>
    </div>
  )
}
