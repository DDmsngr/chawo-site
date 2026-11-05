import { useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  CalendarCheck,
  Camera,
  ChatCircleDots,
  Medal,
  PlusCircle,
  Compass,
  DownloadSimple,
  HandHeart,
  Lightning,
  MapPin,
  MapTrifold,
  type Icon,
} from '@phosphor-icons/react'
import Phone from './Phone'
import { AnimatedHeading, FadeIn } from './HeroParts'
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
        <div className="flex h-14 items-center justify-between liquid-glass rounded-xl px-4">
          <a href="#top" className="title-2 font-semibold focus-visible:outline-2 focus-visible:outline-white">
            {BRAND}
          </a>
          <nav aria-label="Разделы" className="caption-1 hidden gap-6 text-gray-100 sm:flex">
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
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}spb-bridge.mp4`}
        poster={`${import.meta.env.BASE_URL}spb-bridge-poster.jpg`}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 pt-24 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading
              text={`${TAGLINE}.
Выходите из дома`}
              className="mb-4 text-4xl font-normal [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl xl:text-7xl"
            />
            <FadeIn delay={800}>
              <p className="mb-5 max-w-[680px] text-base text-gray-100 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:text-lg">
                Карта мест и событий вашего города, встречи с теми, кто рядом, и прогулки с подсказками прямо на камере.
              </p>
            </FadeIn>
            <FadeIn delay={1200}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={DOWNLOAD_URL}
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition duration-300 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
                >
                  Скачать для Android
                </a>
                <a
                  href="#features"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
                >
                  Что внутри
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
            <FadeIn delay={1400}>
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <p className="text-lg font-light md:text-xl lg:text-2xl">Карта. События. Встречи.</p>
              </div>
            </FadeIn>
          </div>
        </div>
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

type Feature = { icon: Icon; title: string; text: string; tag: string; accent: string; shot?: string; points?: [string, string][] }

const features: Feature[] = [
  {
    icon: MapTrifold,
    tag: 'Карта',
    accent: '#4f9dde',
    shot: 'map.jpg',
    title: 'Весь город на одной карте',
    text: 'Кафе, бары, музеи, достопримечательности и события рядом. Фильтры по категориям помогут найти именно то, что хочется сегодня.',
  },
  {
    icon: Lightning,
    tag: 'Сейчас',
    accent: '#e5507a',
    shot: 'now.jpg',
    title: 'Позовите людей за 15 секунд',
    text: 'Гуляем, пьём кофе, играем в настолки. Напишите, что делаете, выберите время, и активность появится на карте на два часа.',
  },
  {
    icon: HandHeart,
    tag: 'Мне надо',
    accent: '#4cc38a',
    shot: 'needs.jpg',
    title: 'Соседи помогают друг другу',
    text: 'Попросить помощи, отдать вещь, найти потерянное, позвать компанию или спросить совета. Восемь типов просьб, и отклик приходит от тех, кто рядом.',
  },
  {
    icon: Camera,
    tag: 'Маршруты и паспорт',
    accent: '#f5a524',
    title: 'Подсказка на камере и штампы за места',
    text: 'Поднимите телефон, и стрелка покажет, куда идти. Побывали в настоящем месте, получили штамп в паспорт города.',
  },
  {
    icon: PlusCircle,
    tag: 'Создать',
    accent: '#2dd4bf',
    title: 'Событие, маршрут или квест за минуту',
    text: 'Выберите формат, и город увидит. Можно позвать людей на встречу, записать путь по городу или придумать задание со своими правилами.',
    shot: 'create.jpg',
  },
  {
    icon: ChatCircleDots,
    tag: 'Каналы и чаты',
    accent: '#a3e635',
    title: 'Новости города, чаты и группы в одном списке',
    text: 'Подпишитесь на каналы вроде «Петербург сегодня», новости, науку и мемы. Личные чаты, группы и встречи лежат рядом, переключайтесь одним касанием.',
    shot: 'channels.jpg',
  },
  {
    icon: Medal,
    tag: 'Профиль и AP',
    accent: '#fb7185',
    title: 'Очки активности за то, что вы делаете в городе',
    text: 'AP копятся за живые действия, а не за время в приложении. Очки засчитываются через сутки после действия, в день можно набрать до 300 AP. В профиле видны ваш город, роль и очки.',
    shot: 'profile.jpg',
    points: [
      ['+1', 'лайк под вашим постом'],
      ['+2', 'комментарий под вашим постом'],
      ['+3', 'штамп в паспорте города'],
      ['+10', 'пришли на событие'],
      ['+20', 'прошли квест с отметкой прихода'],
      ['+30', 'провели событие или собрали коллекцию паспорта'],
    ],
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
              <div style={{ '--accent': f.accent } as CSSProperties}>
                <span className="caption-1 inline-flex items-center gap-2 rounded-full border border-(--accent)/40 bg-(--accent)/15 px-4 py-2 text-(--accent)">
                  <f.icon size={16} weight="bold" aria-hidden /> {f.tag}
                </span>
                <h3 className="heading-3 mt-6 max-w-lg">{f.title}</h3>
                <p className="body-lg mt-4 max-w-md text-dim">{f.text}</p>
                {f.points && (
                  <ul className="mt-6 grid max-w-md gap-2">
                    {f.points.map(([n, t]) => (
                      <li key={t} className="flex items-center gap-3">
                        <span className="caption-1 min-w-16 rounded-lg bg-(--accent)/15 px-2 py-1 text-center text-(--accent)">{n} AP</span>
                        <span className="caption-2 text-gray-300">{t}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Phone alt={f.title} icon={f.icon} accent={f.accent} src={f.shot} />
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

const steps: { icon: Icon; title: string; text: string; accent: string }[] = [
  { icon: MapPin, title: 'Откройте карту', accent: '#4f9dde', text: 'Приложение покажет, что происходит рядом с вами, в вашем районе и по всему городу.' },
  { icon: CalendarCheck, title: 'Выберите или создайте', accent: '#e5507a', text: 'Присоединитесь к событию, откликнитесь на просьбу или сами позовите людей кнопкой «Сейчас».' },
  { icon: Compass, title: 'Идите и встречайтесь', accent: '#4cc38a', text: 'Маршрут подскажет дорогу, чат поможет договориться, а штамп в паспорте останется на память.' },
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
            <motion.div key={s.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} style={{ '--accent': s.accent } as CSSProperties} className="rounded-3xl border border-line bg-card p-8 transition-colors duration-500 ease-base hover:border-(--accent)/60">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-(--accent)/15 text-(--accent)">
                  <s.icon size={24} weight="bold" aria-hidden />
                </span>
                <span className="caption-1 text-(--accent)">Шаг {i + 1}</span>
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
  { q: 'Что такое AP?', a: 'Очки активности. Их начисляют за лайки и комментарии под вашими постами, штампы паспорта, приход на события, квесты и проведение событий. Очки засчитываются через сутки, в день можно набрать до 300 AP.' },
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
      <p>© {new Date().getFullYear()} {BRAND}</p>
      <p className="mx-auto mt-2 max-w-2xl">
        Видео в начале страницы:{' '}
        <a className="underline underline-offset-2 hover:text-white" href="https://commons.wikimedia.org/wiki/File:Bridges_in_Saint_Petersburg_MVI_3926.webm">
          Deror avi
        </a>
        ,{' '}
        <a className="underline underline-offset-2 hover:text-white" href="https://creativecommons.org/licenses/by-sa/4.0/">
          CC BY-SA 4.0
        </a>
        , Wikimedia Commons. Ролик обрезан и сжат.
      </p>
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
