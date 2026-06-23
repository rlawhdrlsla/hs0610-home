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

    const data = JSON.parse(await file.text());
    const rows = Array.isArray(data) ? data : [data];
    if (!rows.length) return NextResponse.json({ error: 'Empty JSON array' }, { status: 400 });

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map(row => headers.map(h => `"${String((row as Record<string,unknown>)[h] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const filename = `${randomUUID()}.csv`;
    writeFileSync(join(tmpdir(), filename), csv);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, rows: rows.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
