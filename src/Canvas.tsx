import * as fabric from 'fabric';

import { useEffect, useRef } from 'react';
import perkBackground from './assets/perkbg.png'; //why did I need to create images.d.ts for this?
interface CanvasProps {
    imgUpload?: File;
  }
  





  export function Canvas({imgUpload}:CanvasProps)
  
  {
    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasEl.current) {
         setBackground(canvasEl.current);
        }
      }, []);

    return (
        <canvas ref={canvasEl} width={250} height={250}></canvas>
      );

  }


function setBackground(cElement:HTMLCanvasElement)
{
  const canvas = new fabric.Canvas(cElement);

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
