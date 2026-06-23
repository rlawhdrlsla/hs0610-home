import Link from 'next/link';

const tools = [
  {
    href: '/color',
    icon: '🎨',
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/20',
    iconBg: 'from-pink-500 to-rose-500',
    title: 'Color Tools',
    title_ko: '색상 도구',
    desc: 'HEX/RGB/HSL conversion, palette generator, contrast checker, gradient maker, and more.',
    tags: ['HEX↔RGB', 'Palette', 'Contrast', 'Gradient'],
  },
  {
    href: '/css',
    icon: '✨',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    iconBg: 'from-violet-500 to-purple-500',
    title: 'CSS Tools',
    title_ko: 'CSS 도구',
    desc: 'Box shadow, border radius, flexbox builder, button generator, and visual CSS editors.',
    tags: ['Box Shadow', 'Flexbox', 'Border Radius', 'Button'],
  },
  {
    href: '/developer',
    icon: '⚡',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconBg: 'from-blue-500 to-cyan-500',
    title: 'Developer Tools',
    title_ko: '개발자 도구',
    desc: 'JSON formatter, UUID generator, hash generator, Base64, JWT decoder, regex tester, and more.',
    tags: ['JSON', 'UUID', 'Base64', 'JWT'],
  },
  {
    href: '/text',
    icon: '📝',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconBg: 'from-emerald-500 to-teal-500',
    title: 'Text Tools',
    title_ko: '텍스트 도구',
    desc: 'Word counter, case converter, Lorem Ipsum generator, text cleaner, slug generator, and more.',
    tags: ['Word Count', 'Case', 'Lorem Ipsum', 'Slug'],
  },
  {
    href: '/convert',
    icon: '🔄',
    gradient: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/20',
    iconBg: 'from-orange-500 to-amber-500',
    title: 'File Converter',
    title_ko: '파일 변환',
    desc: 'Convert images, PDFs, audio, video, and data files. Compress, resize, and transform any format.',
    tags: ['Image', 'PDF', 'Video', 'Audio'],
  },
  {
    href: '/sleep',
    icon: '🌙',
    gradient: 'from-indigo-500/20 to-blue-500/10',
    border: 'border-indigo-500/20',
    iconBg: 'from-indigo-500 to-blue-500',
    title: 'Sleep Coach',
    title_ko: '수면 코치',
    desc: 'Calculate optimal sleep and wake times based on 90-minute sleep cycles for better rest.',
    tags: ['Sleep Cycles', 'Wake Time', 'Bedtime', 'REM'],
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: '#0a0a0f',
        color: '#e2e8f0',
      }}
    >
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168,85,247,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="flex items-center justify-between h-[52px] px-6 mx-auto"
          style={{ maxWidth: 1100 }}
        >
          <Link href="/" className="flex items-center gap-[9px] no-underline">
            <div
              className="flex items-center justify-center text-base w-8 h-8 rounded-[9px]"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              ⚡
            </div>
            <span
              className="text-[17px] font-extrabold"
              style={{
                background: 'linear-gradient(135deg, #a5b4fc, #e879f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              HS Tools
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm" style={{ color: '#94a3b8' }}>
            <Link href="/color" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>Color</Link>
            <Link href="/css" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>CSS</Link>
            <Link href="/developer" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>Dev</Link>
            <Link href="/text" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>Text</Link>
            <Link href="/convert" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>Convert</Link>
            <Link href="/sleep" className="hover:text-white transition-colors no-underline" style={{ color: 'inherit' }}>Sleep</Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto px-6" style={{ maxWidth: 1100 }}>
        {/* Hero */}
        <header className="py-14 text-center">
          <h1
            className="text-[38px] font-extrabold mb-4 leading-tight"
            style={{ color: '#f1f5f9', letterSpacing: '-0.8px' }}
          >
            Free Online Utility Tools
          </h1>
          <p className="text-base mx-auto leading-relaxed" style={{ color: '#94a3b8', maxWidth: 560 }}>
            Browser-based tools for developers, designers, and everyday users.
            <br />
            No login required. Completely free.
          </p>
        </header>

        {/* Tool Cards */}
        <section className="grid gap-5 mb-16" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block no-underline rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${tool.gradient.replace('from-', '').replace('to-', '')})`,
                borderColor: tool.border.replace('border-', '').replace('/20', ''),
                textDecoration: 'none',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl text-xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                >
                  <span
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-xl"
                    style={{ background: `linear-gradient(135deg, #6366f1, #a855f7)` }}
                  >
                    {tool.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold mb-1" style={{ color: '#f1f5f9' }}>
                    {tool.title}
                    <span className="ml-2 text-sm font-normal" style={{ color: '#94a3b8' }}>
                      {tool.title_ko}
                    </span>
                  </h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#94a3b8' }}>
                    {tool.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#cbd5e1',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm border-t" style={{ color: '#475569', borderColor: 'rgba(255,255,255,0.06)' }}>
          <p>© 2025 HS Tools · All tools run in your browser · No data is stored</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/privacy" style={{ color: '#64748b' }} className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" style={{ color: '#64748b' }} className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
