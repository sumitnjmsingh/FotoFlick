"use client";
import ImageCard from "./ImageCard";
import { GalleryFilter } from "./GalleryFilter";
import Navbar from "@/components/Navbar";

const categories = ["All", "Nature", "Travel", "Food", "Animals", "Tech"];

interface ImageWithMeta {
  id: string;
  url: string;
  title: string;
  username: string;
  category?: string;
  createdAt: string | number | Date;
  likes: { id: string; userId: string }[];
  comments: { id: string; content: string }[];
}

export default function GalleryPageClient({
  images,
  selectedCategory,
  sortOrder,
}: {
  images: ImageWithMeta[];
  selectedCategory: string;
  sortOrder: string;
}) {
  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap mb-6 gap-4">
          <GalleryFilter
            categories={categories}
            defaultCategory={selectedCategory}
            defaultSort={sortOrder === "asc" ? "oldest" : "latest"}
          />
          <p className="text-sm text-gray-600">
            Showing <strong>{images.length}</strong> image
            {images.length !== 1 && "s"}
            {selectedCategory !== "All" && ` in “${selectedCategory}”`}
          </p>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <ImageCard
                key={img.id}
                image={{
                  ...img,
                  likes: img.likes.length,
                  comments: img.comments.length,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            No images found for selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
