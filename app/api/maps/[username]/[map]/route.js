import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import authorisation from '@/app/api/authorise';

export async function GET(request,{params}) {
    try {
      const { map,username } = await params;
      const user = await authorisation(request.headers)
      if (user.user) {
        if(user.user.username===username){
        const folderPath = path.join(process.cwd(), 'data/users', user.user.username)
        if (fs.existsSync(folderPath)){
              const filePath = path.join(process.cwd(), 'data/users',username, 'maps' ,map+'.json');
              try {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const jsonContent = JSON.parse(fileContent);
                return NextResponse.json(jsonContent, {status: 200});
              } catch (error) {
                console.error('map could not be found', error);
                return new NextResponse('map could not be found', { status: 404 });
              }
        }
        else{
          return NextResponse.json({message:"No account"}, {status: 404});
        }
      }else{return NextResponse.json({message:"No authority"}, {status: 402});}
    }
      else{
        return NextResponse.json({message:user.message}, {status: 400});
      }
      
      
    } catch (error) {
      console.error('Error reading folder:', error);
      return NextResponse.json({message:'Folder not found'}, { status: 404 });
    }
  }

  export async function PUT(request,{params}) {
    try {
      const { map,username } = await params;
      const user = await authorisation(request.headers)
      if (user.user) {
        if(user.user.username===username){
        const folderPath = path.join(process.cwd(), 'data/users', user.user.username)
        if (fs.existsSync(folderPath)){
              const filePath = path.join(process.cwd(), 'data/users',username, 'maps' ,map+'.json');
              if (fs.existsSync(filePath)){
                const data = await request.json();
                if(data){ fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                  return NextResponse.json({message:"Saved"}, {status: 201});
                }
                return NextResponse.json({message:"No json to save"}, {status: 400});
                
              }else{
                return new NextResponse('map exists', { status: 400 });
              }
        }
        else{
          return NextResponse.json({message:"No account"}, {status: 404});
        }
      }else{return NextResponse.json({message:"No authority"}, {status: 402});}
    }
      else{
        return NextResponse.json({message:user.message}, {status: 400});
      }
      
      
    } catch (error) {
      console.error('Error reading folder:', error);
      return NextResponse.json({message:'Folder not found'}, { status: 404 });
    }
  }  

  export async function DELETE(request,{params}) {
    try {
      const { map,username } = await params;
      const user = await authorisation(request.headers)
      if (user.user) {
        if(user.user.username===username){
        const folderPath = path.join(process.cwd(), 'data/users', user.user.username)
        if (fs.existsSync(folderPath)){
              const filePath = path.join(process.cwd(), 'data/users',username, 'maps' ,map+'.json');
              if (fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
                return NextResponse.json({message:"Deleted"}, {status: 200});
              }else{
                return new NextResponse("map doesn't exists", { status: 400 });
              }
        }
        else{
          return NextResponse.json({message:"No account"}, {status: 404});
        }
      }else{return NextResponse.json({message:"No authority"}, {status: 402});}
    }
      else{
        return NextResponse.json({message:user.message}, {status: 400});
      }
      
      
    } catch (error) {
      console.error('Error reading folder:', error);
      return NextResponse.json({message:'Folder not found'}, { status: 404 });
    }
  }  
