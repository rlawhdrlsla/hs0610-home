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

    const format = (formData.get('format') as string) || 'mp4';
    const quality = (formData.get('quality') as string) || 'medium';
    const allowedFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv'];
    if (!allowedFormats.includes(format)) return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 });

    const crfMap: Record<string, string> = { high: '18', medium: '23', low: '28' };
    const crf = crfMap[quality] || '23';
    outputPath = join(tmpdir(), `${id}.${format}`);
    writeFileSync(inputPath, Buffer.from(await file.arrayBuffer()));

    let command: string;
    if (format === 'webm') {
      command = `ffmpeg -i "${inputPath}" -codec:v libvpx-vp9 -crf ${crf} -b:v 0 -codec:a libopus -y "${outputPath}"`;
    } else if (format === 'avi') {
      command = `ffmpeg -i "${inputPath}" -codec:v mpeg4 -q:v 5 -codec:a mp3 -y "${outputPath}"`;
    } else {
      command = `ffmpeg -i "${inputPath}" -codec:v libx264 -crf ${crf} -preset medium -codec:a aac -b:a 128k -y "${outputPath}"`;
    }

    await execAsync(command, { timeout: 300000 });
    const filename = `${id}.${format}`;

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: readFileSync(outputPath).length, format,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    if (existsSync(inputPath)) unlinkSync(inputPath);
  }
}
