import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

function ShadowLayer({ layer, onChange, onRemove, t }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {[
          ['offsetX', layer.x, v => onChange({ ...layer, x: v }), -50, 50],
          ['offsetY', layer.y, v => onChange({ ...layer, y: v }), -50, 50],
          ['blur', layer.blur, v => onChange({ ...layer, blur: v }), 0, 100],
          ['spread', layer.spread, v => onChange({ ...layer, spread: v }), -30, 50],
        ].map(([key, val, setter, min, max]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-gray-600">{t(`boxShadow.${key}`)}</label>
              <span className="text-xs text-indigo-600 font-mono">{val}px</span>
            </div>
            <input type="range" min={min} max={max} value={val}
              onChange={e => setter(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2 items-center flex-1">
          <input type="color" value={layer.color} onChange={e => onChange({ ...layer, color: e.target.value })}
            className="w-9 h-9 rounded cursor-pointer border border-gray-300" />
          <input type="text" value={layer.color} onChange={e => onChange({ ...layer, color: e.target.value })}
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={layer.inset} onChange={e => onChange({ ...layer, inset: e.target.checked })} className="accent-indigo-500" />
          {t('boxShadow.inset')}
        </label>
        <button onClick={onRemove} className="text-red-400 hover:text-red-600 text-sm px-2">✕</button>
      </div>
    </div>
  )
}

export default function BoxShadow() {
  const { t } = useI18n()
  const [layers, setLayers] = useState([{ id: 1, x: 0, y: 4, blur: 16, spread: 0, color: '#00000026', inset: false }])
  const [bgColor, setBgColor] = useState('#ffffff')
  const [boxColor, setBoxColor] = useState('#6366f1')

  const shadowValue = layers.length === 0
    ? 'none'
    : layers.map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(',\n  ')

  const css = `box-shadow: ${shadowValue};`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('boxShadow.title')}</h1>
      <p className="text-gray-500 mb-8">{t('boxShadow.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {layers.map(layer => (
            <ShadowLayer key={layer.id} layer={layer} t={t}
              onChange={updated => setLayers(layers.map(l => l.id === layer.id ? updated : l))}
              onRemove={() => setLayers(layers.filter(l => l.id !== layer.id))} />
          ))}
          <button onClick={() => setLayers([...layers, { id: Date.now(), x: 0, y: 4, blur: 16, spread: 0, color: '#00000026', inset: false }])}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            {t('common.addLayer')}
          </button>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">{t('boxShadow.bgBoxColors')}</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <span className="text-xs text-gray-500">{t('common.backgroundColor')}</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <span className="text-xs text-gray-500">{t('common.boxColor')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl flex items-center justify-center" style={{ backgroundColor: bgColor, minHeight: 240, padding: 40 }}>
            <div className="w-32 h-32 rounded-xl" style={{ backgroundColor: boxColor, boxShadow: layers.map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(', ') || 'none' }} />
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
