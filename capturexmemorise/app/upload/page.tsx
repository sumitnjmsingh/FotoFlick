"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const categories = ["All", "Nature", "Travel", "Food", "Animals", "Tech"];

export default function UploadPage() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleUpload = async () => {
    if (!file || !user) {
      toast.error("Please provide all details.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        toast.error("Cloudinary upload failed.");
        setLoading(false);
        return;
      }

      await axios.post("/api/upload", {
        url: cloudData.secure_url,
        title,
        category,
        userId: user.id,
        username: user.fullName || user.username || "Anonymous",
      });

      toast.success("Image uploaded successfully!");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-blue-200">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center flex items-center justify-center gap-2">
            <UploadCloud className="w-8 h-8" />
            Upload Your Image
          </h1>

          {previewUrl && (
            <div className="mb-6 flex justify-center">
              <Image
                src={previewUrl}
                alt="Preview"
                className="rounded-xl object-cover border border-gray-200 shadow-md"
                width={500}
                height={300}
              />
            </div>
          )}

          <div className="grid gap-5">
            <input
              type="text"
              value={title}
              placeholder="Enter a title for your image"
              className="p-3 border border-purple-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full p-3 pr-10 border border-pink-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all shadow-sm text-gray-700"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-pink-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Browse Input */}
            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:cursor-pointer font-semibold py-6 px-4 rounded-xl cursor-pointer transition duration-300">
              {file ? (
                <span className="text-sm text-blue-700 font-medium">
                  📁 {file.name}
                </span>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span>Click to browse or drag & drop an image</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 hover:cursor-pointer transition duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" />
                Upload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
