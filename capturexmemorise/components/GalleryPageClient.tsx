"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ImageCard from "./ImageCard";
import { GalleryFilter } from "./GalleryFilter";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { X, Share2, LoaderCircle, CalendarDays } from "lucide-react";

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

export default function GalleryPageClient() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const sortOrder = searchParams.get("sort") === "oldest" ? "asc" : "desc";

  const [images, setImages] = useState<ImageWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageWithMeta | null>(
    null
  );

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        category: selectedCategory,
        sort: sortOrder === "asc" ? "oldest" : "latest",
      });

      try {
        const res = await fetch(`/api/images?${query.toString()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setImages(data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory, sortOrder]);

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

        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-20 space-y-4">
            <LoaderCircle className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : images.length > 0 ? (
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

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="relative bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg">
            <div className="relative w-full h-[400px] mb-4 rounded-md overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-red-500"
              >
                <X className="w-6 h-6 hover:cursor-pointer" />
              </button>
              <a
                href={selectedImage.url.replace(
                  "/upload/",
                  `/upload/fl_attachment:${selectedImage.title.replace(
                    /\s+/g,
                    "_"
                  )}/`
                )}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm rounded-lg shadow-md transition"
              >
                Download
              </a>
              <button
                onClick={() =>
                  navigator
                    .share?.({
                      title: selectedImage.title,
                      text: `Check out this image: ${selectedImage.title}`,
                      url: selectedImage.url,
                    })
                    .catch((err) => console.error("Share failed:", err))
                }
                className="absolute bottom-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 hover:cursor-pointer px-4 py-2 text-sm rounded-lg shadow-md transition flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-black mb-1">
                {selectedImage.title}
              </h2>
              <p className="text-sm text-gray-600">
                By {selectedImage.username}
              </p>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                {new Date(selectedImage.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Comments
              </h3>
              {selectedImage.comments.length > 0 ? (
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {selectedImage.comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="text-sm text-gray-700 bg-gray-100 rounded-lg p-2"
                    >
                      {comment.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
