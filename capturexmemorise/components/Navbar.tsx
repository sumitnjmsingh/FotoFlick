"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/upload", label: "Upload" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight"
        >
          FotoFlick
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6 hover:cursor-pointer"/> : <Menu className="w-6 h-6 hover:cursor-pointer" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-center rounded-md text-indigo-700 font-medium hover:bg-indigo-50 transition"
            >
              {link.label}
            </Link>
          ))}

          {isSignedIn ? (
            <div className="flex justify-center pt-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
}
