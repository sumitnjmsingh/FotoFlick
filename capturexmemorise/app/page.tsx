"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  UploadCloud,
  Image as ImageIcon,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <section className="text-center py-20 px-6 bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100">
        <h1 className="text-3xl sm:text-6xl font-extrabold text-gray-800">
          FotoFlick
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          A creative platform to upload, discover, and engage with beautiful
          moments captured by our community.
        </p>
        <Link
          href="/upload"
          className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Upload Your Memory <UploadCloud className="w-5 h-5" />
        </Link>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto grid gap-16 sm:grid-cols-3 text-center">
        <div className="flex flex-col items-center">
          <ImageIcon className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Upload Images
          </h3>
          <p className="text-gray-600 text-sm max-w-sm">
            Seamlessly upload and preview your favorite images. Organize them by
            categories like Nature, Travel, Tech, and more.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Heart className="w-12 h-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Like & Engage
          </h3>
          <p className="text-gray-600 text-sm max-w-sm">
            Engage with the community by liking and reacting to your favorite
            images. Every click counts!
          </p>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Comment & Share
          </h3>
          <p className="text-gray-600 text-sm max-w-sm">
            Start conversations, leave feedback, and share memories with others
            across the platform.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-6 text-center border-t border-blue-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Ready to capture and share your moment?
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Join our growing community today.
        </p>
        <Link
          href="/gallery"
          className="mt-6 inline-flex items-center gap-2 bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          Explore Gallery <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FotoFlick. All rights reserved.
      </footer>
    </div>
  );
}
