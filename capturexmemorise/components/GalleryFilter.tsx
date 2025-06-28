"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function GalleryFilter({
  categories,
  defaultCategory,
  defaultSort,
}: {
  categories: string[];
  defaultCategory: string;
  defaultSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <select
        value={defaultCategory}
        onChange={(e) => handleChange("category", e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm text-sm text-black"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={defaultSort}
        onChange={(e) => handleChange("sort", e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm text-sm text-black"
      >
        <option value="latest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}
