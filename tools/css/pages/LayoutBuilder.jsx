import { useState, useRef, useEffect } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useI18n } from '../i18n'

const DEFAULT_CW = 1024
const DEFAULT_CH = 768

function uid() { return Math.random().toString(36).slice(2, 8) }

const PALETTE = [
  { type: 'box',     label: 'Box',      icon: '□',  d: { w:160, h:120, bg:'#e0e7ff', br:8,  op:1, fg:'#4338ca', text:'',         fs:14, fw:400, shadow:false } },
  { type: 'text',    label: 'Text',     icon: 'T',  d: { w:200, h:40,  bg:'transparent',br:0,op:1, fg:'#111827', text:'텍스트',   fs:16, fw:400, shadow:false } },
  { type: 'heading', label: 'Heading',  icon: 'H',  d: { w:280, h:60,  bg:'transparent',br:0,op:1, fg:'#111827', text:'제목',     fs:32, fw:700, shadow:false } },
  { type: 'button',  label: 'Button',   icon: '▢',  d: { w:120, h:44,  bg:'#6366f1',   br:8, op:1, fg:'#ffffff', text:'버튼',     fs:14, fw:600, shadow:false } },
  { type: 'card',    label: 'Card',     icon: '▬',  d: { w:220, h:160, bg:'#ffffff',   br:12,op:1, fg:'#374151', text:'',         fs:14, fw:400, shadow:true  } },
  { type: 'image',   label: 'Image',    icon: '🖼', d: { w:200, h:140, bg:'#e5e7eb',   br:0, op:1, fg:'#9ca3af', text:'',         fs:14, fw:400, shadow:false } },
  { type: 'circle',  label: 'Circle',   icon: '●',  d: { w:80,  h:80,  bg:'#fbbf24',   br:50,op:1, fg:'#78350f', text:'',         fs:14, fw:400, shadow:false } },
  { type: 'divider', label: 'Divider',  icon: '—',  d: { w:400, h:2,   bg:'#e5e7eb',   br:0, op:1, fg:'',        text:'',         fs:14, fw:400, shadow:false } },
  { type: 'navbar',  label: 'Navbar',   icon: '☰',  d: { w:DEFAULT_CW, h:60, bg:'#1e293b',  br:0, op:1, fg:'#f8fafc', text:'Logo', fs:16, fw:700, shadow:false } },
  { type: 'sidebar', label: 'Sidebar',  icon: '▌',  d: { w:220, h:DEFAULT_CH, bg:'#f8fafc', br:0, op:1, fg:'#374151', text:'', fs:14, fw:400, shadow:false } },
  { type: 'badge',   label: 'Badge',    icon: '◉',  d: { w:80,  h:28,  bg:'#dcfce7',   br:20,op:1, fg:'#166534', text:'Badge',    fs:12, fw:600, shadow:false } },
  { type: 'input',   label: 'Input',    icon: '▭',  d: { w:240, h:44,  bg:'#ffffff',   br:6, op:1, fg:'#9ca3af', text:'입력창...', fs:14, fw:400, shadow:false, border:true } },
]

const HANDLES = ['nw','n','ne','e','se','s','sw','w']
const HANDLE_POS = {
  nw: { top:0,     left:0,    transform:'translate(-50%,-50%)' },
  n:  { top:0,     left:'50%',transform:'translate(-50%,-50%)' },
  ne: { top:0,     right:0,   transform:'translate(50%,-50%)'  },
  e:  { top:'50%', right:0,   transform:'translate(50%,-50%)'  },
  se: { bottom:0,  right:0,   transform:'translate(50%,50%)'   },
  s:  { bottom:0,  left:'50%',transform:'translate(-50%,50%)'  },
  sw: { bottom:0,  left:0,    transform:'translate(-50%,50%)'  },
  w:  { top:'50%', left:0,    transform:'translate(-50%,-50%)' },
}
const HANDLE_CURSOR = { nw:'nw-resize',n:'n-resize',ne:'ne-resize',e:'e-resize',se:'se-resize',s:'s-resize',sw:'sw-resize',w:'w-resize' }

