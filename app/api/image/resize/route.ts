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

    const width = formData.get('width') as string;
    const height = formData.get('height') as string;
    const percentage = formData.get('percentage') as string;
    const maintainAspect = (formData.get('maintainAspect') as string) !== 'false';
    const format = formData.get('format') as string;

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = format || file.name.split('.').pop() || 'jpg';
    const sharpExt = (ext === 'jpg' ? 'jpeg' : ext) as Parameters<ReturnType<typeof sharp>['toFormat']>[0];

    let image = sharp(buffer);
    const metadata = await image.metadata();

    let targetWidth: number | undefined;
    let targetHeight: number | undefined;

    if (percentage) {
      const pct = parseFloat(percentage) / 100;
      targetWidth = Math.round((metadata.width ?? 0) * pct);
      targetHeight = Math.round((metadata.height ?? 0) * pct);
    } else {
      targetWidth = width ? parseInt(width) : undefined;
      targetHeight = height ? parseInt(height) : undefined;
    }

    const output = await image
      .resize({ width: targetWidth, height: targetHeight, fit: maintainAspect ? 'inside' : 'fill' })
      .toFormat(sharpExt)
      .toBuffer();

    const outMeta = await sharp(output).metadata();
    const filename = `${randomUUID()}.${ext}`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true,
      filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length,
      width: outMeta.width,
      height: outMeta.height,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
