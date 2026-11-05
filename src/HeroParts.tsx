import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

/// Появление блока через delay мс за duration мс.
export function FadeIn({ delay, duration = 1000, children, className = '' }: { delay: number; duration?: number; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShown(true), reduce ? 0 : delay)
    return () => clearTimeout(t)
  }, [delay, reduce])
  return (
    <div
      className={`transition-opacity ${shown ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDuration: `${reduce ? 0 : duration}ms` }}
    >
      {children}
    </div>
  )
}

const CHAR_DELAY = 30

/// Заголовок: строки по \n, каждая буква выезжает слева с задержкой.
export function AnimatedHeading({ text, className = '' }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), reduce ? 0 : 200)
    return () => clearTimeout(t)
  }, [reduce])

  const lines = text.split('\n')
  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        let charIndex = 0
        return (
          <span key={lineIndex} className="block">
            {line.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char) => {
                  const delay = lineIndex * line.length * CHAR_DELAY + charIndex++ * CHAR_DELAY
                  return (
                    <span
                      key={charIndex}
                      className="inline-block transition-[opacity,transform] duration-500"
                      style={{
                        opacity: started ? 1 : 0,
                        transform: started ? 'translateX(0)' : 'translateX(-18px)',
                        transitionDelay: reduce ? '0ms' : `${delay}ms`,
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
                <span className="inline-block">{' '}</span>
              </span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}
