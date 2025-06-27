"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-extrabold text-indigo-600">
          FotoFlick
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link href="/gallery" className="hover:text-indigo-500 transition">
            Gallery
          </Link>
          <Link href="/upload" className="hover:text-indigo-500 transition">
            Upload
          </Link>
          <Link href="/about" className="hover:text-indigo-500 transition">
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X className="w-6 h-6 hover:cursor-pointer" /> : <Menu className="w-6 h-6 hover:cursor-pointer" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 text-sm font-medium text-white">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block  bg-purple-600 p-1 text-center rounded-md"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className="block  bg-purple-600 p-1 text-center rounded-md"
          >
            Gallery
          </Link>
          <Link
            href="/upload"
            onClick={() => setIsOpen(false)}
            className="block  bg-purple-600 p-1 text-center rounded-md"
          >
            Upload
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block  bg-purple-600 p-1 text-center rounded-md"
          >
            About
          </Link>

          {isSignedIn ? (
            <div className="text-center p-1 bg-lime-600 rounded-md">
            <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold  transition p-1 text-center">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
}
