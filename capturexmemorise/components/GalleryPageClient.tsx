"use client";

import { useState } from "react";
import ImageCard from "./ImageCard";
import { GalleryFilter } from "./GalleryFilter";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<ImageWithMeta | null>(
    null
  );

  return (
    <div className="bg-white min-h-screen">
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
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            No images found for selected filter.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="relative bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[400px] mb-4 rounded-md overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
            <p className="text-sm text-gray-600">By {selectedImage.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(selectedImage.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
