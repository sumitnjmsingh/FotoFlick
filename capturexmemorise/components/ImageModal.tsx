import Image from "next/image";
import { X } from "lucide-react";

type ImageData = {
  url: string;
  title: string;
  username: string;
};

export default function ImageModal({
  image,
  onClose,
}: {
  image: ImageData;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="relative bg-white rounded-lg p-4 w-full max-w-3xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full h-[400px] mb-4">
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
        <h2 className="text-xl font-bold">{image.title}</h2>
        <p className="text-sm text-gray-600">By {image.username}</p>
      </div>
    </div>
  );
}
