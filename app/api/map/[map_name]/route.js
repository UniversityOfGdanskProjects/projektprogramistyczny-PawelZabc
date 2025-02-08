import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db';
// import { writeFile } from 'fs/promises';
import fs from 'fs'
import path from 'path';


export async function GET(request, { params }) {
    const filename = params.map_name;
    const filePath = path.join(process.cwd(), 'data/maps', filename+'.json');
    console.log(filePath)
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonContent = JSON.parse(fileContent);
      return NextResponse.json(jsonContent, {status: 200});
    } catch (error) {
      console.error('maps could not be found:', error);
      return new NextResponse('maps could not be found:', { status: 404 });
    }
  }

  