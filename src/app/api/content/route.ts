import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
