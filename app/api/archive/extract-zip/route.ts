import { NextRequest, NextResponse } from 'next/server';
import unzipper from 'unzipper';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const files: { name: string; size: number }[] = [];

    await new Promise<void>((resolve, reject) => {
      Readable.from(buffer)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          const { path: name, type, uncompressedSize } = entry;
          if (type === 'File') files.push({ name, size: uncompressedSize });
          entry.autodrain();
        })
        .on('finish', resolve)
        .on('error', reject);
    });

    return NextResponse.json({ success: true, files, count: files.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
