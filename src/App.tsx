import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  CalendarCheck,
  Camera,
  ChatCircleDots,
  Compass,
  DownloadSimple,
  HandHeart,
  Lightning,
  MapPin,
  MapTrifold,
  type Icon,
} from '@phosphor-icons/react'
import Phone from './Phone'
import { BRAND, DOWNLOAD_URL, TAGLINE } from './brand'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/// Появление секции: подъём на 32px и проявление, один раз. При reduced motion только прозрачность.
function useReveal() {
  const reduce = useReducedMotion()
  return {
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduce ? 0.3 : 0.7, ease: EASE },
  }
}

function DownloadButton({ large = false, white = false }: { large?: boolean; white?: boolean }) {
  return (
    <a
      href={DOWNLOAD_URL}
      className={`btn ${white ? 'btn-white' : 'btn-brand'} ${large ? 'button-lg' : 'button-md'}`}
    >
      <DownloadSimple size={20} weight="bold" aria-hidden /> Скачать для Android
    </a>
  )
}

const navLinks = [
  { href: '#features', label: 'Возможности' },
  { href: '#how', label: 'Как это работает' },
  { href: '#faq', label: 'Вопросы' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const line = 'absolute left-0 top-1/2 h-0.5 w-6 -mt-px rounded-full bg-white'

  return (
    <>
      <header className="fixed inset-x-4 top-4 z-40 mx-auto max-w-3xl">
        <div className="flex h-14 items-center justify-between rounded-2xl border border-line bg-ink2/70 px-4 backdrop-blur-md">
          <a href="#top" className="title-2 font-semibold focus-visible:outline-2 focus-visible:outline-white">
            {BRAND}
          </a>
          <nav aria-label="Разделы" className="caption-1 hidden gap-6 text-dim sm:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition duration-300 ease-base hover:text-white focus-visible:outline-2 focus-visible:outline-white">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={DOWNLOAD_URL} className="btn btn-brand button-sm">
              Скачать
            </a>
            <button
              type="button"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative size-8 rounded-lg transition duration-300 ease-base active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-white sm:hidden"
            >
              <span className="absolute left-1 top-0 size-6">
                <motion.span
                  className={line}
                  animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
                <motion.span
                  className={line}
                  animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-30 flex flex-col gap-6 bg-ink/90 px-6 pt-24 backdrop-blur-2xl sm:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.06, 0.4) }}
                className="heading-5 focus-visible:outline-2 focus-visible:outline-white"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const reveal = useReveal()
  return (
    <section id="top" className="px-4 pb-24 pt-24 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div {...reveal}>
          <p className="caption-1 mb-4 text-geo">Петербург</p>
          <h1 className="heading-1 max-w-[680px] bg-gradient-to-r from-white to-[#9b9b9b] bg-clip-text text-transparent">
            {TAGLINE}.<br />
            Выходите из дома
          </h1>
          <p className="body-lg mt-6 max-w-[680px] text-dim">
            Карта мест и событий вашего города, встречи с теми, кто рядом, просьбы соседей и прогулки с подсказками
            прямо на камере.
          </p>
          <div className="mt-8">
            <DownloadButton large />
          </div>
          <p className="caption-2 mt-4 text-dim">Первая прогулка по Петербургу уже в приложении: пятнадцать мест.</p>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <Phone alt="Карта города в приложении" icon={MapTrifold} />
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const reveal = useReveal()
  return (
    <section className="bg-ink2 px-4 py-24 sm:px-6">
      <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
        <h2 className="heading-3">Город рядом, а вы об этом не знаете</h2>
        <p className="body-lg mt-6 text-dim">
          Афиши, чаты и карты живут в разных местах, и новые знакомства остаются в планах. {BRAND} собирает всё в одном
          приложении: открыли и видите, что происходит рядом прямо сейчас.
        </p>
      </motion.div>
    </section>
  )
}

type Feature = { icon: Icon; title: string; text: string; tag: string }

const features: Feature[] = [
  {
    icon: MapTrifold,
    tag: 'Карта',
    title: 'Весь город на одной карте',
    text: 'Кафе, бары, музеи, достопримечательности и события рядом. Фильтры по категориям помогут найти именно то, что хочется сегодня.',
  },
  {
    icon: Lightning,
    tag: 'Сейчас',
    title: 'Позовите людей за 15 секунд',
    text: 'Гуляем, пьём кофе, играем в настолки. Напишите, что делаете, выберите время, и активность появится на карте на два часа.',
  },
  {
    icon: HandHeart,
    tag: 'Мне надо',
    title: 'Соседи помогают друг другу',
    text: 'Попросить помощи, отдать вещь, найти потерянное, позвать компанию или спросить совета. Восемь типов просьб, и отклик приходит от тех, кто рядом.',
  },
  {
    icon: Camera,
    tag: 'Маршруты и паспорт',
    title: 'Подсказка на камере и штампы за места',
    text: 'Поднимите телефон, и стрелка покажет, куда идти. Побывали в настоящем месте, получили штамп в паспорт города.',
  },
  {
    icon: ChatCircleDots,
    tag: 'Чаты и встречи',
    title: 'От знакомства до встречи',
    text: 'Личные чаты, группы и встречи в одном месте. Всё, что вы запланировали, собрано во вкладке «Встречи».',
  },
]

