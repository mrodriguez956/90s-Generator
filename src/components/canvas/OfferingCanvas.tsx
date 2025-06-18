import { Canvas, FabricImage } from "fabric"; // browser
import { useEffect, useRef, useState } from "react";

//import addonJson from "../../data/dbdItemAddons.json";

import offeringBG from "../../assets/img/backgrounds/offeringbg.png"; //why did I need to create images.d.ts for this?
import offeringBrownGrad from "../../assets/img/gradients/offeringBrownGrad.png"; //why did I need to create images.d.ts for this?
import offeringBlueGrad from "../../assets/img/gradients/offeringBlueGrad.png";
import offeringYellowGrad from "../../assets/img/gradients/offeringYellowGrad.png";
import offeringGreenGrad from "../../assets/img/gradients/offeringGreenGrad.png";
import offeringPurpleGrad from "../../assets/img/gradients/offeringPurpleGrad.png";
import offeringPinkGrad from "../../assets/img/gradients/offeringPinkGrad.png";
import offeringEventGrad from "../../assets/img/gradients/offeringEventGrad.png";
import ImageStroke from "image-stroke";
import rotate from "image-stroke/lib/method-rotate";

interface CanvasProps {
  files?: { name: string; data: string }[];
  setCanvasURLs: React.Dispatch<React.SetStateAction<{ name: string; data: string; id: number }[]>>;
}

interface AddonData {
  name: string;
  details: {
    folder: string;
    rarity: string;
  }
}

export function OfferingCanvas({ files, setCanvasURLs}: CanvasProps) {

 
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const downloadEl = useRef<HTMLAnchorElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null); //needed so that the canvas persists after re-renders. Initially, image uploads were causing re-renders then there would be no canvas to add to
  const [downloadURL, setDownloadURL] = useState("");
  const [addonJson, setAddonJson] = useState<AddonData[]>([]);
  
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
      console.log("ItemCanvas received files:", files.length);
      // Clear the canvas before adding new icons after a potential reset
      canvas.clear();

      files.forEach((file) => {
        console.log("ItemCanvas processing file:", file.name);


        const matchingAddons = addonJson.filter(addon => addon.name.includes(file.name));

        if (matchingAddons.length > 0) {
          console.log("Found matching addons:", matchingAddons);
          const rarity = matchingAddons[0].details.rarity;
          addIcon(file.data, file.name, canvas, setDownloadURL, handleAddNewURL, rarity);
        } else {
          console.log(file.name, "could not be matched. No Icon generated");
        }
      });
    }
  }, [files, canvas]);

  useEffect(() => {
    if (canvas) {
      setBackground(canvas);
    }
  }, [canvas]);

  useEffect(() => {
    fetch('https://michaelexile.github.io/DBD-IconsJSON/dbdOfferings.json')
      .then(res => res.json())
      .then(data => setAddonJson(data))
      .catch(err => console.error('Error loading addon data:', err));
  }, []);

  
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
  handleAddNewURL: (name: string, data: string) => void,
  rarity?: string
) {
  const iconImage = new Image();
  const gradImage = new Image();
  const bgImage = new Image();
  
  // Keep track of loaded images and processing status
  let iconLoaded = false;
  let gradLoaded = false;
  let bgLoaded = false;
  let isProcessing = false; // prevent duplicate processing
  
  //runs when both images are loaded
  function processAfterLoad() {
    // Only process once, and only if all images are loaded
    if (isProcessing || !iconLoaded || !gradLoaded || !bgLoaded) return;
    
    // Set processing flag to prevent duplicates
    isProcessing = true;
    console.log("Processing images for:", name);
    
    const fabricBgImage = new FabricImage(bgImage, {
      left: 0,
      top: 0,
      selectable: false, // Set to true if you want to allow selecting the image
    });

    
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
    htmlImage.src = dataURL;
    htmlImage.onload = processHtmlImage;

    
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
      canvas.backgroundImage = fabricBgImage;
      canvas.renderAll();

      const canvasURL = canvas.toDataURL();
      setDownloadURL(canvasURL);

      console.log("Canvas URL created for", name);
      handleAddNewURL(name, canvasURL);

      canvas.remove(fabricImage);
    }



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

  let addonBG:any;
  let addonGrad:any;

  if (rarity) {
    addonBG = rarity === "common" ? offeringBG
                : rarity === "uncommon" ? offeringBG
                : rarity === "rare" ? offeringBG
                : rarity === "very_rare" ? offeringBG
                : rarity === "ultra_rare" ? offeringBG
                : offeringBG;

                addonGrad = rarity === "common" ? offeringBrownGrad
                : rarity === "uncommon" ? offeringGreenGrad //uncommon is green
                : rarity === "rare" ? offeringBlueGrad //rare is blue
                : rarity === "very_rare" ? offeringPurpleGrad //very rare is purple
                : rarity === "ultra_rare" ? offeringPinkGrad //ultra rare is pink
                : offeringEventGrad;
  }

  bgImage.onload = () => {
    
    console.log("background loaded successfully");
    bgLoaded = true;
    processAfterLoad();
  };
  
  // Set sources
  iconImage.src = icon;
  gradImage.src = addonGrad;
  bgImage.src = addonBG;
  
  // Check if images are already complete (cached)
  if (iconImage.complete) {
    console.log("iconImage already loaded for:", name);
    iconLoaded = true;
  }
  
  if (gradImage.complete) {
    console.log("gradImage already loaded for:", name);
    gradLoaded = true;
  }

  if (bgImage.complete) {
    console.log("gradImage already loaded for:", name);
    bgLoaded = true;
  }
  
  
  // Run the processing immediately if both images are already loaded
  processAfterLoad();

}

function setBackground(canvas: Canvas, backgroundType?: String) {
  //potential icon background selection?
  const bgImage = new Image();

  const addonBG = backgroundType === "common" ? offeringBG
              : backgroundType === "uncommon" ? offeringBG
              : backgroundType === "rare" ? offeringBG
              : offeringBG;

  bgImage.src = addonBG;


}
