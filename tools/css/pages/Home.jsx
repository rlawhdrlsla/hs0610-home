import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'

const tools = [
  { path: '/text-styler', key: 'textStyler', title: 'Text Styler', icon: 'T', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { path: '/box-shadow', key: 'boxShadow', title: 'Box Shadow', icon: '◻', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { path: '/border-radius', key: 'borderRadius', title: 'Border Radius', icon: '◉', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  { path: '/flexbox', key: 'flexbox', title: 'Flexbox Builder', icon: '⊞', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { path: '/button', key: 'button', title: 'Button Generator', icon: '▢', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { path: '/box-model', key: 'boxModel', title: 'Box Model', icon: '⊡', color: 'bg-pink-50 text-pink-600 border-pink-100' },
]

export default function Home() {
  const { t } = useI18n()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('home.title')}</h1>
        <p className="text-gray-500 text-lg">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border text-lg font-bold mb-4 ${tool.color}`}>
              {tool.icon}
            </div>
            <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {t(`nav.${tool.key}`)}
            </h2>
            <p className="text-sm text-gray-500">{t(`home.tools.${tool.key}.desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