function Features() {
  const reveal = useReveal()
  return (
    <section id="features" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...reveal} className="heading-2 mx-auto max-w-2xl text-center">
          Всё, чтобы город стал ближе
        </motion.h2>
        <div className="mt-24 space-y-24">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              {...reveal}
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div>
                <span className="caption-1 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-geo">
                  <f.icon size={16} weight="bold" aria-hidden /> {f.tag}
                </span>
                <h3 className="heading-3 mt-6 max-w-lg">{f.title}</h3>
                <p className="body-lg mt-4 max-w-md text-dim">{f.text}</p>
              </div>
              <Phone alt={f.title} icon={f.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const tagline = 'Выходите на улицу. Город уже собрал для вас места, людей и дела.'

function TaglineWord({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.3, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

/// Слоган на весь экран: слова проявляются по очереди при прокрутке.
function TaglineReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = tagline.split(' ')

  return (
    <section ref={ref} className="bg-ink2 px-4 py-24 sm:px-6">
      <p className="heading-2 mx-auto max-w-2xl">
        {reduce
          ? tagline
          : words.map((w, i) => <TaglineWord key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />)}
      </p>
    </section>
  )
}

const steps: { icon: Icon; title: string; text: string }[] = [
  { icon: MapPin, title: 'Откройте карту', text: 'Приложение покажет, что происходит рядом с вами, в вашем районе и по всему городу.' },
  { icon: CalendarCheck, title: 'Выберите или создайте', text: 'Присоединитесь к событию, откликнитесь на просьбу или сами позовите людей кнопкой «Сейчас».' },
  { icon: Compass, title: 'Идите и встречайтесь', text: 'Маршрут подскажет дорогу, чат поможет договориться, а штамп в паспорте останется на память.' },
]

function How() {
  const reveal = useReveal()
  return (
    <section id="how" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...reveal} className="heading-2 text-center">
          Как это работает
        </motion.h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="rounded-3xl border border-line bg-card p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-raised text-brand">
                  <s.icon size={24} weight="bold" aria-hidden />
                </span>
                <span className="caption-1 text-dim">Шаг {i + 1}</span>
              </div>
              <h3 className="title-2 mt-6">{s.title}</h3>
              <p className="body-3 mt-3 text-dim">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const faq = [
  { q: 'Для каких устройств приложение?', a: 'Сейчас для телефонов на Android. Скачайте установочный файл по кнопке на этой странице и откройте его.' },
  { q: 'В каком городе работает?', a: 'Первый город — Петербург. Карта, события и маршруты настроены под него. Другие города добавим следом.' },
  { q: 'Зачем приложению геолокация?', a: 'Положение нужно, чтобы показать, что рядом, и поставить точку встречи. Доступ вы выдаёте сами и можете отключить в настройках телефона.' },
  { q: 'Что такое «Сейчас»?', a: 'Быстрый способ позвать людей: напишите, что делаете, выберите время, и активность на два часа появится на карте. Присоединиться может любой.' },
  { q: 'Что такое «Мне надо»?', a: 'Просьба к тем, кто рядом: помощь, обмен, потерянная или найденная вещь, компания, совет или специалист. Отклик приходит прямо в приложение.' },
  { q: 'Что такое паспорт города?', a: 'Подборка настоящих мест с маршрутом. Когда вы приходите на место, приложение ставит штамп. Первая прогулка по Петербургу состоит из пятнадцати мест.' },
  { q: 'Как предложить место на общую карту?', a: 'Отметьте точку у себя и отправьте на проверку. Амбассадор вашего города посмотрит и решит, показывать ли её всем.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

function Faq() {
  const reveal = useReveal()
  return (
    <section id="faq" className="bg-ink2 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...reveal} className="heading-2 text-center">
          Вопросы
        </motion.h2>
        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-card">
          {faq.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="title-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-white">
                {f.q}
                <span aria-hidden className="text-2xl text-brand transition duration-300 ease-base group-open:rotate-45">+</span>
              </summary>
              <p className="body-3 mt-3 text-dim">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  )
}

function Cta() {
  const reveal = useReveal()
  return (
    <section className="px-4 py-24 sm:px-6">
      <motion.div {...reveal} className="mx-auto max-w-5xl rounded-3xl bg-brand px-6 py-24 text-center">
        <h2 className="heading-2">Город уже ждёт</h2>
        <p className="body-lg mx-auto mt-4 max-w-md text-white/90">Скачайте {BRAND} и найдите, чем заняться сегодня.</p>
        <div className="mt-8 flex justify-center">
          <DownloadButton large white />
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10 text-center caption-2 text-dim sm:px-6">
      © {new Date().getFullYear()} {BRAND}
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="button-sm sr-only rounded-xl bg-white px-3 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Перейти к содержимому
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Features />
        <TaglineReveal />
        <How />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
