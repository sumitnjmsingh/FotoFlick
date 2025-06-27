// app/api/comment/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { imageId, content, userId, username } = await req.json();

  try {
    await db.comment.create({
      data: {
        imageId,
        content,
        userId,
        username,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Comment error:", error);
    return NextResponse.json({ error: "Failed to comment" }, { status: 500 });
  }
}
