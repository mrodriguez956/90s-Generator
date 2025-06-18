import { Canvas, FabricImage } from "fabric"; // browser
import { useEffect, useRef, useState } from "react";
import perkBackground from "../../assets/img/backgrounds/perkbg.png"; //why did I need to create images.d.ts for this?
import iconGradient from "../../assets/img/gradients/gradient.png"; //why did I need to create images.d.ts for this?
import ImageStroke from "image-stroke";
import rotate from "image-stroke/lib/method-rotate";

interface CanvasProps {
  files?: { name: string; data: string }[];
  setCanvasURLs: React.Dispatch<React.SetStateAction<{ name: string; data: string; id: number }[]>>;
}

export function PerkCanvas({ files, setCanvasURLs}: CanvasProps) {

 
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const downloadEl = useRef<HTMLAnchorElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null); //needed so that the canvas persists after re-renders. Initially, image uploads were causing re-renders then there would be no canvas to add to
  const [downloadURL, setDownloadURL] = useState("");
  /*const [canvasURLs, setCanvasURLs] = useState<
    { name: string; data: string; id: number }[]
  >([]);
*/


  useEffect(() => {
    if (canvasEl.current) {
      const newCanvas = new Canvas(canvasEl.current);
      setCanvas(newCanvas);
    }
  }, []); // Only create canvas once

  useEffect(() => {
    if (canvas) {
      setBackground(canvas);
    }
  }, [canvas]); // Only handle background changes

  useEffect(() => {
    if (files && canvas) {
      console.log("PerkCanvas received files:", files.length);
      // Clear the canvas before adding new icons after a potential reset
      canvas.clear();
      setBackground(canvas);
      files.forEach((file) => {
        console.log("PerkCanvas processing file:", file.name);
        addIcon(file.data, file.name, canvas, setDownloadURL, handleAddNewURL);
      });
    }
  }, [files, canvas]);

  useEffect(() => {
    if (canvas) {
      setBackground(canvas);
    }
  }, [canvas]);

  
  function downloadCanvas() {
    if (downloadEl.current && downloadURL) {
      downloadEl.current.href = downloadURL;
      downloadEl.current.download = files?.[0]?.name + ".png"; //we need to add multifile download functionality here
    }
  }

  const handleAddNewURL = (name: string, data: string) => {
    setCanvasURLs((prev) => {
      const exists = prev.some(item => item.name === name);
      if (exists) {
        console.log("File already exists in canvasURLs:", name);
        return prev.map(item => 
          item.name === name ? { ...item, data } : item
        );
      }
      return [...prev, { name, data, id: prev.length }];
    });
  };

 
  return (
    <div className="absolute invisible pointer-events-none">
      <canvas ref={canvasEl} width={250} height={250}></canvas>
      <a ref={downloadEl} onClick={downloadCanvas}>Download</a>
    </div>
  );
}

function addIcon(
  icon: string,
  name: string,
  canvas: Canvas,
  setDownloadURL: (url: string) => void,
  handleAddNewURL: (name: string, data: string) => void
) {
  const iconImage = new Image();
  const gradImage = new Image();
  
  // Keep track of loaded images and processing status
  let iconLoaded = false;
  let gradLoaded = false;
  let isProcessing = false; // prevent duplicate processing
  
  //runs when both images are loaded
  function processAfterLoad() {
    // Only process once, and only if both images are loaded
    if (isProcessing || !iconLoaded || !gradLoaded) return;
    
    // Set processing flag to prevent duplicates
    isProcessing = true;
    console.log("Processing images for:", name);
    
    // Create the clipped fabricImage
    const fabricImage = new FabricImage(gradImage, {
      clipPath: new FabricImage(iconImage, {
        left: 0,
        top: 0,
        width: 256,
        height: 256,
        originX: "center",
        originY: "center",
      }),
      left: 0,
      top: 0,
      width: 256,
      height: 256,
      selectable: false,
    });
    console.log("fabricImage with clipPath created for:", name);

    const dataURL = fabricImage.toDataURL();
    console.log("Data URL created for:", name);

    canvas.remove(fabricImage);

    const htmlImage = new Image();
    
    // Process the HTML image once it's loaded
    function processHtmlImage() {
      console.log("htmlImage loaded for:", name);
      
      const imageStroke = new ImageStroke();
      imageStroke.use(rotate);

      const resultIcon = imageStroke.make(htmlImage, {
        thickness: 2,
        color: "black",
      });

      const fabricImage = new FabricImage(resultIcon, {
        left: 0,
        top: 0,
        width: 256,
        height: 256,
        selectable: false,
      });

      canvas.add(fabricImage);
      canvas.renderAll();

      const canvasURL = canvas.toDataURL();
      setDownloadURL(canvasURL);

      console.log("Canvas URL created for", name);
      handleAddNewURL(name, canvasURL);

      canvas.remove(fabricImage);
    }

    htmlImage.onload = processHtmlImage;
    htmlImage.src = dataURL;

    // Handle cached images
    if (htmlImage.complete) {
      processHtmlImage();
    }
  }

  // Set up onload handlers for both images
  iconImage.onload = () => {
    console.log("iconImage loaded for:", name);
    iconLoaded = true;
    processAfterLoad();
  };
  
  gradImage.onload = () => {
    console.log("gradImage loaded for:", name);
    gradLoaded = true;
    processAfterLoad();
  };
  
  // Set sources
  iconImage.src = icon;
  gradImage.src = iconGradient;
  
  // Check if images are already complete (cached)
  if (iconImage.complete) {
    console.log("iconImage already loaded for:", name);
    iconLoaded = true;
  }
  
  if (gradImage.complete) {
    console.log("gradImage already loaded for:", name);
    gradLoaded = true;
  }
  
  // Run the processing immediately if both images are already loaded
  processAfterLoad();
}

function setBackground(canvas: Canvas) {
  //potential icon background selection?
  const bgImage = new Image();

  bgImage.src = perkBackground;

  bgImage.onload = () => {
    console.log("background loaded successfully");
    const fabricImage = new FabricImage(bgImage, {
      left: 0,
      top: 0,
      selectable: false, // Set to true if you want to allow selecting the image
    });
    canvas.backgroundImage = fabricImage;
    canvas.renderAll();
  };
}

