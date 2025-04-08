
import React from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  onSelectImage: (url: string) => void;
  className?: string;
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onSelectImage,
  className,
  title
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {title && <h3 className="text-sm font-medium text-violet-700">{title}</h3>}
      <div 
        className={cn(
          "grid grid-cols-3 gap-3 bg-white rounded-xl border border-violet-200 p-4 h-[150px]",
          className
        )}
      >
        {images.map((src, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg bg-gray-50 cursor-pointer hover:opacity-90 transition-all duration-300 hover:shadow-md transform hover:scale-105"
            onClick={() => onSelectImage(src)}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={`Sample ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
