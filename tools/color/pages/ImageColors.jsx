import React, { useState, useRef, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Upload, Copy } from 'lucide-react';
import { rgbToHex } from '../utils/color.js';
import { useTranslation } from 'react-i18next';

function extractColors(img, count = 10) {
  const canvas = document.createElement('canvas');
  const size = 150;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const colorMap = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    if (data[i + 3] < 128) continue;
    const key = `${r},${g},${b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  return Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return { hex: rgbToHex(r, g, b), r, g, b };
    });
}

export default function ImageColors() {
  const { t } = useTranslation();
  const [colors, setColors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) { toast.error('Please upload an image file.'); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    const img = new window.Image();
    img.onload = () => { setColors(extractColors(img)); URL.revokeObjectURL(url); };
    img.src = url;
  }, []);

  const onDrop = (e) => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]); };
  const copy = (text) => { navigator.clipboard.writeText(text); toast.success(t('common.copied')); };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('imageColors.title')}</h1>
        <p className="text-gray-400 text-sm">{t('imageColors.desc')}</p>
      </div>

      <div
        className={`card p-8 text-center cursor-pointer transition-colors mb-8 ${dragging ? 'border-violet-500 bg-violet-900/10' : 'hover:border-violet-700'}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => processFile(e.target.files[0])} />
        {preview ? (
          <img src={preview} alt="Uploaded" className="max-h-48 mx-auto rounded-xl mb-4 object-contain" />
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-gray-500" />
            </div>
            <p className="text-gray-400 mb-1">{t('imageColors.dropLabel')}</p>
            <p className="text-xs text-gray-600">{t('imageColors.dropSub')}</p>
          </>
        )}
      </div>

      {colors.length > 0 && (
        <>
          <h2 className="font-semibold text-white mb-4">{t('imageColors.extracted')} ({colors.length})</h2>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {colors.map((c, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => copy(c.hex.toUpperCase())}>
                <div className="w-full aspect-square rounded-xl border border-dark-600 mb-2 group-hover:scale-105 transition-transform" style={{ background: c.hex }} />
                <span className="text-xs font-mono text-gray-400 block text-center">{c.hex.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">{t('imageColors.allHex')}</h3>
              <button onClick={() => { navigator.clipboard.writeText(colors.map(c => c.hex.toUpperCase()).join(', ')); toast.success(t('common.allCopied')); }}
                className="copy-btn flex items-center gap-1">
                <Copy size={11} /> {t('common.copyAll')}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <button key={i} onClick={() => copy(c.hex.toUpperCase())}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dark-700 rounded-lg text-xs font-mono text-gray-300 hover:text-white hover:bg-dark-600 transition-colors border border-dark-600">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.hex }} />
                  {c.hex.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-8 card p-5 text-sm text-gray-400 leading-relaxed">
        <h3 className="text-white font-semibold mb-2">{t('imageColors.guide.title')}</h3>
        <p>{t('imageColors.guide.body')}</p>
      </div>
    </div>
  );
}
