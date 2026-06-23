import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

function jsonToXml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (Array.isArray(obj)) {
    return obj.map(item => `${pad}<item>\n${jsonToXml(item, indent + 1)}${pad}</item>`).join('\n');
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => {
        const key = k.replace(/[^a-zA-Z0-9_]/g, '_');
        if (typeof v === 'object' && v !== null) {
          return `${pad}<${key}>\n${jsonToXml(v, indent + 1)}${pad}</${key}>`;
        }
        return `${pad}<${key}>${String(v ?? '')}</${key}>`;
      })
      .join('\n');
  }
  return `${pad}${String(obj ?? '')}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const data = JSON.parse(await file.text());
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${jsonToXml(data, 1)}\n</root>`;

    const filename = `${randomUUID()}.xml`;
    writeFileSync(join(tmpdir(), filename), xml);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, size: xml.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
