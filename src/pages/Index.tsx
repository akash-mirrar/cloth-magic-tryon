
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, UploadCloud, Trash2, Download, Shirt, ShoppingBag, Tshirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TryOnService from "@/services/TryOnService";
import UploadBox from "@/components/UploadBox";
import ImageGallery from "@/components/ImageGallery";
import ResultPanel from "@/components/ResultPanel";
import MirrarLogo from "@/components/MirrarLogo";

const Index = () => {
  const [image, setImage] = useState("");
  const [clothImage, setClothImage] = useState("");
  const [outputImage, setOutputImage] = useState("");
  const [outputImageBlob, setOutputImageBlob] = useState<Blob | null>(null);
  const [category, setCategory] = useState<"tops" | "bottoms" | "one-pieces">("tops");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const imageRef = useRef<HTMLInputElement>(null);
  const clothRef = useRef<HTMLInputElement>(null);

  // Sample images - updated with the provided URLs
  const modelImages = [
    "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/37a7fb957d4ea23233ab8f43536c7c297b5833c6.png",
    "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/372c6039cbc519cf6fb8cc37b56bac4f5f849edb.png",
    "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/a528918fdc85c9049ae9099d8cde0697.png"
  ];

  // Category-specific garment images
  const garmentImagesByCategory = {
    tops: [
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/87aa1e54d667dbf339aa9d68cfc514e562696281.png",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/6f059e4e4c5370d1647aad5b5b3b892e095fed63.png",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/a50a0b378eef44d712bba7607787ea72d8cc573e.png"
    ],
    bottoms: [
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/08062305406-e1.jpg",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/09794304400-e1.jpg",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/09794317400-e1.png"
    ],
    "one-pieces": [
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/02840709605-e1.jpg",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/02976241080-e1.jpg",
      "https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/tryon-uploads/03079649942-e1.jpg"
    ]
  };

  // Get current garment images based on selected category
  const currentGarmentImages = garmentImagesByCategory[category];

  const handleTryOn = async () => {
    if (!image || !clothImage) {
      toast.error("Please upload both model and garment images");
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await TryOnService.processTryOn(image, clothImage, category);
      
      if (result.outputUrl && result.outputBlob) {
        setOutputImage(result.outputUrl);
        setOutputImageBlob(result.outputBlob);
        toast.success("Virtual try-on complete!");
      } else {
        toast.error("Could not generate try-on image");
      }
    } catch (error) {
      console.error("Try-on failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOutputImage("");
    setOutputImageBlob(null);
  };

  const handleDownload = () => {
    if (outputImageBlob) {
      const url = URL.createObjectURL(outputImageBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cloth-magic-tryon.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    }
  };

  const handleCategoryChange = (newCategory: "tops" | "bottoms" | "one-pieces") => {
    setCategory(newCategory);
    setClothImage(""); // Clear selected garment image when changing categories
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      {/* Hidden file inputs */}
      <input
        ref={imageRef}
        type="file"
        className="hidden"
        accept="image/png,image/jpeg,image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(URL.createObjectURL(file));
        }}
      />
      
      <input
        ref={clothRef}
        type="file"
        className="hidden"
        accept="image/png,image/jpeg,image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setClothImage(URL.createObjectURL(file));
        }}
      />

      {/* Header */}
      <header className="w-full py-4 px-6 border-b border-violet-200 bg-white/70 backdrop-blur-sm flex items-center">
        <MirrarLogo className="h-8" />
        <h1 className="ml-4 text-2xl font-semibold text-violet-800 hidden sm:block">Cloth Magic Try-On</h1>
      </header>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Category Selector */}
        <div className="mb-6">
          <Tabs defaultValue="tops" value={category} onValueChange={(value) => handleCategoryChange(value as "tops" | "bottoms" | "one-pieces")} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-2 bg-violet-100/50">
              <TabsTrigger value="tops" className="flex items-center gap-2 data-[state=active]:bg-violet-200 data-[state=active]:text-violet-800">
                <Shirt className="w-4 h-4" />
                <span>Tops</span>
              </TabsTrigger>
              <TabsTrigger value="bottoms" className="flex items-center gap-2 data-[state=active]:bg-violet-200 data-[state=active]:text-violet-800">
                <ShoppingBag className="w-4 h-4" />
                <span>Bottoms</span>
              </TabsTrigger>
              <TabsTrigger value="one-pieces" className="flex items-center gap-2 data-[state=active]:bg-violet-200 data-[state=active]:text-violet-800">
                <Tshirt className="w-4 h-4" />
                <span>One-Pieces</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Model Upload Panel */}
          <UploadBox 
            title="Upload Model Image"
            image={image}
            onUploadClick={() => imageRef.current?.click()}
            onClearImage={() => setImage("")}
            className="bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200 animate-fade-in"
          />

          {/* Garment Upload Panel */}
          <UploadBox 
            title="Upload Garment Image"
            image={clothImage}
            onUploadClick={() => clothRef.current?.click()}
            onClearImage={() => setClothImage("")}
            className="bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200 flex-1 animate-fade-in [animation-delay:200ms]"
          />

          {/* Result Panel */}
          <ResultPanel 
            isProcessing={isProcessing}
            outputImage={outputImage}
            className="bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200 animate-fade-in [animation-delay:400ms]"
          />
        </div>

        {/* Gallery and Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Model Gallery */}
          <ImageGallery 
            title="Sample Models"
            images={modelImages} 
            onSelectImage={setImage} 
            className="animate-fade-in"
          />

          {/* Garment Gallery - now showing images based on selected category */}
          <ImageGallery 
            title={`Sample ${category.charAt(0).toUpperCase() + category.slice(1)}`}
            images={currentGarmentImages} 
            onSelectImage={setClothImage}
            className="animate-fade-in [animation-delay:200ms]"
          />

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 justify-center animate-fade-in [animation-delay:400ms]">
            <Button 
              onClick={outputImage ? handleReset : handleTryOn}
              disabled={(!image || !clothImage) || isProcessing}
              className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-violet-600 to-indigo-600"
              variant={outputImage ? "outline" : "default"}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </div>
              ) : outputImage ? (
                "Try Again"
              ) : (
                <>
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Try Now
                </>
              )}
            </Button>

            <Button 
              onClick={handleDownload}
              disabled={!outputImageBlob}
              variant="secondary"
              className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-indigo-100 to-violet-100 text-violet-800"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
