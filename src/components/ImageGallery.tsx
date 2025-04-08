
import React from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  onSelectImage: (url: string) => void;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onSelectImage,
  className
}) => {
  return (
    <div 
      className={cn(
        "grid grid-cols-3 gap-2 bg-white rounded-xl border border-gray-200 p-3 h-[150px]",
        className
      )}
    >
      {images.map((src, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-lg bg-gray-50 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onSelectImage(src)}
        >
          <img
            src={src}
            alt={`Sample ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
