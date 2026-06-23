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
  const outputPath = join(tmpdir(), `${id}.mp4`);

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const quality = (formData.get('quality') as string) || 'medium';
    const crfMap: Record<string, string> = { high: '23', medium: '28', low: '35' };
    const crf = crfMap[quality] || '28';

    writeFileSync(inputPath, Buffer.from(await file.arrayBuffer()));
    await execAsync(`ffmpeg -i "${inputPath}" -codec:v libx264 -crf ${crf} -preset medium -codec:a aac -b:a 96k -y "${outputPath}"`, { timeout: 300000 });

    const outputSize = readFileSync(outputPath).length;
    const filename = `${id}.mp4`;

    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      originalSize: (await file.arrayBuffer()).byteLength,
      compressedSize: outputSize,
    });
  } catch (err) {
    if (existsSync(outputPath)) unlinkSync(outputPath);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    if (existsSync(inputPath)) unlinkSync(inputPath);
  }
}
