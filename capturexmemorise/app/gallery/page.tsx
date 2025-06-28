import { db } from "@/lib/db";
import GalleryPageClient from "@/components/GalleryPageClient";
import { Suspense } from "react";

export default async function GalleryPage() {
  const images = await db.image.findMany({
    include: {
      likes: true,
      comments: true,
    },
  });

  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading gallery...</div>}
    >
      <GalleryPageClient images={images} />
    </Suspense>
  );
}
