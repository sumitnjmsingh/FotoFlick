"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
}: {
  images: ImageWithMeta[];
}) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const sortOrder = searchParams.get("sort") === "oldest" ? "asc" : "desc";

  const [selectedImage, setSelectedImage] = useState<ImageWithMeta | null>(
    null
  );

  const filteredImages = useMemo(() => {
    let result = [...images];

    if (selectedCategory !== "All") {
      result = result.filter(
        (img) => img.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [images, selectedCategory, sortOrder]);

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
            Showing <strong>{filteredImages.length}</strong> image
            {filteredImages.length !== 1 && "s"}
            {selectedCategory !== "All" && ` in “${selectedCategory}”`}
          </p>
        </div>

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
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
              className="absolute bottom-14 right-4 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6 hover:cursor-pointer" />
            </button>
            <div className="relative w-full h-[400px] mb-4 rounded-md overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <h2 className="text-2xl font-bold text-black">{selectedImage.title}</h2>
            <p className="text-sm text-gray-600">By {selectedImage.username}</p>
            <p className="text-xs text-gray-600">
              {new Date(selectedImage.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
