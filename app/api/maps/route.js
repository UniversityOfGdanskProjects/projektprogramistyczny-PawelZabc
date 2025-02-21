import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


export async function GET(request) {
    try {
      const files = fs.readdirSync(path.join(process.cwd(), 'data/maps'))
      return new NextResponse(files, {status: 200});
    } catch (error) {
      console.error('Error reading file:', error);
      return new NextResponse('File not found', { status: 404 });
    }
  }
