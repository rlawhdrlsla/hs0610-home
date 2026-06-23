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

    const startPage = parseInt((formData.get('startPage') as string) || '1');
    const endPage = formData.get('endPage') as string;

    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    const total = pdfDoc.getPageCount();
    const start = Math.max(0, startPage - 1);
    const end = endPage ? Math.min(total - 1, parseInt(endPage) - 1) : total - 1;

    if (start > end) return NextResponse.json({ error: 'Start page must be ≤ end page' }, { status: 400 });

    const newPdf = await PDFDocument.create();
    const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const pages = await newPdf.copyPages(pdfDoc, indices);
    pages.forEach(p => newPdf.addPage(p));

    const output = await newPdf.save();
    const filename = `${randomUUID()}.pdf`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length, pages: newPdf.getPageCount(), totalOriginalPages: total,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
