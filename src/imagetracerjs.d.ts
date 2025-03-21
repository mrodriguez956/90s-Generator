declare module "imagetracerjs" {
  interface ImageTracerOptions {
    // Tracing
    corsenabled?: boolean;
    ltres?: number;
    qtres?: number;
    pathomit?: number;
    rightangleenhance?: boolean;
    
    // Color quantization
    colorsampling?: number;
    numberofcolors?: number;
    mincolorratio?: number;
    colorquantcycles?: number;
    
    // Layering method
    layering?: number;
    
    // SVG rendering
    strokewidth?: number;
    linefilter?: boolean;
    scale?: number;
    roundcoords?: number;
    viewbox?: boolean;
    desc?: boolean;
    lcpr?: number;
    qcpr?: number;
    
    // Blur
    blurradius?: number;
    blurdelta?: number;
    
    // Palette
    pal?: Array<{ r: number; g: number; b: number; a: number }>;
  }

  const ImageTracer: {
    imageToSVG: (
      image: string,
      callback: (svg: string) => void,
      options: ImageTracerOptions
    ) => void;

    imagedataToSVG: (
      imageData: ImageData,
      options: ImageTracerOptions
    ) => string;

    optionpresets: {
      default: ImageTracerOptions;
      posterized1: ImageTracerOptions;
      posterized2: ImageTracerOptions;
      posterized3: ImageTracerOptions;
      curvy: ImageTracerOptions;
      sharp: ImageTracerOptions;
      detailed: ImageTracerOptions;
      smoothed: ImageTracerOptions;
      grayscale: ImageTracerOptions;
      fixedpalette: ImageTracerOptions;
      randomsampling1: ImageTracerOptions;
      randomsampling2: ImageTracerOptions;
      artistic1: ImageTracerOptions;
      artistic2: ImageTracerOptions;
      artistic3: ImageTracerOptions;
      artistic4: ImageTracerOptions;
    };
  };
  export = ImageTracer;
}