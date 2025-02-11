import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
// const uuid = require('u')
import jwt from 'jsonwebtoken'



export async function POST(request) {
    try {
        const data = await request.json();
        
        const username = data.username;
        const password = data.password;

        if (!username || !password) {
            return NextResponse.json(
                { message: 'Wszystkie pola są wymagane' },
                { status: 400 }
            );
        }
        const folders = fs.readdirSync(path.join(process.cwd(), 'data/users'))
        if (!folders.some(x=>x===username)){
            return NextResponse.json(
                {message: 'Użytkownik o podanym imieniu nie istnieje'},
                { status: 404 });
        }

        const fileName = username+".json"
        const filePath = path.join(process.cwd(), 'data/users',username ,fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonContent = JSON.parse(fileContent);
        if (jsonContent.password !== password){
            return NextResponse.json(
                {message:'Nie poprawne hasło'},
                {status: 400});}
        const token = jwt.sign(jsonContent,ACCESS_TOKEN)
        return NextResponse.json(
            {username:username,
            token:token,
            message:'Zalogowano'},
            {status: 200});

        }catch (error) {
        console.error('Błąd podczas przetwarzania żądania:', error);
        return NextResponse.json(
            { message: 'Wystąpił błąd podczas przetwarzania żądania' },
            { status: 500 }
        );
    }
}