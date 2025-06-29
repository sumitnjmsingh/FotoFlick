"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  CalendarDays,
  User2,
  Heart,
  MessageCircle,
  Lock,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Image {
  id: string;
  url: string;
  title: string;
  userId: string;
  username: string;
  createdAt: string | number | Date;
  locked?: boolean;
  likes?: number;
  comments?: number;
}

export default function ImageCard({
  image,
  onClick,
}: {
  image: Image;
  onClick: () => void;
}) {
  const [likes, setLikes] = useState(image.likes || 0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useUser();
  const [locked, setLocked] = useState(image.locked || false);
  const isOwner = user?.id === image.userId;

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like.");
      return;
    }

    try {
      const res = await axios.post("/api/like", {
        imageId: image.id,
        userId: user.id,
      });

      const { liked: isLiked } = res.data;

      setLiked(isLiked);
      setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
    } catch {
      toast.error("Failed to toggle like.");
    }
  };

  const handleToggleLock = async () => {
    try {
      const res = await axios.post("/api/image/lock", {
        imageId: image.id,
        lock: !locked,
      });
      setLocked(res.data.locked);
      toast.success(locked ? "Image unlocked" : "Image locked");
    } catch {
      toast.error("Failed to toggle lock.");
    }
  };

  const handleComment = async () => {
    if (!user) {
      toast.error("Please log in to comment.");
      return;
    }

    if (!comment.trim()) return;

    try {
      setCommentLoading(true);
      await axios.post("/api/comment", {
        imageId: image.id,
        content: comment,
        userId: user.id,
        username: user.fullName || user.username || "Anonymous",
      });

      toast.success("Comment added!");
      setComment("");
      setShowCommentBox(false);
    } catch {
      toast.error("Failed to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl border border-gray-100">
      <div onClick={onClick} className="cursor-pointer group">
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={image.url}
            alt={image.title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              locked && !isOwner ? "blur-sm" : ""
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {locked && !isOwner && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold">
              🔒 Locked Image
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 leading-tight line-clamp-2">
          {image.title}
        </h2>

        <div className="flex items-center text-sm text-gray-500 gap-2">
          <User2 className="w-4 h-4" />
          <span className="truncate">{image.username}</span>
        </div>

        <div className="flex items-center text-sm text-gray-400 gap-2">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(image.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-4 text-gray-600">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={liked ? "currentColor" : "none"}
              />
              {likes}
            </button>
            {isOwner && (
              <button
                onClick={handleToggleLock}
                className="flex items-center gap-1 text-sm hover:text-purple-600"
              >
                {locked ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    Unlock
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Lock
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => setShowCommentBox((prev) => !prev)}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <MessageCircle className="w-4 h-4" />
              {image.comments || 0}
            </button>
          </div>
        </div>

        {showCommentBox && (
          <div className="mt-3 space-y-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              rows={2}
            />
            <button
              onClick={handleComment}
              disabled={commentLoading}
              className="bg-blue-600 text-white py-1 px-4 rounded-md text-sm hover:bg-blue-700 transition disabled:opacity-50"
            >
              {commentLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
