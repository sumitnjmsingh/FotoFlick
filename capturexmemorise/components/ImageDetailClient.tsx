"use client";

import { Heart, Share2, CalendarDays, User2 } from "lucide-react";
import Image from "next/image";

interface Comment {
  id: string;
  content: string;
}

interface Like {
  id: string;
}

interface ImageDetail {
  url: string;
  title: string;
  username: string;
  createdAt: string | Date;
  likes: Like[];
  comments: Comment[];
}

export function ImageDetailClient({ image }: { image: ImageDetail }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg mb-6">
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{image.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User2 className="w-4 h-4" />
            {image.username}
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {new Date(image.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition font-semibold">
            <Heart className="w-5 h-5" />
            {image.likes.length}
          </button>
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-semibold">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Comments ({image.comments.length})
          </h2>
          {image.comments.length > 0 ? (
            <ul className="space-y-4">
              {image.comments.map((comment: Comment) => (
                <li
                  key={comment.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
