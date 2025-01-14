//app/api/videos/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const jsonFilePath = path.join(process.cwd(), 'public', 'workoutvideos.json');
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    const videos = JSON.parse(data);

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error reading videos JSON:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
