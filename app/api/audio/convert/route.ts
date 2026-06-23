import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const inputPath = join(tmpdir(), `${id}_input`);
  let outputPath = '';

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const format = (formData.get('format') as string) || 'mp3';
    const bitrate = (formData.get('bitrate') as string) || '192k';
    const allowedFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'];
    if (!allowedFormats.includes(format)) return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 });

    outputPath = join(tmpdir(), `${id}.${format}`);
    writeFileSync(inputPath, Buffer.from(await file.arrayBuffer()));
    await execAsync(`ffmpeg -i "${inputPath}" -b:a ${bitrate} -y "${outputPath}"`);

    const output = readFileSync(outputPath);
    const filename = `${id}.${format}`;

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: output.length, format,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    if (existsSync(inputPath)) unlinkSync(inputPath);
  }
}
