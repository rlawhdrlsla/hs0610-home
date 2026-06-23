import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (files.length < 2) return NextResponse.json({ error: 'Please upload at least 2 PDF files' }, { status: 400 });

    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }

    const output = await mergedPdf.save();
    const filename = `${randomUUID()}.pdf`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length, pages: mergedPdf.getPageCount(),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
