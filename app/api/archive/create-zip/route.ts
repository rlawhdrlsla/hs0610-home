import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import { PassThrough } from 'stream';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (!files.length) return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });

    const output = await new Promise<Buffer>((resolve, reject) => {
      const pt = new PassThrough();
      const chunks: Buffer[] = [];
      pt.on('data', c => chunks.push(c));
      pt.on('end', () => resolve(Buffer.concat(chunks)));
      pt.on('error', reject);

      const archive = archiver('zip', { zlib: { level: 6 } });
      archive.pipe(pt);
      archive.on('error', reject);

      Promise.all(files.map(async (f) => {
        archive.append(Buffer.from(await f.arrayBuffer()), { name: f.name });
      })).then(() => archive.finalize()).catch(reject);
    });

    const filename = `${randomUUID()}.zip`;
    writeFileSync(join(tmpdir(), filename), output);

    return NextResponse.json({ success: true, filename, downloadUrl: `/api/download/${filename}`, size: output.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
