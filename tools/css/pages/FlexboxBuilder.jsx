import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse']
const JUSTIFY = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
const ALIGN_ITEMS = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']
const ALIGN_CONTENT = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']
const WRAP = ['nowrap', 'wrap', 'wrap-reverse']
const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899']

function OptionGroup({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)}
            className={`px-2.5 py-1 rounded text-xs border transition-colors ${value === opt ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FlexboxBuilder() {
  const { t } = useI18n()
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [alignItems, setAlignItems] = useState('stretch')
  const [alignContent, setAlignContent] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(8)
  const [itemCount, setItemCount] = useState(4)

  const css = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${alignItems};
flex-wrap: ${wrap};
gap: ${gap}px;${wrap !== 'nowrap' ? `\nalign-content: ${alignContent};` : ''}`

  const previewStyle = {
    display: 'flex', flexDirection: direction, justifyContent: justify,
    alignItems, flexWrap: wrap, gap: `${gap}px`,
    alignContent: wrap !== 'nowrap' ? alignContent : undefined,
    minHeight: 160, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('flexbox.title')}</h1>
      <p className="text-gray-500 mb-8">{t('flexbox.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          <OptionGroup label="flex-direction" value={direction} onChange={setDirection} options={DIRECTIONS} />
          <OptionGroup label="justify-content" value={justify} onChange={setJustify} options={JUSTIFY} />
          <OptionGroup label="align-items" value={alignItems} onChange={setAlignItems} options={ALIGN_ITEMS} />
          <OptionGroup label="flex-wrap" value={wrap} onChange={setWrap} options={WRAP} />
          {wrap !== 'nowrap' && (
            <OptionGroup label="align-content" value={alignContent} onChange={setAlignContent} options={ALIGN_CONTENT} />
          )}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">{t('flexbox.gap')}</label>
              <span className="text-sm text-indigo-600 font-mono">{gap}px</span>
            </div>
            <input type="range" min={0} max={40} value={gap} onChange={e => setGap(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">{t('flexbox.itemCount')}</label>
              <span className="text-sm text-indigo-600 font-mono">{itemCount}</span>
            </div>
            <input type="range" min={1} max={10} value={itemCount} onChange={e => setItemCount(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{t('common.preview')}</p>
            <div style={previewStyle}>
              {Array.from({ length: itemCount }).map((_, i) => (
                <div key={i} className="rounded-lg flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: COLORS[i % COLORS.length], minWidth: 40, minHeight: 40, padding: '8px 12px' }}>
                  {i + 1}
                </div>
              ))}
            </div>
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
