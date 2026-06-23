import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const output = await pdfDoc.save({ useObjectStreams: true });
    const filename = `${randomUUID()}.pdf`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      originalSize: bytes.byteLength, compressedSize: output.length,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
