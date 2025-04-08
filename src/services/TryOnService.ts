
/**
 * Service for handling the virtual try-on API requests
 */
class TryOnService {
  private static API_URL = "https://api.clothing.mirrar.com/try-on";

  /**
   * Process try-on request with model and garment images
   */
  public static async processTryOn(
    modelImageUrl: string, 
    garmentImageUrl: string, 
    category: string
  ): Promise<{ outputUrl: string; outputBlob: Blob | null }> {
    try {
      // Convert URLs to File objects
      const modelName = `model_${Date.now()}.png`;
      const garmentName = `garment_${Date.now()}.png`;
      
      const modelBlob = await (await fetch(modelImageUrl)).blob();
      const garmentBlob = await (await fetch(garmentImageUrl)).blob();
      
      const modelFile = new File([modelBlob], modelName, { type: modelBlob.type });
      const garmentFile = new File([garmentBlob], garmentName, { type: garmentBlob.type });
      
      // Prepare form data
      const formData = new FormData();
      formData.append("model_image", modelFile);
      formData.append("garment_image", garmentFile);
      formData.append("category", category);
      
      // Send request
      const response = await fetch(this.API_URL, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });
      
      const result = await response.json();
      
      if (result?.output_image_url && result?.output_image_url.length > 0) {
        console.log("API result:", result);
        const outputUrl = result.output_image_url[0];
        
        try {
          // Fetch the output image as blob
          const outputBlob = await (await fetch(outputUrl)).blob();
          return { outputUrl, outputBlob };
        } catch (error) {
          console.error("Error fetching output image:", error);
          return { outputUrl, outputBlob: null };
        }
      } else {
        throw new Error("API did not return output image URL");
      }
    } catch (error) {
      console.error("Try-on processing error:", error);
      throw error;
    }
  }
}

export default TryOnService;
