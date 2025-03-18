import * as fabric from 'fabric';

import { useEffect, useRef, useState } from 'react';
import perkBackground from './assets/perkbg.png'; //why did I need to create images.d.ts for this?


interface CanvasProps { 
    imgUpload?: File;
  }
  





  export function Canvas({imgUpload}:CanvasProps)
  
  {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        if (canvasEl.current) { //wait until canvas element exists to run
        const newCanvas = new fabric.Canvas(canvasEl.current);
         setBackground(newCanvas);
         setCanvas(newCanvas);
        }
      }, []); //no trigger = only runs once

      useEffect(() => {
        if (imgUpload && canvas) {
         addIcon(imgUpload, canvas);
        }
      }, [imgUpload]); //imgUpload trigger = only runs when imgUpload changes

    return (
        <canvas ref={canvasEl} width={250} height={250}></canvas>
      );

  }


  function addIcon(icon: File, canvas: fabric.Canvas) {
    const iconImage = new Image();

    
    iconImage.src = URL.createObjectURL(icon);
    console.log("icon:" + icon.name);
    iconImage.onload = () => {
      const fabricImage = new fabric.Image(iconImage, {
        left: 0,
        top: 0,
        selectable: false,
      });
      canvas.add(fabricImage);
      canvas.renderAll();
    };
  }

function setBackground(canvas: fabric.Canvas)
{
  const bgImage = new Image();
  bgImage.src = perkBackground;

  bgImage.onload = () => {
    console.log("Image loaded successfully");
    const fabricImage = new fabric.Image(bgImage, {
      left: 0,
      top: 0,
      selectable: false, // Set to true if you want to allow selecting the image
    });
    canvas.backgroundImage = fabricImage;
    canvas.renderAll();
  };




}
