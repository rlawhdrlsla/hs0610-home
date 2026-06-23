import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Copy, ArrowLeftRight } from 'lucide-react';
import { hexToRgb, rgbToHex, isValidHex } from '../utils/color.js';
import { useTranslation } from 'react-i18next';

export default function HexRgb() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('hexRgb.title')} — ColorKit`; }, [t]);
  const [hex, setHex] = useState('#7c3aed');
  const [r, setR] = useState(124);
  const [g, setG] = useState(58);
  const [b, setB] = useState(237);

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success(t('common.copied')); };

  const handleHexChange = (val) => {
    setHex(val);
    const full = val.startsWith('#') ? val : `#${val}`;
    if (isValidHex(full)) {
      const rgb = hexToRgb(full);
      if (rgb) { setR(rgb.r); setG(rgb.g); setB(rgb.b); }
    }
  };

  const handleRgbChange = (nr, ng, nb) => {
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
  };

  const currentHex = hex.startsWith('#') ? hex : `#${hex}`;
  const validHex = isValidHex(currentHex) ? currentHex : '#7c3aed';

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('hexRgb.title')}</h1>
        <p className="text-gray-400 text-sm">{t('hexRgb.desc')}</p>
      </div>

      <div className="w-full h-32 rounded-2xl mb-8 transition-all duration-200 border border-dark-600"
        style={{ background: validHex }} />

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-violet-600 text-xs flex items-center justify-center text-white font-bold">#</span>
            {t('hexRgb.hex')}
          </h2>
          <div className="flex gap-2">
            <input type="color" value={validHex}
              onChange={e => handleHexChange(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border border-dark-600 p-1" />
            <input className="input flex-1 font-mono uppercase"
              value={hex} onChange={e => handleHexChange(e.target.value)}
              placeholder="#ffffff" maxLength={7} />
          </div>
          <button onClick={() => copy(validHex)} className="copy-btn mt-3 flex items-center gap-1.5 w-full justify-center">
            <Copy size={12} /> {t('hexRgb.copyHex')}
          </button>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <ArrowLeftRight size={16} className="text-violet-400" />
            {t('hexRgb.rgb')}
          </h2>
          {[
            { label: 'R', value: r, onChange: v => handleRgbChange(v, g, b), color: 'bg-red-500' },
            { label: 'G', value: g, onChange: v => handleRgbChange(r, v, b), color: 'bg-green-500' },
            { label: 'B', value: b, onChange: v => handleRgbChange(r, g, v), color: 'bg-blue-500' },
          ].map(ch => (
            <div key={ch.label} className="flex items-center gap-3 mb-3">
              <span className={`w-5 h-5 rounded ${ch.color} text-xs flex items-center justify-center text-white font-bold flex-shrink-0`}>{ch.label}</span>
              <input type="range" min="0" max="255" value={ch.value}
                onChange={e => ch.onChange(Number(e.target.value))} className="flex-1 accent-violet-500" />
              <input type="number" min="0" max="255" value={ch.value}
                onChange={e => ch.onChange(Math.max(0, Math.min(255, Number(e.target.value))))}
                className="w-14 px-2 py-1 bg-dark-700 border border-dark-600 rounded-lg text-sm text-white text-center" />
            </div>
          ))}
          <button onClick={() => copy(`rgb(${r}, ${g}, ${b})`)} className="copy-btn mt-1 flex items-center gap-1.5 w-full justify-center">
            <Copy size={12} /> {t('hexRgb.copyRgb')}
          </button>
        </div>
      </div>

      <div className="card p-5 mt-6">
        <h2 className="font-semibold text-white mb-4">{t('common.allValues')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'HEX', value: validHex.toUpperCase() },
            { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
            { label: 'CSS', value: `color: ${validHex};` },
          ].map(item => (
            <div key={item.label} className="bg-dark-700 rounded-xl p-3">
              <span className="text-xs text-gray-500 block mb-1">{item.label}</span>
              <span className="text-sm text-white font-mono break-all">{item.value}</span>
              <button onClick={() => copy(item.value)} className="mt-2 copy-btn text-xs flex items-center gap-1">
                <Copy size={10} /> {t('common.copy')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-5 card text-sm text-gray-400 leading-relaxed">
        <h3 className="text-white font-semibold mb-2">{t('hexRgb.guide.title')}</h3>
        <p>{t('hexRgb.guide.body')}</p>
      </div>
    </div>
  );
}
