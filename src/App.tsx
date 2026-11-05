import { motion } from 'framer-motion'
import {
  Camera,
  CalendarHeart,
  Compass,
  Download,
  HandHeart,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Stamp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Phone from './Phone'
import { BRAND, DOWNLOAD_URL, TAGLINE } from './brand'

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

function DownloadButton() {
  return (
    <a
      href={DOWNLOAD_URL}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-hover"
    >
      <Download size={20} /> Скачать для Android
    </a>
  )
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line/60 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="text-xl font-bold tracking-tight">
          {BRAND}
        </a>
        <nav className="hidden gap-8 text-sm text-dim sm:flex">
          <a href="#features" className="hover:text-white">Возможности</a>
          <a href="#how" className="hover:text-white">Как это работает</a>
          <a href="#faq" className="hover:text-white">Вопросы</a>
        </nav>
        <a href={DOWNLOAD_URL} className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover">
          Скачать
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-24 pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <motion.div {...fade}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-geo">Санкт-Петербург</p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            {TAGLINE}.<br />
            <span className="text-brand">Выходите из дома.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-dim">
            Карта мест и событий вашего города, встречи с теми, кто рядом, просьбы соседей и прогулки с подсказками
            прямо на камере.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <DownloadButton />
            <a href="#features" className="rounded-full border border-line px-7 py-3.5 font-medium hover:border-dim">
              Что внутри
            </a>
          </div>
        </motion.div>
        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}>
          <Phone alt="Карта города в приложении" icon={MapIcon} />
        </motion.div>
      </div>
    </section>
  )
}

type Feature = { icon: LucideIcon; title: string; text: string; tag: string }

const features: Feature[] = [
  {
    icon: MapIcon,
    tag: 'Карта',
    title: 'Весь город на одной карте',
    text: 'Кафе, бары, музеи, достопримечательности и события рядом. Фильтры по категориям, чтобы найти именно то, что хочется сегодня.',
  },
  {
    icon: Zap,
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
    tag: 'Маршруты',
    title: 'Подсказка прямо на камере',
    text: 'Поднимите телефон, и стрелка покажет, куда идти. Маршруты по интересным местам города, записанные самими жителями.',
  },
  {
    icon: Stamp,
    tag: 'Паспорт города',
    title: 'Собирайте штампы за места',
    text: 'Побывали в настоящем месте, получили штамп. Первая прогулка по Петербургу уже ждёт: пятнадцать мест, которые стоит увидеть.',
  },
  {
    icon: MessageCircle,
    tag: 'Чаты и встречи',
    title: 'От знакомства до встречи',
    text: 'Личные чаты, группы и встречи в одном месте. Всё, что вы запланировали, собрано во вкладке «Встречи».',
  },
]

function Features() {
  return (
    <section id="features" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...fade} className="mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Всё, чтобы город стал ближе
        </motion.h2>
        <div className="mt-24 space-y-28">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              {...fade}
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-geo">
                  <f.icon size={16} /> {f.tag}
                </span>
                <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{f.title}</h3>
                <p className="mt-4 max-w-md text-lg text-dim">{f.text}</p>
              </div>
              <Phone alt={f.title} icon={f.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: MapPin, title: 'Откройте карту', text: 'Приложение покажет, что происходит рядом с вами, в вашем районе и по всему городу.' },
  { icon: CalendarHeart, title: 'Выберите или создайте', text: 'Присоединитесь к событию, откликнитесь на просьбу или сами позовите людей кнопкой «Сейчас».' },
  { icon: Compass, title: 'Идите и встречайтесь', text: 'Маршрут подскажет дорогу, чат поможет договориться, а штамп в паспорте останется на память.' },
]

function How() {
  return (
    <section id="how" className="bg-ink2 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...fade} className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Как это работает
        </motion.h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="rounded-3xl border border-line bg-ink p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                  <s.icon size={24} />
                </span>
                <span className="text-sm font-semibold text-dim">Шаг {i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-dim">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const faq = [
  { q: 'Приложение платное?', a: 'Нет, скачать и пользоваться можно бесплатно.' },
  { q: 'Для каких устройств?', a: 'Сейчас для телефонов на Android. Скачайте установочный файл по кнопке на этой странице и откройте его.' },
  { q: 'В каком городе работает?', a: 'Первый город — Санкт-Петербург. Карта, события и маршруты настроены под него. Другие города добавим следом.' },
  { q: 'Зачем приложению геолокация?', a: 'Положение нужно, чтобы показать, что рядом, и поставить точку встречи. Доступ вы выдаёте сами и можете отключить в настройках телефона.' },
  { q: 'Что такое «Сейчас»?', a: 'Быстрый способ позвать людей: напишите, что делаете, выберите время, и активность на два часа появится на карте. Присоединиться может любой.' },
  { q: 'Как предложить место на общую карту?', a: 'Отметьте точку у себя и отправьте на проверку. Амбассадор вашего города посмотрит и решит, показывать ли её всем.' },
]

function Faq() {
  return (
    <section id="faq" className="px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Вопросы
        </motion.h2>
        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-ink2">
          {faq.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {f.q}
                <span className="text-2xl text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-dim">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="px-5 pb-28">
      <motion.div
        {...fade}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-[#9b2d52] px-8 py-20 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Город уже ждёт</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/85">Скачайте {BRAND} и найдите, чем заняться сегодня.</p>
        <a
          href={DOWNLOAD_URL}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#9b2d52] transition hover:scale-[1.03]"
        >
          <Download size={20} /> Скачать для Android
        </a>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 text-center text-sm text-dim">
      © {new Date().getFullYear()} {BRAND}
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <How />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
