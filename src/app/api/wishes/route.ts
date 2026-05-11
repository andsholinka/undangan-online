import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/wishes.json');

function readWishes() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeWishes(wishes: unknown[]) {
  fs.writeFileSync(filePath, JSON.stringify(wishes, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const wishes = readWishes();
    return NextResponse.json(wishes);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, message, attendance, guests } = body;

    if (!name || !attendance) {
      return NextResponse.json(
        { error: 'Nama dan konfirmasi kehadiran wajib diisi' },
        { status: 400 }
      );
    }

    const newWish = {
      name: String(name).slice(0, 100),
      message: String(message || '').slice(0, 500),
      attendance: String(attendance),
      guests: String(guests || '1'),
      timestamp: new Date().toISOString(),
    };

    const wishes = readWishes();
    wishes.push(newWish);
    writeWishes(wishes);

    return NextResponse.json(newWish, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menyimpan data' },
      { status: 500 }
    );
  }
}
