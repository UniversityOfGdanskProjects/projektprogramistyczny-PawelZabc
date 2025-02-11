import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import authorisation from '@/app/api/authorise';
import { array } from 'yup';

export async function GET(request, {params}) {
    try {
      const { username } = await params;
      const user = await authorisation(request.headers)
      if (user.user) {
        if(user.user.username===username){
        const folderPath = path.join(process.cwd(), 'data/users', username)
        if (fs.existsSync(folderPath)){
          const files = fs.readdirSync(path.join(folderPath,"maps"))
          return NextResponse.json({files:files}, {status: 200});
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

  export async function POST(request,{params}) {
    try {
      const data = await request.json();
      const {username} = await params;
      const user = await authorisation(request.headers)
      if (user.user) {
        if(user.user.username===username){
        const folderPath = path.join(process.cwd(), 'data/users', user.user.username)
        if (fs.existsSync(folderPath)){
              const filePath = path.join(process.cwd(), 'data/users',username, 'maps' ,data.name+'.json');
              if (!fs.existsSync(filePath)){
                  const width = data.width
                  const height = data.height
                  const size = width * height 
                  const tiles = [...Array(size)].map(x=>{return{ground:[5,0],object:null}})
                  const file = {width,height,tiles}
                  // console.log(file)
                  fs.writeFileSync(filePath, JSON.stringify(file, null, 2), 'utf8');
                  return NextResponse.json({message:"Created"}, {status: 201});
                }
                else{
                return new NextResponse('File with that name exists', { status: 400 });
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