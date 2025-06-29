import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-gray-800">
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">About FotoFlick</h1>
          <p className="text-lg text-white/90">
            Discover the story and purpose behind the platform that brings
            photographers and creators together.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          FotoFlick empowers users to share, explore, and engage with visual
          content. Whether you are a professional photographer, hobbyist, or
          simply someone who enjoys visual storytelling, our platform is
          designed to bring your photos to life and build a community around
          them.
        </p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Upload & Showcase",
                description:
                  "Easily upload high-quality images and organize them by category.",
              },
              {
                title: "Engage with Community",
                description:
                  "Like, comment, and interact with other users’ photos in real-time.",
              },
              {
                title: "Responsive Design",
                description:
                  "Seamlessly browse and upload images from any device.",
              },
              {
                title: "Search & Filter",
                description:
                  "Quickly find images based on category or upload date.",
              },
              {
                title: "Secure & Private",
                description:
                  "Your data is safe with robust authentication and privacy settings.",
              },
              {
                title: "Powered by Modern Tech",
                description:
                  "Built with Next.js, Tailwind, Prisma, and Clerk for a blazing-fast experience.",
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Meet the Creator
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/creator.png"
              alt="Creator"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-semibold">Sumit Singh</h3>
              <p className="text-gray-600">
                A passionate full-stack developer and B.Tech CSE student at IIT
                Mandi. Sumit is dedicated to building high-quality,
                user-friendly applications using modern web technologies.
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
              <Link
                href="https://github.com/sumitnjmsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <Github className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/sumit-pratap-singh-5009431aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
              >
                <Linkedin className="w-5 h-5" />
              </Link>

              <Link
                href="mailto:sumitjfsingh1111@gmail.com"
                className="text-red-500 hover:text-red-700 transition"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Tech Stack</h2>
          <ul className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
            {[
              "Next.js",
              "React",
              "Tailwind CSS",
              "TypeScript",
              "Prisma",
              "PostgreSQL",
              "Clerk Auth",
              "Cloudinary",
              "Vercel",
            ].map((tech) => (
              <li
                key={tech}
                className="bg-white px-4 py-2 rounded-full shadow text-center"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} FotoFlick. All rights reserved.
      </footer>
    </main>
  );
}
