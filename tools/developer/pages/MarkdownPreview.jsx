import React, { useState, useMemo, useEffect } from 'react';
import { FileText, Copy } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const SAMPLE = `# Hello, DevKit!

Write **Markdown** here and see the preview in real time.

## Features

- **Bold** and *italic* text
- ~~Strikethrough~~
- \`inline code\`
- [Links](https://example.com)

## Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Table

| Name  | Role       | Status  |
|-------|------------|---------|
| Alice | Developer  | Active  |
| Bob   | Designer   | Active  |

> Blockquotes look great too.
`;

export default function MarkdownPreview() {
  const { t } = useTranslation();
  const [source, setSource] = useState(SAMPLE);

  useEffect(() => { document.title = `${t('markdown.title')} — DevKit`; }, [t]);
  const [tab, setTab] = useState('split');

  const html = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });
    return DOMPurify.sanitize(marked.parse(source));
  }, [source]);

  function copySource() {
    navigator.clipboard.writeText(source);
    toast.success(t('common.copy') + '!');
  }

  const showEdit    = tab === 'edit'    || tab === 'split';
  const showPreview = tab === 'preview' || tab === 'split';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lime-600 to-lime-400 flex items-center justify-center">
            <FileText size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('markdown.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('markdown.desc')}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {[
          { id: 'edit',    label: t('markdown.edit') },
          { id: 'split',   label: t('markdown.split') },
          { id: 'preview', label: t('markdown.preview') },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              tab === id ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-dark-600 text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
        <button onClick={copySource} className="ml-auto copy-btn flex items-center gap-1">
          <Copy size={11} /> {t('markdown.copyMarkdown')}
        </button>
      </div>

      <div className={`grid gap-4 ${tab === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {showEdit && (
          <div className="card p-4">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{t('markdown.markdownLabel')}</p>
            <textarea className="textarea w-full" style={{ height: '60vh', minHeight: '400px' }} value={source} onChange={e => setSource(e.target.value)} spellCheck={false} />
          </div>
        )}
        {showPreview && (
          <div className="card p-5">
            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">{t('markdown.previewLabel')}</p>
            <div
              className="prose prose-invert prose-sm max-w-none overflow-auto"
              style={{ height: tab === 'split' ? '60vh' : 'auto', minHeight: '400px' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>

      <style>{`
        .prose h1,.prose h2,.prose h3 { color: #f3f4f6; margin-top: 1.25em; margin-bottom: 0.5em; font-weight: 700; }
        .prose h1 { font-size: 1.5em; border-bottom: 1px solid #2e2e2e; padding-bottom: 0.3em; }
        .prose h2 { font-size: 1.25em; }
        .prose p { color: #d1d5db; margin-bottom: 0.75em; line-height: 1.7; }
        .prose a { color: #22d3ee; }
        .prose strong { color: #f9fafb; }
        .prose em { color: #e5e7eb; }
        .prose code { background: #1f1f1f; color: #67e8f9; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.875em; }
        .prose pre { background: #161616; border: 1px solid #2e2e2e; border-radius: 12px; padding: 1em; overflow-x: auto; }
        .prose pre code { background: none; padding: 0; color: #d1fae5; }
        .prose ul, .prose ol { color: #d1d5db; padding-left: 1.5em; margin-bottom: 0.75em; }
        .prose li { margin-bottom: 0.25em; }
        .prose blockquote { border-left: 3px solid #06b6d4; padding-left: 1em; color: #9ca3af; margin: 1em 0; font-style: italic; }
        .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
        .prose th { background: #1f1f1f; color: #f3f4f6; padding: 0.5em 0.75em; text-align: left; border: 1px solid #2e2e2e; }
        .prose td { color: #d1d5db; padding: 0.5em 0.75em; border: 1px solid #2e2e2e; }
        .prose del { color: #6b7280; }
        .prose hr { border-color: #2e2e2e; margin: 1.5em 0; }
      `}</style>
    </div>
  );
}
