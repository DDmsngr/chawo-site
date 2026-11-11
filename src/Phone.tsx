import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Icon } from '@phosphor-icons/react'

type Props = { src?: string; alt: string; icon: Icon; accent?: string; className?: string; eager?: boolean }

/// Рамка телефона. Пока нет снимка экрана — плоская заглушка с иконкой. Смена src — плавная смена снимка.
/// Внешний радиус 24, зазор 8, внутренний 16 (формула вложенных радиусов).
export default function Phone({ src, alt, icon: Glyph, accent = '#e5507a', className = '', eager = false }: Props) {
  return (
    <div
      style={{ '--accent': accent } as CSSProperties}
      className={`relative mx-auto aspect-[9/19] w-64 rounded-3xl border border-(--accent)/40 bg-card p-2 sm:w-72 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-raised">
        {src ? (
          <AnimatePresence initial={false}>
            <motion.img
              key={src}
              src={`${import.meta.env.BASE_URL}screens/${src}`}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={eager ? 'eager' : 'lazy'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        ) : (
          <div role="img" aria-label={alt} className="flex h-full items-center justify-center bg-(--accent)/15">
            <Glyph size={64} weight="light" className="text-(--accent)" />
          </div>
        )}
      </div>
    </div>
  )
}
