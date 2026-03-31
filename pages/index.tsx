import { useEffect, useState } from 'react'
import Head from 'next/head'

const sections = [
  { id: 'about', label: '> PROFILE' },
  { id: 'experience', label: '> EXPERIENCE' },
  { id: 'skills', label: '> STACK' },
  { id: 'projects', label: '> CASES' },
  { id: 'education', label: '> EDUCATION' },
  { id: 'contact', label: '> CONTACT' },
] as const

type SectionId = (typeof sections)[number]['id']

type ProfileField = {
  label: string
  value: string
  highlight?: boolean
}

type ExperienceEntry = {
  company: string
  role: string
  period: string
  bullets: string[]
  achievement?: string
}

type SkillEntry = {
  name: string
  level: number
}

type SkillGroup = {
  title: string
  items: SkillEntry[]
}

type CaseEntry = {
  title: string
  subtitle: string
  description: string
}

type EducationEntry = {
  title: string
  subtitle: string
  period: string
  details: string
}

type ContactEntry = {
  title: string
  value: string
  href?: string
  note?: string
}

const resumeUpdated = '13.03.2026'

const bootMessages = [
  'NDS BIOS Date 03/13/26 18:21 Ver: 1.0.0',
  'PROFILE: GORDEEV V.S.',
  'TARGET ROLE: LINUX SYSADMIN / DEVOPS',
  'LOCATION: BALASHIKHA, RUSSIA',
  '',
  'Checking Monitoring Stack ... ELK / GRAFANA / SQL',
  'Checking Infrastructure ... LINUX / WINDOWS / PROXMOX',
  'Checking Automation ... DOCKER / ANSIBLE / GIT',
  '',
  'Loading RESUME.OS...',
  '',
] as const

const profileColumns: ProfileField[][] = [
  [
    { label: 'NAME', value: 'Гордеев Владимир Сергеевич' },
    { label: 'ROLE', value: 'Системный администратор Linux / DevOps-инженер' },
    { label: 'LOCATION', value: 'Балашиха, Московская область' },
    { label: 'EXPERIENCE', value: '4+ года' },
  ],
  [
    { label: 'EMAIL', value: 'sikpro1337@yandex.ru' },
    { label: 'PHONE', value: '+7 (966) 140-55-56' },
    { label: 'SALARY', value: '150 000 ₽ net' },
    { label: 'STATUS', value: 'Полная занятость, гибрид / офис / удалённо', highlight: true },
  ],
]

const aboutSummary = [
  'Я практикующий системный администратор с опытом работы в производстве и финансовом секторе. Развиваюсь в сторону DevOps и использую Docker, Ansible, Git, Grafana и SQL для автоматизации рутинных задач и сопровождения инфраструктуры.',
  'Имею реальный опыт администрирования Linux и Windows, работы с Proxmox, сетями, VPN, мониторингом и анализом логов. Ищу проект, где смогу углублять компетенции в виртуализации, мониторинге и облачных технологиях.',
]

const experienceItems: ExperienceEntry[] = [
  {
    company: 'Сбер',
    role: 'Старший инженер по сопровождению',
    period: 'Июнь 2024 — настоящее время',
    bullets: [
      'Сопровождение и мониторинг распределённой системы устройств SberDevices на базе Android.',
      'Агрегация, анализ и визуализация логов и метрик с использованием ELK и Grafana.',
      'Построение мониторинга ключевых показателей устройств в реальном времени.',
      'Трекинг багов в Jira, ведение технической документации в Confluence и взаимодействие с разработкой и поддержкой.',
      'Анализ инцидентов и коммуникация между линиями поддержки для ускорения решения проблем.',
    ],
    achievement:
      'Собрал и визуализировал метрики с Android-устройств в Grafana из ClickHouse, что сократило время первичной диагностики.',
  },
  {
    company: 'АО Эфти Косметикс',
    role: 'Системный администратор',
    period: 'Апрель 2022 — Июнь 2024',
    bullets: [
      'Администрирование Linux-серверов CentOS/Debian и Windows Server 2008/2019/2022.',
      'Поддержка AD, DNS, DHCP, VPN на базе OpenVPN и диагностика сетевых проблем.',
      'Внедрение виртуализации на базе Proxmox: миграция физических серверов, управление ВМ и LVM-разметкой.',
      'Автоматизация рутинных задач и конфигураций с помощью Ansible.',
      'Управление приложениями и сервисами через Docker.',
      'Участие в модернизации ИТ-инфраструктуры, выборе оборудования и монтаже СКС.',
    ],
    achievement:
      'Организовал Mesh-сеть на складе с нуля и обеспечил стабильное покрытие для ТСД и рабочих станций по всей площади.',
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'INFRASTRUCTURE',
    items: [
      { name: 'Linux Administration', level: 95 },
      { name: 'Windows Server', level: 84 },
      { name: 'Proxmox / Virtualization', level: 90 },
      { name: 'DNS / DHCP / TCP-IP / VPN', level: 88 },
      { name: 'Docker', level: 82 },
      { name: 'Ansible', level: 80 },
    ],
  },
  {
    title: 'MONITORING & TOOLS',
    items: [
      { name: 'Grafana', level: 90 },
      { name: 'ELK / Kibana', level: 86 },
      { name: 'SQL / ClickHouse', level: 74 },
      { name: 'Git', level: 78 },
      { name: 'Jira / Confluence', level: 84 },
      { name: 'Android Troubleshooting', level: 76 },
    ],
  },
]

