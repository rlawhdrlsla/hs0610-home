import React, { useState, useMemo, useEffect } from 'react';
import { Clock, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const EXAMPLES = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every Monday 9AM', cron: '0 9 * * 1' },
  { label: 'Weekdays 9-5', cron: '0 9-17 * * 1-5' },
  { label: 'First day of month', cron: '0 0 1 * *' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'Twice a day', cron: '0 6,18 * * *' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function parseField(field, min, max, names) {
  if (field === '*') return null;
  const parts = [];
  for (const part of field.split(',')) {
    if (part.includes('/')) {
      const [range, step] = part.split('/');
      parts.push(range === '*' ? `every ${step} (step)` : `every ${step} starting from ${range}`);
    } else if (part.includes('-')) {
      const [a, b] = part.split('-');
      const la = names ? names[parseInt(a)] || a : a;
      const lb = names ? names[parseInt(b)] || b : b;
      parts.push(`${la} through ${lb}`);
    } else {
      const n = parseInt(part);
      parts.push(names ? names[n] || part : part);
    }
  }
  return parts.join(', ');
}

function explain(cron) {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return { ok: false, text: 'A cron expression must have exactly 5 fields.' };
  const [min, hour, dom, month, dow] = parts;
  try {
    const minText   = parseField(min,   0, 59);
    const hourText  = parseField(hour,  0, 23);
    const domText   = parseField(dom,   1, 31);
    const monthText = parseField(month, 1, 12, ['', ...MONTHS]);
    const dowText   = parseField(dow,   0, 6,  DAYS);
    const lines = [];
    if (minText === null && hourText === null) lines.push('Every minute');
    else if (minText === null) lines.push(`Every minute of hour ${hourText}`);
    else if (hourText === null) lines.push(`At minute ${minText} of every hour`);
    else lines.push(`At ${hourText}:${min.length === 1 ? '0' + min : min}`);
    if (domText !== null) lines.push(`On day ${domText} of the month`);
    if (monthText !== null) lines.push(`In ${monthText}`);
    if (dowText !== null) lines.push(`On ${dowText}`);
    return { ok: true, text: lines.join('. ') + '.' };
  } catch {
    return { ok: false, text: 'Could not parse this expression.' };
  }
}

export default function CronExplainer() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('cron.title')} — DevKit`; }, [t]);
  const [cron, setCron] = useState('0 9 * * 1-5');

  const result = useMemo(() => explain(cron), [cron]);

  function copy() {
    navigator.clipboard.writeText(cron);
    toast.success(t('common.copy') + '!');
  }

  const fields = cron.trim().split(/\s+/);
  const fieldLabels = [t('cron.minute'), t('cron.hour'), t('cron.dayOfMonth'), t('cron.month'), t('cron.dayOfWeek')];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center">
            <Clock size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('cron.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('cron.desc')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-gray-500 self-center">{t('common.example')}:</span>
        {EXAMPLES.map(ex => (
          <button key={ex.cron} onClick={() => setCron(ex.cron)} className="copy-btn">{ex.label}</button>
        ))}
      </div>

      <div className="card p-6 mb-4">
        <div className="flex gap-2 mb-4">
          <input className="input font-mono" value={cron} onChange={e => setCron(e.target.value)} placeholder="* * * * *" spellCheck={false} />
          <button onClick={copy} className="copy-btn flex items-center gap-1 flex-shrink-0">
            <Copy size={11} /> {t('common.copy')}
          </button>
        </div>

        {fields.length === 5 && (
          <div className="grid grid-cols-5 gap-2 mb-5">
            {fields.map((f, i) => (
              <div key={i} className="bg-dark-700 rounded-xl p-2 text-center">
                <div className="text-xs text-gray-500 mb-1">{fieldLabels[i]}</div>
                <div className="text-sm font-mono text-cyan-300 font-bold">{f}</div>
              </div>
            ))}
          </div>
        )}

        <div className={`rounded-xl p-4 ${result.ok ? 'bg-cyan-900/20 border border-cyan-800/40' : 'bg-red-900/20 border border-red-800/40'}`}>
          <p className={`text-sm leading-relaxed ${result.ok ? 'text-cyan-100' : 'text-red-400'}`}>{result.text}</p>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-white mb-3">{t('cron.quickRef')}</h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['*', t('cron.refAny')],
            [',', t('cron.refList')],
            ['-', t('cron.refRange')],
            ['/', t('cron.refStep')],
          ].map(([sym, desc]) => (
            <div key={sym} className="flex items-center gap-2 bg-dark-700 rounded-lg px-3 py-2">
              <code className="text-cyan-400 font-mono font-bold w-6">{sym}</code>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
