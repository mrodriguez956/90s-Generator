declare module "imagetracerjs" {
  const ImageTracer: {
    imageToSVG: (
      image: string,
      options?: any // You can refine this type later
    ) => string;
    // Add other functions if needed
  };
  export = ImageTracer;
}