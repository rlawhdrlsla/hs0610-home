import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

export default function BoxModel() {
  const { t } = useI18n()
  const [marginTop, setMarginTop] = useState(20)
  const [marginRight, setMarginRight] = useState(20)
  const [marginBottom, setMarginBottom] = useState(20)
  const [marginLeft, setMarginLeft] = useState(20)
  const [paddingTop, setPaddingTop] = useState(16)
  const [paddingRight, setPaddingRight] = useState(16)
  const [paddingBottom, setPaddingBottom] = useState(16)
  const [paddingLeft, setPaddingLeft] = useState(16)
  const [borderWidth, setBorderWidth] = useState(2)
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderColor, setBorderColor] = useState('#6366f1')
  const [width, setWidth] = useState(120)
  const [height, setHeight] = useState(60)
  const [boxSizing, setBoxSizing] = useState('content-box')

  const BORDER_STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove']

  const css = `box-sizing: ${boxSizing};
width: ${width}px;
height: ${height}px;
margin: ${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px;
padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
border: ${borderWidth}px ${borderStyle} ${borderColor};`

  const sides = [
    [t('boxModel.top'), t('boxModel.right'), t('boxModel.bottom'), t('boxModel.left')]
  ]

  const marginSetters = [setMarginTop, setMarginRight, setMarginBottom, setMarginLeft]
  const marginVals = [marginTop, marginRight, marginBottom, marginLeft]
  const paddingSetters = [setPaddingTop, setPaddingRight, setPaddingBottom, setPaddingLeft]
  const paddingVals = [paddingTop, paddingRight, paddingBottom, paddingLeft]
  const sideLabels = [t('boxModel.top'), t('boxModel.right'), t('boxModel.bottom'), t('boxModel.left')]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('boxModel.title')}</h1>
      <p className="text-gray-500 mb-8">{t('boxModel.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
          {/* box-sizing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">box-sizing</label>
            <div className="flex gap-2">
              {['content-box', 'border-box'].map(v => (
                <button key={v} onClick={() => setBoxSizing(v)}
                  className={`flex-1 py-1.5 rounded-lg text-sm border transition-colors ${boxSizing === v ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-2 gap-3">
            {[[t('common.width'), width, setWidth, 40, 300], [t('common.height'), height, setHeight, 20, 200]].map(([label, val, setter, min, max]) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-medium text-gray-600">{label}</label>
                  <span className="text-xs text-indigo-600 font-mono">{val}px</span>
                </div>
                <input type="range" min={min} max={max} value={val} onChange={e => setter(+e.target.value)} className="w-full accent-indigo-500" />
              </div>
            ))}
          </div>

          {/* Margin */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {t('boxModel.margin')} <span className="text-xs text-gray-400 font-normal">{t('boxModel.marginHint')}</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {sideLabels.map((label, i) => (
                <div key={label}>
                  <div className="flex justify-between mb-0.5">
                    <label className="text-xs text-gray-500">{label}</label>
                    <span className="text-xs text-orange-500 font-mono">{marginVals[i]}px</span>
                  </div>
                  <input type="range" min={0} max={80} value={marginVals[i]} onChange={e => marginSetters[i](+e.target.value)} className="w-full accent-orange-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {t('boxModel.padding')} <span className="text-xs text-gray-400 font-normal">{t('boxModel.paddingHint')}</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {sideLabels.map((label, i) => (
                <div key={label}>
                  <div className="flex justify-between mb-0.5">
                    <label className="text-xs text-gray-500">{label}</label>
                    <span className="text-xs text-green-600 font-mono">{paddingVals[i]}px</span>
                  </div>
                  <input type="range" min={0} max={60} value={paddingVals[i]} onChange={e => paddingSetters[i](+e.target.value)} className="w-full accent-green-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Border */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">{t('boxModel.border')}</p>
            <div className="flex items-center gap-3 mb-2">
              <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
              <div className="flex-1">
                <div className="flex justify-between mb-0.5">
                  <label className="text-xs text-gray-500">{t('common.width')}</label>
                  <span className="text-xs text-indigo-600 font-mono">{borderWidth}px</span>
                </div>
                <input type="range" min={0} max={20} value={borderWidth} onChange={e => setBorderWidth(+e.target.value)} className="w-full accent-indigo-500" />
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {BORDER_STYLES.map(s => (
                <button key={s} onClick={() => setBorderStyle(s)}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors ${borderStyle === s ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{t('common.preview')}</p>
            <div className="bg-gray-50 rounded-xl flex items-center justify-center p-6" style={{ minHeight: 260 }}>
              <div style={{ backgroundColor: '#fed7aa', padding: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`, borderRadius: 4, position: 'relative' }}>
                <span className="absolute top-0.5 left-1 text-xs text-orange-600 font-medium">{t('boxModel.margin')}</span>
                <div style={{ border: `${borderWidth}px ${borderStyle} ${borderColor}`, borderRadius: 2, backgroundColor: '#c7d2fe', position: 'relative' }}>
                  <span className="absolute top-0.5 left-1 text-xs text-indigo-600 font-medium">{t('boxModel.border')}</span>
                  <div style={{ backgroundColor: '#bbf7d0', padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`, position: 'relative' }}>
                    <span className="absolute top-0.5 left-1 text-xs text-green-700 font-medium">{t('boxModel.padding')}</span>
                    <div style={{ width, height, backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 600, borderRadius: 2 }}>
                      {t('boxModel.content')}
                    </div>
                  </div>
                </div>
              </div>
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
