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
  const outputPath = join(tmpdir(), `${id}.gif`);

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const fps = parseInt((formData.get('fps') as string) || '10');
    const scale = parseInt((formData.get('scale') as string) || '480');

    writeFileSync(inputPath, Buffer.from(await file.arrayBuffer()));
    await execAsync(
      `ffmpeg -i "${inputPath}" -vf "fps=${fps},scale=${scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -y "${outputPath}"`,
      { timeout: 300000 }
    );

    const filename = `${id}.gif`;
    return NextResponse.json({
      success: true, filename,
      downloadUrl: `/api/download/${filename}`,
      size: readFileSync(outputPath).length,
    });
  } catch (err) {
    if (existsSync(outputPath)) unlinkSync(outputPath);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    if (existsSync(inputPath)) unlinkSync(inputPath);
  }
}
