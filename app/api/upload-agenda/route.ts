import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  console.log('[API] Upload request received');
  try {
    const formData = await request.formData();
    console.log('[API] FormData parsed');
    const file = formData.get('file') as File;

    if (!file) {
      console.log('[API] No file in formData');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('[API] File received:', file.name, file.size, 'bytes, type:', file.type);

    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const content = buffer.toString('utf-8');
    console.log('[API] File content read, length:', content.length);

    // Validate JSON
    try {
      const parsed = JSON.parse(content);
      console.log('[API] JSON validation passed, keys:', Object.keys(parsed));
    } catch (error) {
      console.error('[API] JSON validation failed:', error);
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Write to agenda.json
    const filePath = path.join(process.cwd(), 'data', 'agenda.json');
    console.log('[API] Writing to:', filePath);
    await writeFile(filePath, content, 'utf-8');
    console.log('[API] File written successfully');

    return NextResponse.json(
      { message: 'Agenda updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to update agenda' },
      { status: 500 }
    );
  }
}
