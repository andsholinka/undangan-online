import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const API_KEY = process.env.CLOUDINARY_API_KEY || '';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000).toString();
    const folder = 'wedding';

    // Generate signature for signed upload
    const signatureString = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    const cloudinaryForm = new FormData();
    cloudinaryForm.append('file', file);
    cloudinaryForm.append('folder', folder);
    cloudinaryForm.append('timestamp', timestamp);
    cloudinaryForm.append('api_key', API_KEY);
    cloudinaryForm.append('signature', signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: cloudinaryForm }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ url: data.secure_url });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
