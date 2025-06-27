import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ImageDetailClient } from "@/components/ImageDetailClient";
import Navbar from "@/components/Navbar";

export default async function ImageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const image = await db.image.findUnique({
    where: { id: params.id },
    include: {
      likes: true,
      comments: true,
    },
  });

  if (!image) return notFound();

  return (
    <>
      <Navbar />
      <ImageDetailClient image={image} />
    </>
  );
}
