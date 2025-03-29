import { IconDisplay } from './IconDisplay';

import { Canvas, FabricImage } from 'fabric'; // browser

import { useEffect, useRef, useState } from 'react';
import perkBackground from './assets/img/perkbg.png'; //why did I need to create images.d.ts for this?
import iconGradient from './assets/img/gradient.png'; //why did I need to create images.d.ts for this?
import ImageStroke from 'image-stroke';
import rotate from 'image-stroke/lib/method-rotate'


interface CanvasProps {
  imgUpload?: string;
  imgName?: string;
  files?: { name: string, data: string }[];
}






export function MainCanvas({ /*imgUpload, imgName,*/ files }: CanvasProps) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const downloadEl = useRef<HTMLAnchorElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null); //needed so that the canvas persists after re-renders. Initially, image uploads were causing re-renders then there would be no canvas to add to
  const [downloadURL, setDownloadURL] = useState('');
  const [processedFiles, setProcessedFiles] = useState<{name: string, data: string}[]>([]);
  const [canvasURLs, setCanvasURLs] = useState<{name: string, data: string, id: number}[]>([]);




  useEffect(() => {
    if (canvasEl.current) { //wait until canvas element exists to run
      const newCanvas = new Canvas(canvasEl.current);
      setBackground(newCanvas);
      setCanvas(newCanvas); //store newCanvas into setCanvas for persistence
    }
  }, []); //no trigger = only runs once

  useEffect(() => {
    if (files && canvas) {
      console.log("files from Uploader component:", files);
      files.forEach((file) => {
        console.log("Adding icon:", file.name);
        addIcon(file.data, file.name, canvas, setDownloadURL, handleAddNewURL); //multiple canvas support here
      });
    }
  }, [files]); //imgUpload trigger = only runs when imgUpload changes

  function downloadCanvas() {
    if (downloadEl.current && downloadURL) {
      downloadEl.current.href = downloadURL;
      downloadEl.current.download = files?.[0]?.name + '.png'; //we need to add multifile download functionality here

    }
  }

  const handleAddNewURL = (name: string, data: string) => {
    console.log("Before update:", canvasURLs);
    const updateCanvasURLs = [
      ...canvasURLs,
      {
        id: canvasURLs.length + 1,
        name: name,
        data: data,
      },
    ];
    setCanvasURLs(updateCanvasURLs);
    console.log("Updated canvas URLs:", updateCanvasURLs);
  };


  function addIcon(icon: string, name: string, canvas: Canvas, setDownloadURL: (url: string) => void, handleAddNewURL: (name: string, data: string) => void) {
    const iconImage = new Image();
    const gradImage = new Image();
  
    iconImage.src = icon;
    //console.log("Uploaded File (iconImage):", icon);
    gradImage.src = iconGradient;
  
  
    iconImage.onload = () => {
      gradImage.onload = () => {
        const fabricImage = new FabricImage(gradImage, {
          clipPath: new FabricImage(iconImage, {
  
            left: 0,
            top: 0,
            width: 250,
            height: 250,
            originX: 'center',  // Center the icon horizontally
            originY: 'center',
  
          }),
          left: 0,
          top: 0,
          width: 250,
          height: 250,
          selectable: false,
  
        });
        //clear canvas before adding new icon
  
        const dataURL = fabricImage.toDataURL(); //convert icon to dataURL as ImageStroke library expects an HTML image element, not a Fabric canvas
        console.log("Data URL created"); //sanity check
  
        canvas.remove(fabricImage); //remove icon from canvas
  
        const htmlImage = new Image();
        htmlImage.src = dataURL; //convert dataURL to HTML image element
  
        htmlImage.onload = () => { //wait for html image to be loaded, apply stroke
          const imageStroke = new ImageStroke();
          imageStroke.use(rotate);
  
          const resultIcon = imageStroke.make(htmlImage, {
            thickness: 2,
            color: 'black'
          });
  
          const fabricImage = new FabricImage(resultIcon, {
            left: 0,
            top: 0,
            width: 250,
            height: 250,
            selectable: false,
          });
  
          canvas.add(fabricImage);
          canvas.renderAll(); //BINGO!!!!!!!!!!!!!!!!
  
          const canvasURL = canvas.toDataURL();
          setDownloadURL(canvasURL);
          
          console.log("Canvas URL created for", name)
         
          handleAddNewURL(name, canvasURL);
   
        };
        
      };
    };
  
  }

  return (
    <>
      <canvas ref={canvasEl} width={250} height={250}></canvas>
      <a ref={downloadEl} onClick={downloadCanvas}> Download </a>
      <IconDisplay files={processedFiles} />
    </>
  );

}










function setBackground(canvas: Canvas) { //potential icon background selection?
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
