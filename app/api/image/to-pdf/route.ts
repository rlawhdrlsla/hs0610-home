import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (!files.length) return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });

    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
      const pngBuffer = await sharp(Buffer.from(await file.arrayBuffer())).png().toBuffer();
      const img = await pdfDoc.embedPng(pngBuffer);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const output = await pdfDoc.save();
    const filename = `${randomUUID()}.pdf`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length, pages: files.length,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