export default function LayoutBuilder() {
  const { t } = useI18n()
  const canvasRef = useRef(null)
  const [els, setEls] = useState([])
  const [sel, setSel] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [codeTab, setCodeTab] = useState('css') // 'css' | 'html'
  const [zoom, setZoom] = useState(0.8)
  const [CW, setCW] = useState(DEFAULT_CW)
  const [CH, setCH] = useState(DEFAULT_CH)
  const moveRef = useRef(null)
  const resizeRef = useRef(null)
  const touchDragRef = useRef(null) // 팔레트 → 캔버스 터치 드래그

  const selEl = els.find(e => e.id === sel)
  const z = zoom

  // ── 좌표 추출 (마우스/터치 공통) ──
  function getXY(e) {
    if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    return { x: e.clientX, y: e.clientY }
  }

  // ── 팔레트 터치 시작 ──
  function onPaletteTouchStart(e, type) {
    e.preventDefault()
    const item = PALETTE.find(p => p.type === type)
    const { x, y } = getXY(e)
    // 손가락 따라다니는 고스트 엘리먼트
    const ghost = document.createElement('div')
    ghost.style.cssText = `position:fixed;pointer-events:none;z-index:9999;background:#6366f1;color:white;padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;opacity:0.9;left:${x - 40}px;top:${y - 20}px;box-shadow:0 4px 12px rgba(99,102,241,0.4);`
    ghost.textContent = item.label
    document.body.appendChild(ghost)
    touchDragRef.current = { type, ghost }
  }

  // ── 팔레트 터치 이동 ──
  function onPaletteTouchMove(e) {
    if (!touchDragRef.current) return
    e.preventDefault()
    const { x, y } = getXY(e)
    touchDragRef.current.ghost.style.left = `${x - 40}px`
    touchDragRef.current.ghost.style.top  = `${y - 20}px`
  }

  // ── 팔레트 터치 종료 → 캔버스에 드롭 ──
  function onPaletteTouchEnd(e) {
    if (!touchDragRef.current) return
    const { type, ghost } = touchDragRef.current
    document.body.removeChild(ghost)
    touchDragRef.current = null

    const { x, y } = getXY(e)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return

    const item = PALETTE.find(p => p.type === type)
    const cx = Math.round((x - rect.left) / z - item.d.w / 2)
    const cy = Math.round((y - rect.top)  / z - item.d.h / 2)
    const el = { id: uid(), type, x: Math.max(0, cx), y: Math.max(0, cy), ...item.d }
    setEls(prev => [...prev, el])
    setSel(el.id)
  }

  // ── Drop from palette (마우스) ──
  function onDrop(e) {
    e.preventDefault()
    const type = e.dataTransfer.getData('csskit-type')
    if (!type) return
    const item = PALETTE.find(p => p.type === type)
    if (!item) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) / z - item.d.w / 2)
    const y = Math.round((e.clientY - rect.top) / z - item.d.h / 2)
    const el = { id: uid(), type, x: Math.max(0, x), y: Math.max(0, y), ...item.d }
    setEls(prev => [...prev, el])
    setSel(el.id)
  }

  // ── 요소 이동 시작 (마우스/터치) ──
  function onElDown(e, id) {
    if (e.target.dataset.rh) return
    e.preventDefault()
    e.stopPropagation()
    setSel(id)
    const el = els.find(e => e.id === id)
    const { x, y } = getXY(e)
    moveRef.current = { id, sx: x, sy: y, ox: el.x, oy: el.y }
  }

  // ── 리사이즈 시작 (마우스/터치) ──
  function onHandleDown(e, id, h) {
    e.preventDefault()
    e.stopPropagation()
    const el = els.find(e => e.id === id)
    const { x, y } = getXY(e)
    resizeRef.current = { id, h, sx: x, sy: y, ox: el.x, oy: el.y, ow: el.w, oh: el.h }
  }

  // ── 전역 이동/리사이즈 (마우스 + 터치) ──
  useEffect(() => {
    function onMove(e) {
      if (e.touches) e.preventDefault()
      const { x, y } = getXY(e)
      if (moveRef.current) {
        const { id, sx, sy, ox, oy } = moveRef.current
        const dx = (x - sx) / z, dy = (y - sy) / z
        setEls(p => p.map(el => el.id !== id ? el : {
          ...el, x: Math.max(0, Math.round(ox + dx)), y: Math.max(0, Math.round(oy + dy))
        }))
      }
      if (resizeRef.current) {
        const { id, h, sx, sy, ox, oy, ow, oh } = resizeRef.current
        const dx = (x - sx) / z, dy = (y - sy) / z
        let rx = ox, ry = oy, rw = ow, rh = oh
        if (h.includes('e')) rw = Math.max(20, ow + dx)
        if (h.includes('s')) rh = Math.max(4,  oh + dy)
        if (h.includes('w')) { rw = Math.max(20, ow - dx); rx = ox + ow - rw }
        if (h.includes('n')) { rh = Math.max(4,  oh - dy); ry = oy + oh - rh }
        setEls(p => p.map(el => el.id !== id ? el : {
          ...el, x: Math.round(rx), y: Math.round(ry), w: Math.round(rw), h: Math.round(rh)
        }))
      }
    }
    function onUp() { moveRef.current = null; resizeRef.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [z])

  // ── Keyboard shortcuts ──
  useEffect(() => {
    function onKey(e) {
      if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return
      if ((e.key === 'Delete' || e.key === 'Backspace') && sel) delSel()
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && sel) { e.preventDefault(); dupSel() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sel, els])

  const upd = (k, v) => setEls(p => p.map(el => el.id === sel ? { ...el, [k]: v } : el))
  const delSel = () => { setEls(p => p.filter(el => el.id !== sel)); setSel(null) }
  const dupSel = () => {
    const el = els.find(e => e.id === sel); if (!el) return
    const c = { ...el, id: uid(), x: el.x + 20, y: el.y + 20 }
    setEls(p => [...p, c]); setSel(c.id)
  }
  const toFront = () => setEls(p => { const el = p.find(e => e.id === sel); return [...p.filter(e => e.id !== sel), el] })
  const toBack  = () => setEls(p => { const el = p.find(e => e.id === sel); return [el, ...p.filter(e => e.id !== sel)] })

  function genCSS() {
    if (!els.length) return '/* Add elements to the canvas */'
    return [
      `.layout-container {\n  position: relative;\n  width: ${CW}px;\n  height: ${CH}px;\n}`,
      ...els.map((el, i) => {
        const cls = `.${el.type}-${i + 1}`
        const props = [
          'position: absolute;',
          `left: ${el.x}px;`, `top: ${el.y}px;`,
          `width: ${el.w}px;`, `height: ${el.h}px;`,
        ]
        if (el.bg && el.bg !== 'transparent') props.push(`background-color: ${el.bg};`)
        if (el.br) props.push(`border-radius: ${el.br}px;`)
        if (el.fg) props.push(`color: ${el.fg};`)
        if (el.op !== 1) props.push(`opacity: ${el.op};`)
        if (el.shadow) props.push(`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);`)
        if (el.fs && el.fs !== 14) props.push(`font-size: ${el.fs}px;`)
        if (el.fw && el.fw !== 400) props.push(`font-weight: ${el.fw};`)
        if (el.border) props.push('border: 1px solid #e5e7eb;')
        return `${cls} {\n  ${props.join('\n  ')}\n}`
      })
    ].join('\n\n')
  }

  function genHTML() {
    if (!els.length) return '<!-- Add elements to the canvas -->'
    const inner = els.map((el, i) => {
      const cls = `${el.type}-${i + 1}`
      const content = el.text ? el.text : el.type === 'image' ? '<!-- image -->' : ''
      return `  <div class="${cls}">${content}</div>`
    }).join('\n')
    return `<div class="layout-container">\n${inner}\n</div>`
  }

  const ToolBtn = ({ onClick, label, danger }) => (
    <button onClick={onClick}
      className={`text-xs px-2 py-1 rounded transition-colors ${
        danger
          ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
      }`}>
      {label}
    </button>
  )

  return (
    <div style={{ height: 'calc(100vh - 56px)' }} className="flex overflow-hidden">

      {/* ── Palette ── */}
      <div className="w-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
        <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('layoutBuilder.elements')}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {PALETTE.map(item => (
            <div
              key={item.type}
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('csskit-type', item.type)
                e.dataTransfer.effectAllowed = 'copy'
              }}
              onTouchStart={e => onPaletteTouchStart(e, item.type)}
              onTouchMove={onPaletteTouchMove}
              onTouchEnd={onPaletteTouchEnd}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 text-gray-700 dark:text-gray-300 transition-colors select-none"
            >
              <span className="w-5 text-center text-sm">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Canvas Area ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Toolbar */}
        <div className="h-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-3 gap-1 shrink-0">
          <span className="text-xs text-gray-400 dark:text-gray-600 mr-1 font-mono hidden sm:inline">{els.length}</span>

          {selEl && (
            <>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-0.5" />
              <ToolBtn onClick={toBack}   label={t('layoutBuilder.toBack')} />
              <ToolBtn onClick={toFront}  label={t('layoutBuilder.toFront')} />
              <ToolBtn onClick={dupSel}   label={t('layoutBuilder.duplicate')} />
              <ToolBtn onClick={delSel}   label={t('layoutBuilder.delete')} danger />
            </>
          )}

          <div className="ml-auto flex items-center gap-1">
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">{t('layoutBuilder.canvasSize')}</span>
            <input type="number" value={CW} min={320} max={3840}
              onChange={e => setCW(Math.max(320, +e.target.value))}
              className="w-16 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
            <span className="text-xs text-gray-300 dark:text-gray-600">×</span>
            <input type="number" value={CH} min={240} max={2160}
              onChange={e => setCH(Math.max(240, +e.target.value))}
              className="w-16 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
            <button onClick={() => setZoom(z => Math.max(0.25, +(z - 0.25).toFixed(2)))}
              className="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center text-base">−</button>
            <span className="text-xs text-gray-400 dark:text-gray-500 w-10 text-center font-mono">{Math.round(z * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, +(z + 0.25).toFixed(2)))}
              className="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center text-base">+</button>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
            <button onClick={() => setShowCode(s => !s)}
              className={`text-xs px-3 py-1 rounded font-medium ${showCode ? 'bg-gray-800 dark:bg-gray-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              {showCode ? t('layoutBuilder.hideCode') : t('layoutBuilder.showCode')}
            </button>
            <button onClick={() => { setEls([]); setSel(null) }}
              className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-600">
              {t('layoutBuilder.reset')}
            </button>
          </div>
        </div>

        {/* Canvas or Code */}
        {showCode ? (
          <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 flex flex-col">
            <div className="flex gap-1 px-6 pt-4">
              {['css', 'html'].map(tab => (
                <button key={tab} onClick={() => setCodeTab(tab)}
                  className={`text-xs px-3 py-1.5 rounded-t font-medium uppercase tracking-wide transition-colors ${
                    codeTab === tab
                      ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 border border-b-0 border-gray-200 dark:border-gray-700'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}>{tab}</button>
              ))}
            </div>
            <div className="flex-1 overflow-auto px-6 pb-6">
              <CodeBlock code={codeTab === 'css' ? genCSS() : genHTML()} />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-8 flex items-start justify-center bg-gray-100 dark:bg-gray-950">
            <div
              ref={canvasRef}
              className="relative bg-white shadow-lg"
              style={{ width: CW * z, height: CH * z, flexShrink: 0 }}
              onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy' }}
              onDrop={onDrop}
              onClick={() => setSel(null)}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                  backgroundSize: `${20 * z}px ${20 * z}px`,
                  opacity: 0.5,
                }}
              />
              {/* Size label */}
              <div className="absolute bottom-1.5 right-2 text-xs text-gray-300 pointer-events-none select-none font-mono">
                {CW}×{CH}
              </div>

              {/* Empty state */}
              {els.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm font-medium">{t('layoutBuilder.emptyHint')}</p>
                    <p className="text-gray-200 text-xs mt-1">{t('layoutBuilder.emptyHintSub')}</p>
                  </div>
                </div>
              )}

              {/* Elements — coordinates scaled directly, no transform wrapper */}
              {els.map(el => {
                const isSel = el.id === sel
                return (
                  <div
                    key={el.id}
                    style={{
                      position: 'absolute',
                      left:   el.x * z,
                      top:    el.y * z,
                      width:  el.w * z,
                      height: el.h * z,
                      backgroundColor: el.bg !== 'transparent' ? el.bg : undefined,
                      borderRadius: el.br * z,
                      color: el.fg,
                      opacity: el.op,
                      boxShadow: el.shadow ? `0 ${4*z}px ${16*z}px rgba(0,0,0,0.08)` : undefined,
                      fontSize: el.fs * z,
                      fontWeight: el.fw,
                      border: el.border ? `${Math.max(1, z)}px solid #e5e7eb` : undefined,
                      outline: isSel ? '2px solid #6366f1' : undefined,
                      outlineOffset: isSel ? 1 : undefined,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'grab',
                      userSelect: 'none',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                    onMouseDown={e => onElDown(e, el.id)}
                    onTouchStart={e => onElDown(e, el.id)}
                    onClick={e => { e.stopPropagation(); setSel(el.id) }}
                  >
                    {el.type === 'image' ? (
                      <svg width={32*z} height={32*z} fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ opacity: 0.4, pointerEvents: 'none', flexShrink: 0 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
                        <path d="M21 15l-5-5L5 21" strokeWidth="1.5"/>
                      </svg>
                    ) : el.text ? (
                      <span style={{ pointerEvents:'none', padding:`0 ${8*z}px`, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                        {el.text}
                      </span>
                    ) : null}

                    {/* Resize handles */}
                    {isSel && HANDLES.map(h => (
                      <div
                        key={h}
                        data-rh={h}
                        style={{
                          position: 'absolute',
                          width: 10, height: 10,
                          background: 'white',
                          border: '2px solid #6366f1',
                          borderRadius: 2,
                          zIndex: 20,
                          cursor: HANDLE_CURSOR[h],
                          ...HANDLE_POS[h],
                        }}
                        onMouseDown={e => onHandleDown(e, el.id, h)}
                        onTouchStart={e => onHandleDown(e, el.id, h)}
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Right Panel ── */}
      {selEl && !showCode && (
        <div className="w-52 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto shrink-0">
          <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{selEl.type}</span>
            <span className="text-xs text-gray-300 dark:text-gray-600 font-mono">{selEl.w}×{selEl.h}</span>
          </div>

          <div className="p-3 space-y-4">
            {/* Position / Size */}
            <Sec label={t('layoutBuilder.position')}>
              <div className="grid grid-cols-2 gap-1.5">
                {[['X','x'],['Y','y'],['W','w'],['H','h']].map(([l, k]) => (
                  <div key={k}>
                    <label className="text-xs text-gray-400 dark:text-gray-600">{l}</label>
                    <input type="number" value={selEl[k]} onChange={e => upd(k, +e.target.value)}
                      className="w-full mt-0.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
                  </div>
                ))}
              </div>
            </Sec>

            {/* Background */}
            <Sec label={t('layoutBuilder.background')}>
              <div className="flex gap-2 items-center">
                <input type="color"
                  value={selEl.bg === 'transparent' ? '#ffffff' : selEl.bg}
                  onChange={e => upd('bg', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-700 shrink-0" />
                <input type="text" value={selEl.bg} onChange={e => upd('bg', e.target.value)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </Sec>

            {/* Text color */}
            <Sec label={t('layoutBuilder.textColor')}>
              <div className="flex gap-2 items-center">
                <input type="color"
                  value={selEl.fg || '#000000'}
                  onChange={e => upd('fg', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-700 shrink-0" />
                <input type="text" value={selEl.fg} onChange={e => upd('fg', e.target.value)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
            </Sec>

            {/* Border Radius */}
            <Sec label={`Border Radius — ${selEl.br}px`}>
              <input type="range" min={0} max={200} value={selEl.br}
                onChange={e => upd('br', +e.target.value)} className="w-full accent-indigo-500" />
            </Sec>

            {/* Opacity */}
            <Sec label={`Opacity — ${Math.round(selEl.op * 100)}%`}>
              <input type="range" min={0} max={1} step={0.01} value={selEl.op}
                onChange={e => upd('op', +e.target.value)} className="w-full accent-indigo-500" />
            </Sec>

            {/* Text */}
            {selEl.text !== undefined && (
              <Sec label={t('layoutBuilder.text')}>
                <input type="text" value={selEl.text} onChange={e => upd('text', e.target.value)}
                  placeholder={t('layoutBuilder.placeholder')}
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </Sec>
            )}

            {/* Font Size */}
            {selEl.fs !== undefined && (
              <Sec label={`Font Size — ${selEl.fs}px`}>
                <input type="range" min={8} max={72} value={selEl.fs}
                  onChange={e => upd('fs', +e.target.value)} className="w-full accent-indigo-500" />
              </Sec>
            )}

            {/* Font Weight */}
            {selEl.fw !== undefined && (
              <Sec label="Font Weight">
                <div className="flex flex-wrap gap-1">
                  {[300,400,500,600,700,900].map(w => (
                    <button key={w} onClick={() => upd('fw', w)}
                      className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                        selEl.fw === w
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}>
                      {w}
                    </button>
                  ))}
                </div>
              </Sec>
            )}

            {/* Shadow */}
            {selEl.shadow !== undefined && (
              <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" checked={!!selEl.shadow}
                  onChange={e => upd('shadow', e.target.checked)} className="accent-indigo-500" />
                Box Shadow
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Sec({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1.5">{label}</p>
      {children}
    </div>
  )
}
