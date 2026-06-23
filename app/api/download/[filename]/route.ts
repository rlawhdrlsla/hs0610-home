import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const mimeMap: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', avif: 'image/avif', tiff: 'image/tiff',
  pdf: 'application/pdf',
  mp3: 'audio/mpeg', wav: 'audio/wav', aac: 'audio/aac', ogg: 'audio/ogg', flac: 'audio/flac', m4a: 'audio/mp4',
  mp4: 'video/mp4', webm: 'video/webm', avi: 'video/x-msvideo', mov: 'video/quicktime', mkv: 'video/x-matroska',
  zip: 'application/zip', csv: 'text/csv', json: 'application/json', xml: 'application/xml',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  if (!filename || filename.includes('..') || filename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filePath = join(tmpdir(), filename);
  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found or expired' }, { status: 404 });
  }

  try {
    const data = readFileSync(filePath);
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const mime = mimeMap[ext] || 'application/octet-stream';

    unlinkSync(filePath);

    return new Response(data, {
      headers: {
        'Content-Type': mime,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(data.length),
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
