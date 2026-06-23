import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}
function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}
function toCamel(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_, c) => c.toUpperCase());
}
function toPascal(str) {
  const c = toCamel(str);
  return c.charAt(0).toUpperCase() + c.slice(1);
}
function toSnake(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
}
function toKebab(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
}
function toDot(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '.').replace(/^\.|\.$/g, '');
}
function toConstant(str) {
  return toSnake(str).toUpperCase();
}

export default function CaseConverter() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  useEffect(() => { document.title = `${t('caseConvert.title')} — TextKit`; }, [t]);

  const cases = [
    { label: t('caseConvert.upper'),    fn: s => s.toUpperCase() },
    { label: t('caseConvert.lower'),    fn: s => s.toLowerCase() },
    { label: t('caseConvert.title'),    fn: toTitleCase },
    { label: t('caseConvert.sentence'), fn: toSentenceCase },
    { label: t('caseConvert.camel'),    fn: toCamel },
    { label: t('caseConvert.pascal'),   fn: toPascal },
    { label: t('caseConvert.snake'),    fn: toSnake },
    { label: t('caseConvert.kebab'),    fn: toKebab },
    { label: t('caseConvert.dot'),      fn: toDot },
    { label: t('caseConvert.constant'), fn: toConstant },
  ];

  function copy(text) {
    navigator.clipboard.writeText(text).then(() => toast.success(t('common.copy') + '!'));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
          <Type size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('caseConvert.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('caseConvert.desc')}</p>

      <div className="mb-6">
        <label className="label">{t('common.input')}</label>
        <textarea
          className="textarea h-36"
          placeholder={t('caseConvert.placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {cases.map(({ label, fn }) => {
          const result = input ? fn(input) : '';
          return (
            <div key={label} className="card p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</div>
                <div className="text-sm text-gray-200 font-mono break-all leading-relaxed">
                  {result || <span className="text-gray-600 italic">—</span>}
                </div>
              </div>
              {result && (
                <button onClick={() => copy(result)} className="copy-btn shrink-0">
                  {t('common.copy')}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
