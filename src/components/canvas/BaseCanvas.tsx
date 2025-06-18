import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import ImageStroke from "image-stroke";
import rotate from "image-stroke/lib/method-rotate";

interface CanvasProps {
  files?: { name: string; data: string }[];
  setCanvasURLs: React.Dispatch<React.SetStateAction<{ name: string; data: string; id: number }[]>>;
  jsonEndpoint: string;
  getBackgroundImage: (rarity: string) => { bg: string; grad: string };
  isPerk?: boolean;
}

interface ItemData {
  name: string;
  details: {
    folder: string;
    rarity: string;
  }
}

export function BaseCanvas({ files, setCanvasURLs, jsonEndpoint, getBackgroundImage, isPerk = false }: CanvasProps) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const downloadEl = useRef<HTMLAnchorElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [itemData, setItemData] = useState<ItemData[]>([]);

  useEffect(() => {
    if (canvasEl.current) {
      const newCanvas = new Canvas(canvasEl.current);
      setCanvas(newCanvas);
    }
  }, []);

  
  useEffect(() => {
    if (files && canvas) {
      canvas.clear();
      files.forEach((file) => {
        const matchingItems = itemData.filter(item => item.name.includes(file.name));
        if (matchingItems.length > 0) {
          const rarity = matchingItems[0].details.rarity;
          addIcon(file.data, file.name, canvas, setDownloadURL, handleAddNewURL, rarity);
        }
      });
    }
  }, [files, canvas]);


  useEffect(() => {
    fetch(jsonEndpoint)
      .then(res => res.json())
      .then(data => setItemData(data))
      .catch(err => console.error('Error loading data:', err));
  }, []);

  function downloadCanvas() {
    if (downloadEl.current && downloadURL) {
      downloadEl.current.href = downloadURL;
      downloadEl.current.download = files?.[0]?.name + ".png";
    }
  }

  const handleAddNewURL = (name: string, data: string) => {
    setCanvasURLs((prev) => {
      const exists = prev.some(item => item.name === name);
      if (exists) {
        return prev.map(item => 
          item.name === name ? { ...item, data } : item
        );
      }
      return [...prev, { name, data, id: prev.length }];
    });
  };

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
    
    let iconLoaded = false;
    let gradLoaded = false;
    let bgLoaded = false;
    let isProcessing = false;
    
    function processAfterLoad() {
      if (isProcessing || !iconLoaded || !gradLoaded || !bgLoaded) return;
      
      isProcessing = true;
      
      //const { bg, grad } = getBackgroundImage(rarity || 'common');
      
      const fabricBgImage = new FabricImage(bgImage, {
        left: 0,
        top: 0,
        selectable: false,
      });

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

      const dataURL = fabricImage.toDataURL();
      canvas.remove(fabricImage);
      
      const htmlImage = new Image();
      htmlImage.src = dataURL;
      htmlImage.onload = () => {
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
        handleAddNewURL(name, canvasURL);
        canvas.remove(fabricImage);
      };
    }

    iconImage.onload = () => {
      iconLoaded = true;
      processAfterLoad();
    };
    
    gradImage.onload = () => {
      gradLoaded = true;
      processAfterLoad();
    };

    bgImage.onload = () => {
      bgLoaded = true;
      processAfterLoad();
    };
    
    iconImage.src = icon;
    gradImage.src = getBackgroundImage(rarity || 'common').grad;
    bgImage.src = getBackgroundImage(rarity || 'common').bg;
  }

  return (
    <div className="absolute invisible pointer-events-none">
      <canvas ref={canvasEl} width={250} height={250}></canvas>
      <a ref={downloadEl} onClick={downloadCanvas}>Download</a>
    </div>
  );
}