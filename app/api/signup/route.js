import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


export async function POST(request) {
    try {
        const data = await request.json();
        
        const username = data.username;
        const password = data.password;
        const email = data.email

        const account = {username,password,email}

        if (!username || !password || !email) {
            return NextResponse.json(
                { message: 'Wszystkie pola są wymagane' },
                { status: 400 });
        }
        const folders = fs.readdirSync(path.join(process.cwd(), 'data/users'))
        if (folders.some(x=>x===username)){
            return NextResponse.json(
                {message: 'Użytkownik o podanym imieniu istnieje'},
                { status: 400 });
        }
        try{
        const dirPath = path.join(process.cwd(), 'data/users',username );
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);

            const fileName = username+".json"
            const filePath = path.join(dirPath,fileName);
            fs.writeFileSync(filePath, JSON.stringify(account), 'utf-8');

            const mapDirPath = path.join(dirPath,'maps')
            fs.mkdirSync(mapDirPath);
            return NextResponse.json(
            {message: 'Użytkownik został utworzony pomyślnie',
                user: {username}},
            { status: 201 }
        );}}
        catch{
            return NextResponse.json(
                { message: 'Nie udało sie zrobić pliku' },
                { status: 500 })
            
        }
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