// app/api/image/lock/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { imageId, lock } = await req.json();

    if (!userId || !imageId || typeof lock !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const image = await db.image.findUnique({ where: { id: imageId } });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (image.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updated = await db.image.update({
      where: { id: imageId },
      data: { locked: lock },
    });

    return NextResponse.json({ success: true, locked: updated.locked });
  } catch (err) {
    console.error("Failed to toggle lock:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
