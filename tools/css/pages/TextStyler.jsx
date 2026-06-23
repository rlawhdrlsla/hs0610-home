import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n/index.jsx'

const FONTS = ['Inter', 'Georgia', 'Times New Roman', 'Arial', 'Helvetica', 'Courier New', 'Verdana', 'Trebuchet MS', 'Impact']

export default function TextStyler() {
  const { t } = useI18n()
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState(400)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [color, setColor] = useState('#111827')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [textAlign, setTextAlign] = useState('left')
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  const sampleText = 'The quick brown fox jumps over the lazy dog. 빠른 갈색 여우가 게으른 개를 뛰어넘었습니다.'

  const css = `font-family: '${fontFamily}', sans-serif;
font-size: ${fontSize}px;
font-weight: ${fontWeight};
line-height: ${lineHeight};
letter-spacing: ${letterSpacing}px;
color: ${color};
text-align: ${textAlign};${italic ? '\nfont-style: italic;' : ''}${underline ? '\ntext-decoration: underline;' : ''}`

  const previewStyle = {
    fontFamily: `'${fontFamily}', sans-serif`,
    fontSize: `${fontSize}px`,
    fontWeight,
    lineHeight,
    letterSpacing: `${letterSpacing}px`,
    color,
    textAlign,
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: underline ? 'underline' : 'none',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('textStyler.title')}</h1>
      <p className="text-gray-500 mb-8">{t('textStyler.subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('textStyler.fontFamily')}</label>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                {FONTS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{t('textStyler.fontSize')}</label>
                <span className="text-sm text-indigo-600 font-mono">{fontSize}px</span>
              </div>
              <input type="range" min={8} max={96} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-indigo-500" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{t('textStyler.fontWeight')}</label>
                <span className="text-sm text-indigo-600 font-mono">{fontWeight}</span>
              </div>
              <input type="range" min={100} max={900} step={100} value={fontWeight} onChange={e => setFontWeight(+e.target.value)} className="w-full accent-indigo-500" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{t('textStyler.lineHeight')}</label>
                <span className="text-sm text-indigo-600 font-mono">{lineHeight}</span>
              </div>
              <input type="range" min={1} max={3} step={0.1} value={lineHeight} onChange={e => setLineHeight(+e.target.value)} className="w-full accent-indigo-500" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{t('textStyler.letterSpacing')}</label>
                <span className="text-sm text-indigo-600 font-mono">{letterSpacing}px</span>
              </div>
              <input type="range" min={-5} max={20} step={0.5} value={letterSpacing} onChange={e => setLetterSpacing(+e.target.value)} className="w-full accent-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.color')}</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
                <input type="text" value={color} onChange={e => setColor(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('textStyler.textAlign')}</label>
              <div className="flex gap-2">
                {['left', 'center', 'right', 'justify'].map(a => (
                  <button key={a} onClick={() => setTextAlign(a)}
                    className={`flex-1 py-1.5 rounded-lg text-sm border transition-colors ${textAlign === a ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setItalic(!italic)}
                className={`px-4 py-1.5 rounded-lg text-sm border italic transition-colors ${italic ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                {t('textStyler.italic')}
              </button>
              <button onClick={() => setUnderline(!underline)}
                className={`px-4 py-1.5 rounded-lg text-sm border underline transition-colors ${underline ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                {t('textStyler.underline')}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-6 min-h-40">
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">{t('common.preview')}</p>
            <p style={previewStyle}>{sampleText}</p>
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
