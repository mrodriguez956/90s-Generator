import * as fabric from 'fabric';

import { useEffect, useRef, useState } from 'react';
import perkBackground from './assets/img/perkbg.png'; //why did I need to create images.d.ts for this?
import iconGradient from './assets/img/gradient.png'; //why did I need to create images.d.ts for this?
import * as ImageTracer from "imagetracerjs";


interface CanvasProps {
  imgUpload?: string;
}






export function Canvas({ imgUpload }: CanvasProps) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null); //needed so that the canvas persists after re-renders. Initially, image uploads were causing re-renders then there would be no canvas to add to

  useEffect(() => {
    if (canvasEl.current) { //wait until canvas element exists to run
      const newCanvas = new fabric.Canvas(canvasEl.current);
      setBackground(newCanvas);
      setCanvas(newCanvas); //store newCanvas into setCanvas for persistence
    }
  }, []); //no trigger = only runs once

  useEffect(() => {
    if (imgUpload && canvas) {
      addIcon(imgUpload, canvas); //refer to stored canvas
      console.log("Uploaded File (Data URL):", imgUpload);
    }
  }, [imgUpload]); //imgUpload trigger = only runs when imgUpload changes

  return (
    <canvas ref={canvasEl} width={250} height={250}></canvas>
  );

}


function addIcon(icon: string, canvas: fabric.Canvas) {
  const iconImage = new Image();
  const gradImage = new Image();

  iconImage.src = icon;
  console.log("Uploaded File (iconImage):", icon);
  gradImage.src = iconGradient;

  iconImage.onload = () => {
  ImageTracer.imageToSVG(iconImage.src, (svg: string) => {
     const svgImage = new fabric.Path(svg, {
         left: 0,
         top: 0,
         width: 250,
         height: 250,
         selectable: false,
     });
     canvas.add(svgImage);
     canvas.renderAll();
   });
  };
/*
  iconImage.onload = () => {
    gradImage.onload = () => {
      const fabricImage = new fabric.Image(gradImage, {
        clipPath: new fabric.Image(iconImage, {

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



      canvas.add(fabricImage);
      canvas.renderAll();

    };
  };
  */
}




function setBackground(canvas: fabric.Canvas) {
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
