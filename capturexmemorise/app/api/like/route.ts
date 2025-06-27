import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageId, userId } = await req.json();

    if (!imageId || !userId) {
      return NextResponse.json(
        { error: "Missing imageId or userId" },
        { status: 400 }
      );
    }

    // Check if the like already exists
    const existingLike = await db.like.findFirst({
      where: {
        imageId,
        userId,
      },
    });

    if (existingLike) {
      // If already liked, remove it (unlike)
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json({ success: true, liked: false });
    } else {
      // Otherwise, create a new like
      await db.like.create({
        data: {
          imageId,
          userId,
        },
      });

      return NextResponse.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error("Like toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
