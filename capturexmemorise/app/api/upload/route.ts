import { NextResponse } from 'next/server';
import {db} from '@/lib/db';

export async function POST(req: Request) {
  try{
  const body = await req.json();
  const image = await db.image.create({
    data: {
      url: body.url,
      title: body.title,
      category: body.category,
      userId: body.userId,
      username: body.username,
    },
  });
  return NextResponse.json(image);}
  catch(error){
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
