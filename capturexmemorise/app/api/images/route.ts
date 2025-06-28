import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") === "oldest" ? "asc" : "desc";

    const images = await db.image.findMany({
      where:
        category !== "All"
          ? { category: { equals: category, mode: "insensitive" } }
          : undefined,
      orderBy: { createdAt: sort },
      include: {
        likes: true,
        comments: true,
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
