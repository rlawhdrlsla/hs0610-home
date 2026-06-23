import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-5xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">{t('notFound.title')}</h1>
      <p className="text-gray-500 mb-8">{t('notFound.subtitle')}</p>
      <Link to="/" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
        {t('notFound.goHome')}
      </Link>
    </div>
  )
}
