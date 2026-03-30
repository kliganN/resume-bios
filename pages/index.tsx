import { useState, useEffect } from 'react'
import Head from 'next/head'

const sections = [
  { id: 'about', label: '> ABOUT' },
  { id: 'experience', label: '> EXPERIENCE' },
  { id: 'skills', label: '> SKILLS' },
  { id: 'projects', label: '> PROJECTS' },
  { id: 'contact', label: '> CONTACT' },
] as const

const bootMessages = [
  'NDS BIOS Date 03/21/26 15:42:18 Ver: 1.0.0',
  'CPU: AMD RYZEN 9 5900X',
  'Memory Test: 65536K OK',
  '',
  'Detecting Primary Master ... DEV',
  'Detecting Primary Slave ... None',
  'Detecting Secondary Master ... None',
  'Detecting Secondary Slave ... None',
  '',
  'Loading RESUME.OS...',
  '',
]

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [bootComplete, setBootComplete] = useState(false)
  const [bootLines, setBootLines] = useState<string[]>([])
  const [bootIndex, setBootIndex] = useState(0)

  useEffect(() => {
    if (bootIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setBootLines(prev => [...prev, bootMessages[bootIndex]])
        setBootIndex(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setBootComplete(true), 500)
      return () => clearTimeout(timer)
    }
  }, [bootIndex])

  useEffect(() => {
    if (!bootComplete) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.findIndex(s => s.id === activeSection)
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % sections.length
        setActiveSection(sections[nextIndex].id)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length
        setActiveSection(sections[prevIndex].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [bootComplete, activeSection])

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-4">
            <p className="bios-highlight">[SYSTEM INFORMATION]</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p><span style={{ color: '#AAAAAA' }}>NAME:</span> <span className="bios-text">John Doe</span></p>
                <p><span style={{ color: '#AAAAAA' }}>ROLE:</span> <span className="bios-text">Full Stack Developer</span></p>
                <p><span style={{ color: '#AAAAAA' }}>LOCATION:</span> <span className="bios-text">Remote / Worldwide</span></p>
              </div>
              <div>
                <p><span style={{ color: '#AAAAAA' }}>EMAIL:</span> <span className="bios-text">john@example.com</span></p>
                <p><span style={{ color: '#AAAAAA' }}>EXPERIENCE:</span> <span className="bios-text">5+ years</span></p>
                <p><span style={{ color: '#AAAAAA' }}>STATUS:</span> <span className="bios-highlight">Available for hire</span></p>
              </div>
            </div>
            <p className="mt-6">
              Passionate developer with expertise in building high-performance applications
              and systems. Love working with low-level code and creating efficient solutions.
            </p>
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[WORK HISTORY]</p>
            <div className="space-y-4 mt-4">
              <div className="bios-border p-4">
                <p className="bios-highlight">SENIOR DEVELOPER @ TechCorp</p>
                <p style={{ color: '#AAAAAA' }}>2022 - Present</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Led development of microservices architecture</li>
                  <li>Reduced system latency by 40%</li>
                  <li>Mentored team of 5 junior developers</li>
                </ul>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">FULL STACK DEVELOPER @ StartupXYZ</p>
                <p style={{ color: '#AAAAAA' }}>2020 - 2022</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Built React/Node.js web applications</li>
                  <li>Implemented CI/CD pipelines</li>
                  <li>Developed RESTful APIs</li>
                </ul>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">JUNIOR DEVELOPER @ CodeFactory</p>
                <p style={{ color: '#AAAAAA' }}>2019 - 2020</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed features for web applications</li>
                  <li>Fixed bugs and improved code quality</li>
                  <li>Participated in code reviews</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'skills':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[SKILL MATRIX]</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="bios-highlight mb-2">LANGUAGES</p>
                <div className="space-y-2">
                  {['Rust', 'TypeScript/JavaScript', 'Python', 'C/C++', 'Go'].map(skill => (
                    <div key={skill}>
                      <p>{skill}</p>
                      <div className="h-4 border bios-border mt-1" style={{ borderColor: '#AAAAAA' }}>
                        <div className="bios-highlight h-full" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="bios-highlight mb-2">TECHNOLOGIES</p>
                <div className="space-y-2">
                  {['React/Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Linux'].map(skill => (
                    <div key={skill}>
                      <p>{skill}</p>
                      <div className="h-4 border bios-border mt-1" style={{ borderColor: '#AAAAAA' }}>
                        <div className="bios-highlight h-full" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[PROJECT DATABASE]</p>
            <div className="space-y-4 mt-4">
              <div className="bios-border p-4">
                <p className="bios-highlight">RUST CHEAT ENGINE</p>
                <p className="bios-gray">Game modification framework</p>
                <p className="mt-2">High-performance DLL injection system with memory manipulation capabilities.</p>
                <p className="bios-highlight mt-2">[STATUS: ACTIVE]</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">GEESER WEBSITE</p>
                <p className="bios-gray">Next.js corporate website</p>
                <p className="mt-2">Modern responsive website built with Next.js, TypeScript and TailwindCSS.</p>
                <p className="bios-highlight mt-2">[STATUS: PRODUCTION]</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">SYSTEM MONITOR</p>
                <p className="bios-gray">Linux system monitoring tool</p>
                <p className="mt-2">Real-time system resource monitoring with terminal-based UI.</p>
                <p className="bios-highlight mt-2">[STATUS: BETA]</p>
              </div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="space-y-6">
            <p className="bios-highlight">[COMMUNICATION CHANNELS]</p>
            <div className="space-y-4 mt-4">
              <div className="bios-border p-4">
                <p className="bios-highlight">EMAIL</p>
                <p className="bios-link">john.doe@example.com</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">GITHUB</p>
                <p className="bios-link">github.com/johndoe</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">TELEGRAM</p>
                <p className="bios-link">@johndoe</p>
              </div>
              <div className="bios-border p-4">
                <p className="bios-highlight">LINKEDIN</p>
                <p className="bios-link">linkedin.com/in/johndoe</p>
              </div>
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
      <div className="min-h-screen bg-[#0000AA] p-8 crt-flicker" style={{ fontFamily: "'NDS Bios', 'Courier New', monospace", fontWeight: 700, fontSize: 18 }}>
        <Head>
          <title>RESUME.OS - Boot Sequence</title>
        </Head>
        {bootLines.map((line, i) => (
          <p key={i} className={line.includes('OK') ? 'bios-highlight' : ''} style={{ fontWeight: 700 }}>{line}</p>
        ))}
        <p className="animate-blink">_</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0000AA] crt-flicker relative" style={{ fontFamily: "'NDS Bios', 'Courier New', monospace", fontWeight: 700, fontSize: 18 }}>
      <Head>
        <title>RESUME.OS v1.0.0</title>
      </Head>
      
      {/* Scanline effect */}
      <div className="scanline fixed inset-0 pointer-events-none z-50"></div>
      
      <div className="p-4 md:p-8">
        {/* Header */}
        <header className="bios-border p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="bios-highlight text-xl">RESUME.OS v1.0.0</h1>
              <p style={{ color: '#AAAAAA' }}>BIOS Version 1.0.0 - Developer Edition</p>
            </div>
            <div className="text-right">
              <p className="bios-highlight">{new Date().toLocaleDateString()}</p>
              <p style={{ color: '#AAAAAA' }}>SYSTEM READY</p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bios-border p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
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

        {/* Main Content */}
        <main className="bios-border p-6 min-h-[400px]">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bios-border p-4 mt-4">
          <div className="flex justify-between items-center">
            <p style={{ color: '#AAAAAA' }}>Memory: 640K FREE</p>
            <p className="bios-highlight">[←/→/↑/↓ Navigate] [ENTER Select]</p>
            <p className="bios-highlight">© 2026</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
