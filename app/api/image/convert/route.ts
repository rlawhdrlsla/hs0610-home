import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const format = (formData.get('format') as string) || 'jpeg';

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif', 'avif'];
    if (!allowedFormats.includes(format)) return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 });

    const outputFormat = (format === 'jpg' ? 'jpeg' : format) as Parameters<ReturnType<typeof sharp>['toFormat']>[0];
    const outputExt = format === 'jpeg' ? 'jpg' : format;
    const filename = `${randomUUID()}.${outputExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const output = await sharp(buffer).toFormat(outputFormat).toBuffer();

    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true,
      filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length,
      format: outputExt,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