const caseItems: CaseEntry[] = [
  {
    title: 'SBERDEVICES MONITORING',
    subtitle: 'Grafana + ClickHouse + ELK',
    description:
      'Сбор, агрегация и визуализация метрик Android-устройств для ускорения диагностики инцидентов и анализа состояния парка.',
  },
  {
    title: 'PROXMOX MIGRATION',
    subtitle: 'Virtualization rollout',
    description:
      'Перенос физических серверов в виртуальную среду Proxmox с настройкой ВМ, LVM и базовой отказоустойчивости.',
  },
  {
    title: 'WAREHOUSE MESH NETWORK',
    subtitle: 'Wireless infrastructure from scratch',
    description:
      'Проектирование топологии и развёртывание Mesh-сети на складе для стабильной работы ТСД и рабочих станций.',
  },
]

const educationItems: EducationEntry[] = [
  {
    title: 'Российский государственный аграрный заочный университет',
    subtitle: 'Бакалавр, Менеджмент',
    period: '2018',
    details: 'Факультет экономики и права, Балашиха.',
  },
  {
    title: 'АНО ДПО «Образовательные технологии Яндекса»',
    subtitle: 'Инженер облачных сервисов',
    period: '2023',
    details: 'Повышение квалификации и итоговое тестирование по облачным сервисам.',
  },
  {
    title: 'Stepik / Bioinformatics Institute',
    subtitle: 'Linux, электронный сертификат «Введение в Linux»',
    period: '2022',
    details: 'Подтверждённая подготовка по Linux и базовым системным практикам.',
  },
]

const contactItems: ContactEntry[] = [
  {
    title: 'EMAIL',
    value: 'sikpro1337@yandex.ru',
    href: 'mailto:sikpro1337@yandex.ru',
  },
  {
    title: 'PHONE',
    value: '+7 (966) 140-55-56',
    href: 'tel:+79661405556',
  },
  {
    title: 'LOCATION',
    value: 'Балашиха, Московская область',
    note: 'Готов к переезду по России и к командировкам.',
  },
  {
    title: 'WORK FORMAT',
    value: 'Гибрид / офис / удалённо',
    note: 'Полная занятость, время в пути не критично.',
  },
  {
    title: 'LANGUAGES',
    value: 'Русский — родной, English — B1',
  },
  {
    title: 'DRIVING LICENSE',
    value: 'Категории B, D',
  },
]

function ProfileColumn({ items }: { items: ProfileField[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <p key={item.label}>
          <span className="bios-gray">{item.label}:</span>{' '}
          <span className={item.highlight ? 'bios-highlight' : 'bios-text'}>{item.value}</span>
        </p>
      ))}
    </div>
  )
}

function ExperienceCard({ item }: { item: ExperienceEntry }) {
  return (
    <div className="bios-border p-4">
      <p className="bios-highlight">
        {item.role} @ {item.company}
      </p>
      <p className="bios-gray">{item.period}</p>
      <ul className="list-disc list-inside mt-3 space-y-1">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {item.achievement ? (
        <p className="mt-3">
          <span className="bios-highlight">[ACHIEVEMENT]</span> {item.achievement}
        </p>
      ) : null}
    </div>
  )
}

