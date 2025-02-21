import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();

        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || !password) {
            return NextResponse.json(
                { message: 'Wszystkie pola są wymagane' },
                { status: 400 }
            );
        }
        const files = fs.readdirSync(path.join(process.cwd(), 'data/maps'))
        if (files.some(x=>x===username+".json")){
            return NextResponse.json(
                {
                    message: 'Użytkownik istnieje'
                },
                { status: 400 }
            );
        }

        

        
        return NextResponse.json(
            {
                message: 'Użytkownik został utworzony pomyślnie',
                user: {
                    username
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Błąd podczas przetwarzania żądania:', error);
        return NextResponse.json(
            { message: 'Wystąpił błąd podczas przetwarzania żądania' },
            { status: 500 }
        );
    }
}

export async function GET() {
    
  return NextResponse.json(
    { message: 'Hi' },
    { status: 200}
);

}