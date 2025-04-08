
import React from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  title: string;
  image: string;
  onUploadClick: () => void;
  onClearImage: () => void;
  className?: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({ 
  title, 
  image, 
  onUploadClick, 
  onClearImage,
  className 
}) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col items-center justify-center h-[350px] rounded-xl border border-dashed cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md hover:border-violet-400",
        className
      )}
      onClick={onUploadClick}
    >
      {image ? (
        <>
          <button
            type="button"
            className="absolute top-2 right-2 z-10 p-1 bg-white/80 backdrop-blur-sm rounded-full text-violet-500 hover:text-violet-800 hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClearImage();
            }}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={image}
            alt="Uploaded content"
            className="w-full h-full object-contain transition-all duration-500"
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-full bg-violet-100/60">
            <UploadCloud className="h-8 w-8 text-violet-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-violet-700">{title}</h3>
          <p className="mt-2 text-sm text-violet-500">
            PNG, JPG or JPEG (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
