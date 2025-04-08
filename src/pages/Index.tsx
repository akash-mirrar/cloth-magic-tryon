
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, UploadCloud, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [bodyType, setBodyType] = useState("upper_body");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const imageRef = useRef<HTMLInputElement>(null);
  const clothRef = useRef<HTMLInputElement>(null);

  // Sample images
  const modelImages = [
    "/lovable-uploads/24f503ea-7ae9-462b-810f-e7ccd742b0cb.png",
    "/src/assets/images/8ef74f98800cd44d385ff0ee4ab78c9c8442a3eb.png",
    "/src/assets/images/372c6039cbc519cf6fb8cc37b56bac4f5f849edb.png"
  ];

  const upperBodyClothes = [
    "/src/assets/images/87aa1e54d667dbf339aa9d68cfc514e562696281.png",
    "/src/assets/images/6f059e4e4c5370d1647aad5b5b3b892e095fed63.png",
    "/src/assets/images/a50a0b378eef44d712bba7607787ea72d8cc573e.png"
  ];

  const lowerBodyClothes = [
    "/src/assets/images/08062305406-e1.jpg",
    "/src/assets/images/09794304400-e1.jpg",
    "/src/assets/images/09794317400-e1.png"
  ];

  const handleTryOn = async () => {
    if (!image || !clothImage) {
      toast.error("Please upload both model and garment images");
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await TryOnService.processTryOn(image, clothImage, bodyType);
      
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
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
      <header className="w-full py-4 px-6 border-b border-gray-200 flex items-center">
        <MirrarLogo className="h-8" />
        <h1 className="ml-4 text-2xl font-semibold text-gray-800 hidden sm:block">Cloth Magic Try-On</h1>
      </header>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Model Upload Panel */}
          <UploadBox 
            title="Upload Model Image"
            image={image}
            onUploadClick={() => imageRef.current?.click()}
            onClearImage={() => setImage("")}
            className="animate-fade-in"
          />

          {/* Garment Upload Panel */}
          <div className="flex flex-col h-full">
            <Tabs defaultValue="upper_body" onValueChange={setBodyType} className="w-full">
              <TabsList className="w-full mb-2">
                <TabsTrigger value="upper_body" className="flex-1">Upper Body</TabsTrigger>
                <TabsTrigger value="lower_body" className="flex-1">Lower Body</TabsTrigger>
              </TabsList>
            </Tabs>

            <UploadBox 
              title="Upload Garment Image"
              image={clothImage}
              onUploadClick={() => clothRef.current?.click()}
              onClearImage={() => setClothImage("")}
              className="flex-1 animate-fade-in [animation-delay:200ms]"
            />
          </div>

          {/* Result Panel */}
          <ResultPanel 
            isProcessing={isProcessing}
            outputImage={outputImage}
            className="animate-fade-in [animation-delay:400ms]"
          />
        </div>

        {/* Gallery and Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Model Gallery */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Sample Models</h3>
            <ImageGallery 
              images={modelImages} 
              onSelectImage={setImage} 
              className="animate-fade-in"
            />
          </div>

          {/* Garment Gallery */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Sample Garments</h3>
            <ImageGallery 
              images={bodyType === "upper_body" ? upperBodyClothes : lowerBodyClothes} 
              onSelectImage={setClothImage}
              className="animate-fade-in [animation-delay:200ms]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 justify-center animate-fade-in [animation-delay:400ms]">
            <Button 
              onClick={outputImage ? handleReset : handleTryOn}
              disabled={(!image || !clothImage) || isProcessing}
              className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
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
              className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
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
