import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
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
    const wb = XLSX.read(text, { type: 'string' });
    const output = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;

    const filename = `${randomUUID()}.xlsx`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, size: output.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
