import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const text = await file.text();
    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return NextResponse.json({ error: 'CSV must have a header row and data' }, { status: 400 });

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
    });

    const json = JSON.stringify(rows, null, 2);
    const filename = `${randomUUID()}.json`;
    writeFileSync(join(tmpdir(), filename), json);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, count: rows.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