function SkillGroupPanel({ group }: { group: SkillGroup }) {
  return (
    <div>
      <p className="bios-highlight mb-2">{group.title}</p>
      <div className="space-y-2">
        {group.items.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between gap-4">
              <p>{item.name}</p>
              <span className="bios-gray">{item.level}%</span>
            </div>
            <div className="h-4 border bios-border mt-1" style={{ borderColor: '#AAAAAA' }}>
              <div className="bios-progress-fill h-full" style={{ width: `${item.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseCard({ item }: { item: CaseEntry }) {
  return (
    <div className="bios-border p-4">
      <p className="bios-highlight">{item.title}</p>
      <p className="bios-gray">{item.subtitle}</p>
      <p className="mt-2">{item.description}</p>
    </div>
  )
}

function EducationCard({ item }: { item: EducationEntry }) {
  return (
    <div className="bios-border p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="bios-highlight">{item.title}</p>
          <p className="bios-gray">{item.subtitle}</p>
        </div>
        <p className="bios-gray">{item.period}</p>
      </div>
      <p className="mt-3">{item.details}</p>
    </div>
  )
}

function ContactCard({ item }: { item: ContactEntry }) {
  return (
    <div className="bios-border p-4">
      <p className="bios-highlight">{item.title}</p>
      {item.href ? (
        <a className="bios-link mt-2 inline-block" href={item.href}>
          {item.value}
        </a>
      ) : (
        <p className="mt-2">{item.value}</p>
      )}
      {item.note ? <p className="bios-gray mt-2">{item.note}</p> : null}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const [bootComplete, setBootComplete] = useState(false)
  const [bootLines, setBootLines] = useState<string[]>([])
  const [bootIndex, setBootIndex] = useState(0)

  useEffect(() => {
    if (bootIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setBootLines((previousLines) => [...previousLines, bootMessages[bootIndex]])
        setBootIndex((previousIndex) => previousIndex + 1)
      }, 300)

      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => setBootComplete(true), 500)
    return () => clearTimeout(timer)
  }, [bootIndex])

  useEffect(() => {
    if (!bootComplete) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = sections.findIndex((section) => section.id === activeSection)

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % sections.length
        setActiveSection(sections[nextIndex].id)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        const previousIndex = (currentIndex - 1 + sections.length) % sections.length
        setActiveSection(sections[previousIndex].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, bootComplete])

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-4">
            <p className="bios-highlight">[SYSTEM INFORMATION]</p>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              {profileColumns.map((column, index) => (
                <ProfileColumn key={sections[index]?.label ?? index} items={column} />
              ))}
            </div>

            <div className="bios-border p-4 mt-6">
              <p className="bios-highlight">[CAREER TARGET]</p>
              <p className="mt-2">
                Linux-системное администрирование, сопровождение инфраструктуры, мониторинг и
                постепенный рост в сторону DevOps и облачных сервисов.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {aboutSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[WORK HISTORY]</p>
            <div className="space-y-4 mt-4">
              {experienceItems.map((item) => (
                <ExperienceCard key={`${item.company}-${item.period}`} item={item} />
              ))}
            </div>
          </div>
        )
      case 'skills':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[SKILL MATRIX]</p>
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
              {skillGroups.map((group) => (
                <SkillGroupPanel key={group.title} group={group} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bios-border p-4">
                <p className="bios-highlight">LANGUAGES</p>
                <p className="mt-2">Русский — родной</p>
                <p>Английский — B1 (средний)</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">ADDITIONAL</p>
                <p className="mt-2">OSINT, техническая поддержка, тестирование Android.</p>
                <p>Права категории B, D.</p>
              </div>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[KEY CASES]</p>
            <div className="space-y-4 mt-4">
              {caseItems.map((item) => (
                <CaseCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        )
      case 'education':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[EDUCATION & COURSES]</p>
            <div className="space-y-4 mt-4">
              {educationItems.map((item) => (
                <EducationCard key={`${item.title}-${item.period}`} item={item} />
              ))}
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[COMMUNICATION CHANNELS]</p>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              {contactItems.map((item) => (
                <ContactCard key={item.title} item={item} />
              ))}
            </div>
            <div className="bios-border p-4">
              <p className="bios-highlight">REFERENCE</p>
              <p className="mt-2">Сбер, Андрей (тимлид).</p>
            </div>
            <p className="mt-6 bios-highlight animate-blink">_</p>
          </div>
        )
      default:
        return null
    }
  }

  if (!bootComplete) {
    return (
      <div
        className="min-h-screen bg-[#0000AA] p-8 crt-flicker"
        style={{ fontSize: 18, fontWeight: 700 }}
      >
        <Head>
          <title>RESUME.OS - Boot Sequence</title>
          <meta
            name="description"
            content="BIOS-style resume website for Vladimir Gordeev, Linux system administrator and DevOps-oriented engineer."
          />
        </Head>
        {bootLines.map((line, index) => (
          <p key={index} className={line.includes('...') ? 'bios-highlight' : ''} style={{ fontWeight: 700 }}>
            {line}
          </p>
        ))}
        <p className="animate-blink">_</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-[#0000AA] crt-flicker relative"
      style={{ fontSize: 18, fontWeight: 700 }}
    >
      <Head>
        <title>RESUME.OS | Гордеев Владимир Сергеевич</title>
        <meta
          name="description"
          content="Интерактивное BIOS-резюме Владимира Гордеева: Linux, Proxmox, Grafana, ELK, Docker, Ansible."
        />
      </Head>

      <div className="scanline fixed inset-0 pointer-events-none z-50"></div>

      <div className="p-4 md:p-8">
        <header className="bios-border p-4 mb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="bios-highlight text-xl">Resume Page GORDEEV V.S.</h1>
              <p className="bios-gray">BIOS Version 1.0.0 - Linux Sysadmin Edition</p>
            </div>
            <div className="text-left md:text-right">
              <p className="bios-highlight">{resumeUpdated}</p>
              <p className="bios-gray">PROFILE READY</p>
            </div>
          </div>
        </header>

        <nav className="bios-border p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`bios-button ${activeSection === section.id ? 'active' : ''}`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="bios-border p-6 min-h-[400px]">{renderContent()}</main>

        <footer className="bios-border p-4 mt-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="bios-gray">Target compensation: 150 000 ₽ net</p>
            <p className="bios-highlight">[←/→/↑/↓ Navigate] [ENTER Select]</p>
            <p className="bios-highlight">© 2026</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
