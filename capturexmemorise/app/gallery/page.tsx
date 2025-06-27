// app/gallery/page.tsx
import { db } from "@/lib/db";
import GalleryPageClient from "@/components/GalleryPageClient";
import { headers } from "next/headers";

export default async function GalleryPage() {
  const headersList = await headers();
  const fullUrl = headersList.get("x-next-url") || "";
  const searchParams = new URLSearchParams(fullUrl.split("?")[1]);

  const selectedCategory = searchParams.get("category") || "All";
  const sortOrder = searchParams.get("sort") === "oldest" ? "asc" : "desc";

  const images = await db.image.findMany({
    where:
      selectedCategory !== "All"
        ? { category: { equals: selectedCategory, mode: "insensitive" } }
        : undefined,
    orderBy: { createdAt: sortOrder },
    include: {
      likes: true,
      comments: true,
    },
  });

  return (
    <GalleryPageClient
      images={images}
      selectedCategory={selectedCategory}
      sortOrder={sortOrder}
    />
  );
}
