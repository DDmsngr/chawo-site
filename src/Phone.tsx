import type { LucideIcon } from 'lucide-react'

type Props = { src?: string; alt: string; icon: LucideIcon; className?: string }

/// Рамка телефона. Пока нет снимка экрана — градиентная заглушка с иконкой.
export default function Phone({ src, alt, icon: Icon, className = '' }: Props) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19] w-[250px] rounded-[2.6rem] border border-line bg-ink2 p-2 shadow-[0_30px_80px_-20px_rgba(229,80,122,0.35)] sm:w-[280px] ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#232328] to-ink">
        {src ? (
          <img src={`${import.meta.env.BASE_URL}screens/${src}`} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div role="img" aria-label={alt} className="flex h-full items-center justify-center">
            <Icon size={64} className="text-brand/70" strokeWidth={1.4} />
          </div>
        )}
      </div>
    </div>
  )
}
