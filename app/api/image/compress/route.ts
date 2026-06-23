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
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const quality = parseInt((formData.get('quality') as string) || '80');
    const q = Math.max(1, Math.min(100, quality));

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sharpExt = ext === 'jpg' ? 'jpeg' : ext;

    let image = sharp(buffer);
    if (sharpExt === 'jpeg') image = image.jpeg({ quality: q, mozjpeg: true });
    else if (sharpExt === 'png') image = image.png({ compressionLevel: Math.round((100 - q) / 11) });
    else if (sharpExt === 'webp') image = image.webp({ quality: q });
    else if (sharpExt === 'avif') image = image.avif({ quality: q });
    else image = image.toFormat(sharpExt as Parameters<ReturnType<typeof sharp>['toFormat']>[0]);

    const output = await image.toBuffer();
    const filename = `${randomUUID()}.${ext}`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true,
      filename,
      downloadUrl: `/api/download/${filename}`,
      originalSize: buffer.length,
      compressedSize: output.length,
      savings: Math.round((1 - output.length / buffer.length) * 100),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
