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

    const left = parseInt((formData.get('left') as string) || '0');
    const top = parseInt((formData.get('top') as string) || '0');
    const width = parseInt(formData.get('width') as string);
    const height = parseInt(formData.get('height') as string);

    if (!width || !height) return NextResponse.json({ error: 'Width and height required' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const sharpExt = (ext === 'jpg' ? 'jpeg' : ext) as Parameters<ReturnType<typeof sharp>['toFormat']>[0];

    const output = await sharp(buffer).extract({ left, top, width, height }).toFormat(sharpExt).toBuffer();
    const meta = await sharp(output).metadata();
    const filename = `${randomUUID()}.${ext}`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length, width: meta.width, height: meta.height,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
