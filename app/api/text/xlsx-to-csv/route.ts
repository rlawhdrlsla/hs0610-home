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

    const buffer = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);

    const filename = `${randomUUID()}.csv`;
    writeFileSync(join(tmpdir(), filename), csv);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, size: csv.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
