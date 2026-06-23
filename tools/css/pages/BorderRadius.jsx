import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

export default function BorderRadius() {
  const { t } = useI18n()
  const [tl, setTl] = useState(8)
  const [tr, setTr] = useState(8)
  const [br, setBr] = useState(8)
  const [bl, setBl] = useState(8)
  const [linked, setLinked] = useState(true)
  const [bgColor, setBgColor] = useState('#6366f1')

  function setAll(val) { setTl(val); setTr(val); setBr(val); setBl(val) }
  function handleChange(setter, val) { if (linked) setAll(val); else setter(val) }

  const borderRadius = tl === tr && tr === br && br === bl ? `${tl}px` : `${tl}px ${tr}px ${br}px ${bl}px`
  const css = `border-radius: ${borderRadius};`

  const corners = [
    [t('borderRadius.topLeft'), tl, setTl],
    [t('borderRadius.topRight'), tr, setTr],
    [t('borderRadius.bottomRight'), br, setBr],
    [t('borderRadius.bottomLeft'), bl, setBl],
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('borderRadius.title')}</h1>
      <p className="text-gray-500 mb-8">{t('borderRadius.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{t('borderRadius.individual')}</span>
            <button onClick={() => setLinked(!linked)}
              className={`relative w-12 h-6 rounded-full transition-colors ${linked ? 'bg-gray-300' : 'bg-indigo-500'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${linked ? 'left-1' : 'left-7'}`} />
            </button>
          </div>

          {corners.map(([label, val, setter]) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <span className="text-sm text-indigo-600 font-mono">{val}px</span>
              </div>
              <input type="range" min={0} max={200} value={val}
                onChange={e => handleChange(setter, +e.target.value)} className="w-full accent-indigo-500" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.color')}</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
              <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: 240 }}>
            <div className="w-40 h-40" style={{ backgroundColor: bgColor, borderRadius }} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{t('common.cssCode')}</p>
            <CodeBlock code={css} />
          </div>
        </div>
      </div>
    </div>
  )
}
