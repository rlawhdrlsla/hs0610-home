import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const directions = [
  { label: '→', value: 'to right' }, { label: '↘', value: 'to bottom right' },
  { label: '↓', value: 'to bottom' }, { label: '↙', value: 'to bottom left' },
  { label: '←', value: 'to left' }, { label: '↖', value: 'to top left' },
  { label: '↑', value: 'to top' }, { label: '↗', value: 'to top right' },
];

export default function GradientMaker() {
  const { t } = useTranslation();
  const [type, setType] = useState('linear');
  const [direction, setDirection] = useState('to right');
  const [stops, setStops] = useState(['#7c3aed', '#ec4899']);

  const gradientCSS = type === 'linear'
    ? `linear-gradient(${direction}, ${stops.join(', ')})`
    : `radial-gradient(circle, ${stops.join(', ')})`;
  const fullCSS = `background: ${gradientCSS};`;

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success(t('common.copied')); };
  const addStop = () => setStops(prev => [...prev, '#06b6d4']);
  const removeStop = (i) => setStops(prev => prev.filter((_, idx) => idx !== i));
  const updateStop = (i, val) => setStops(prev => prev.map((s, idx) => idx === i ? val : s));

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('gradient.title')}</h1>
        <p className="text-gray-400 text-sm">{t('gradient.desc')}</p>
      </div>

      <div className="w-full h-40 rounded-2xl mb-8 border border-dark-600" style={{ background: gradientCSS }} />

      <div className="card p-5 mb-4">
        <div className="flex gap-2 mb-5">
          {['linear', 'radial'].map(tp => (
            <button key={tp} onClick={() => setType(tp)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${type === tp ? 'bg-violet-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-white border border-dark-600'}`}>
              {tp === 'linear' ? t('gradient.linear') : t('gradient.radial')}
            </button>
          ))}
        </div>

        {type === 'linear' && (
          <div className="mb-5">
            <label className="label">{t('gradient.direction')}</label>
            <div className="flex flex-wrap gap-2">
              {directions.map(d => (
                <button key={d.value} onClick={() => setDirection(d.value)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${direction === d.value ? 'bg-violet-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-white border border-dark-600'}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">{t('gradient.colorStops')}</label>
            <button onClick={addStop} className="copy-btn flex items-center gap-1">
              <Plus size={12} /> {t('gradient.addStop')}
            </button>
          </div>
          <div className="space-y-2">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="color" value={stop} onChange={e => updateStop(i, e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-dark-600 p-1 flex-shrink-0" />
                <input className="input flex-1 font-mono uppercase" value={stop} onChange={e => updateStop(i, e.target.value)} />
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="w-9 h-9 rounded-lg bg-dark-700 hover:bg-red-900/40 border border-dark-600 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Trash2 size={14} className="text-gray-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">{t('gradient.cssCode')}</h2>
          <button onClick={() => copy(fullCSS)} className="copy-btn flex items-center gap-1">
            <Copy size={11} /> {t('gradient.copyCss')}
          </button>
        </div>
        <pre className="bg-dark-700 rounded-xl p-4 text-sm font-mono text-violet-400 overflow-x-auto whitespace-pre-wrap break-all">
          {fullCSS}
        </pre>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-dark-700 rounded-xl p-3">
            <span className="text-xs text-gray-500 block mb-1">{t('gradient.gradientOnly')}</span>
            <button onClick={() => copy(gradientCSS)} className="text-xs font-mono text-violet-400 hover:text-violet-300 text-left break-all">
              {gradientCSS.slice(0, 40)}...
            </button>
          </div>
          <div className="bg-dark-700 rounded-xl p-3">
            <span className="text-xs text-gray-500 block mb-1">{t('gradient.tailwind')}</span>
            <button onClick={() => copy(`bg-[${gradientCSS.replace(/ /g, '_')}]`)} className="text-xs font-mono text-violet-400 hover:text-violet-300 text-left break-all">
              bg-[{gradientCSS.slice(0, 25)}...]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
