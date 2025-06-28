"use client";

import { Suspense } from "react";
import GalleryPageClient from "@/components/GalleryPageClient";

export default function GalleryPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading gallery...</div>}
    >
      <GalleryPageClient />
    </Suspense>
  );
}
