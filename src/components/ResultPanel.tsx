
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  isProcessing: boolean;
  outputImage: string;
  className?: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ 
  isProcessing,
  outputImage,
  className
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center h-[350px] rounded-xl border border-violet-200 relative overflow-hidden",
        className
      )}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-violet-200 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-violet-300 border-t-transparent animate-spin animation-delay-500"></div>
          </div>
          <p className="mt-4 text-violet-700 font-medium">Processing...</p>
        </div>
      ) : outputImage ? (
        <img
          src={outputImage}
          alt="Try-on result"
          className="w-full h-full object-contain animate-scale-in"
        />
      ) : (
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-violet-700">Result Preview</h3>
          <p className="mt-2 text-sm text-violet-500">
            Click on "Try Now" to see the magic
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
