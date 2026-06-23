import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

export default function ButtonGenerator() {
  const { t } = useI18n()
  const [label, setLabel] = useState('Click me')
  const [bgColor, setBgColor] = useState('#6366f1')
  const [textColor, setTextColor] = useState('#ffffff')
  const [paddingX, setPaddingX] = useState(24)
  const [paddingY, setPaddingY] = useState(12)
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState(600)
  const [radius, setRadius] = useState(8)
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderColor, setBorderColor] = useState('#6366f1')
  const [shadowY, setShadowY] = useState(4)
  const [shadowBlur, setShadowBlur] = useState(12)
  const [shadowColor, setShadowColor] = useState('#6366f140')
  const [enableShadow, setEnableShadow] = useState(true)

  const shadow = enableShadow ? `0px ${shadowY}px ${shadowBlur}px ${shadowColor}` : 'none'

  const buttonStyle = {
    backgroundColor: bgColor, color: textColor,
    padding: `${paddingY}px ${paddingX}px`,
    fontSize: `${fontSize}px`, fontWeight,
    borderRadius: `${radius}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
    boxShadow: shadow, cursor: 'pointer', transition: 'all 0.2s', display: 'inline-block',
  }

  const css = `background-color: ${bgColor};
color: ${textColor};
padding: ${paddingY}px ${paddingX}px;
font-size: ${fontSize}px;
font-weight: ${fontWeight};
border-radius: ${radius}px;${borderWidth > 0 ? `\nborder: ${borderWidth}px solid ${borderColor};` : '\nborder: none;'}
box-shadow: ${shadow};
cursor: pointer;
transition: all 0.2s;`

  function Slider({ label, value, onChange, min, max, step }) {
    return (
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-xs font-medium text-gray-600">{label}</label>
          <span className="text-xs text-indigo-600 font-mono">{value}{step === 100 ? '' : 'px'}</span>
        </div>
        <input type="range" min={min} max={max} step={step || 1} value={value}
          onChange={e => onChange(+e.target.value)} className="w-full accent-indigo-500" />
      </div>
    )
  }

  function ColorRow({ label, value, onChange }) {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
        <div className="flex gap-2 items-center">
          <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-9 h-9 rounded cursor-pointer border border-gray-300" />
          <input type="text" value={value} onChange={e => onChange(e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('button.title')}</h1>
      <p className="text-gray-500 mb-8">{t('button.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('button.label')}</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ColorRow label={t('common.backgroundColor')} value={bgColor} onChange={setBgColor} />
            <ColorRow label={t('common.textColor')} value={textColor} onChange={setTextColor} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Slider label={t('button.paddingX')} value={paddingX} onChange={setPaddingX} min={4} max={80} />
            <Slider label={t('button.paddingY')} value={paddingY} onChange={setPaddingY} min={4} max={40} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Slider label={t('button.fontSize')} value={fontSize} onChange={setFontSize} min={10} max={32} />
            <Slider label={t('button.fontWeight')} value={fontWeight} onChange={setFontWeight} min={100} max={900} step={100} />
          </div>

          <Slider label={t('button.borderRadius')} value={radius} onChange={setRadius} min={0} max={60} />

          <div>
            <Slider label={t('button.borderWidth')} value={borderWidth} onChange={setBorderWidth} min={0} max={8} />
            {borderWidth > 0 && (
              <div className="flex gap-2 items-center mt-2">
                <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 cursor-pointer">
              <input type="checkbox" checked={enableShadow} onChange={e => setEnableShadow(e.target.checked)} className="accent-indigo-500" />
              {t('button.boxShadow')}
            </label>
            {enableShadow && (
              <div className="grid grid-cols-2 gap-3">
                <Slider label={t('button.offsetY')} value={shadowY} onChange={setShadowY} min={-20} max={40} />
                <Slider label={t('button.blur')} value={shadowBlur} onChange={setShadowBlur} min={0} max={60} />
                <div className="col-span-2 flex gap-2 items-center">
                  <input type="color" value={shadowColor.slice(0, 7)} onChange={e => setShadowColor(e.target.value + '40')} className="w-8 h-8 rounded cursor-pointer border border-gray-300" />
                  <input type="text" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: 180 }}>
            <button style={buttonStyle}>{label || 'Button'}</button>
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
