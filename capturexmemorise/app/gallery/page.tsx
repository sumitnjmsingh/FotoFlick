import { db } from "@/lib/db";
import GalleryPageClient from "@/components/GalleryPageClient";

export default async function GalleryPage() {
  const images = await db.image.findMany({
    include: {
      likes: true,
      comments: true,
    },
  });

  return <GalleryPageClient images={images} />;
}
