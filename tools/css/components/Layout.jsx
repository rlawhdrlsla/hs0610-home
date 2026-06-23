import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import AdBanner from './AdBanner.jsx'

const LANG_LABELS = { en: 'EN', ko: '한', ja: '日', zh: '中' }

export default function Layout() {
  const { t, lang, setLang, langs, dark, toggleDark } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  const tools = [
    { path: '/',               label: t('nav.layoutBuilder') },
    { path: '/text-styler',    label: t('nav.textStyler') },
    { path: '/box-shadow',     label: t('nav.boxShadow') },
    { path: '/border-radius',  label: t('nav.borderRadius') },
    { path: '/flexbox',        label: t('nav.flexbox') },
    { path: '/button',         label: t('nav.button') },
    { path: '/box-model',      label: t('nav.boxModel') },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-full px-4 h-14 flex items-center justify-between gap-4">
          <NavLink to="/" className="font-bold text-lg text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0">
            CSSKit
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto">
            {tools.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 shrink-0">
            {/* Language switcher */}
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  lang === l
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2">
            {tools.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm mb-1 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <AdBanner className="w-full" />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-600 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <NavLink to="/about" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">소개</NavLink>
            <span>·</span>
            <NavLink to="/privacy" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">개인정보처리방침</NavLink>
            <span>·</span>
            <NavLink to="/terms" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">이용약관</NavLink>
          </div>
          <div>© {new Date().getFullYear()} CSSKit. {t('footer.copy')}</div>
        </div>
      </footer>
    </div>
  )
}
