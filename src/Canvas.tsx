import { Canvas, FabricImage, Path, Shadow } from 'fabric'; // browser

import { useEffect, useRef, useState } from 'react';
import perkBackground from './assets/img/perkbg.png'; //why did I need to create images.d.ts for this?
import iconGradient from './assets/img/gradient.png'; //why did I need to create images.d.ts for this?
import ImageStroke from 'image-stroke';

import rotate from 'image-stroke/lib/method-rotate'


interface CanvasProps {
  imgUpload?: string;
}






export function MainCanvas({ imgUpload }: CanvasProps) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null); //needed so that the canvas persists after re-renders. Initially, image uploads were causing re-renders then there would be no canvas to add to

  useEffect(() => {
    if (canvasEl.current) { //wait until canvas element exists to run
      const newCanvas = new Canvas(canvasEl.current);
      setBackground(newCanvas);
      setCanvas(newCanvas); //store newCanvas into setCanvas for persistence
    }
  }, []); //no trigger = only runs once

  useEffect(() => {
    if (imgUpload && canvas) {
      addIcon(imgUpload, canvas); //refer to stored canvas
      
    }
  }, [imgUpload]); //imgUpload trigger = only runs when imgUpload changes

  return (
    <canvas ref={canvasEl} width={250} height={250}></canvas>
  );

}


function addIcon(icon: string, canvas: Canvas) {
  const iconImage = new Image();
  const gradImage = new Image();

  iconImage.src = icon;
  console.log("Uploaded File (iconImage):", icon);
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

      canvas.add(fabricImage); //adding icon to canvas with modifications (without stroke)
      canvas.renderAll();

      const dataURL = fabricImage.toDataURL(); //convert icon to dataURL as ImageStroke library expects an HTML image element, not a Fabric canvas
      console.log("Data URL:", dataURL); //sanity check

      canvas.remove(fabricImage); //remove icon from canvas

      const htmlImage = new Image();
      htmlImage.src = dataURL; //convert dataURL to HTML image element

      htmlImage.onload = () => { //wait for html image to be loaded, apply stroke
        const imageStroke = new ImageStroke();
        imageStroke.use(rotate);

        const resultCanvas = imageStroke.make(htmlImage, {
          thickness: 2,
          color: 'black'
        });

        const fabricImage = new FabricImage(resultCanvas, {
          left: 0,
          top: 0,
          width: 250,
          height: 250,
          selectable: false,
        });

        canvas.add(fabricImage);
        canvas.renderAll(); //BINGO!!!!!!!!!!!!!!!!
      };

    };
  };

}




function setBackground(canvas: Canvas) {
  const bgImage = new Image();
  bgImage.src = perkBackground;

  bgImage.onload = () => {
    console.log("Image loaded successfully");
    const fabricImage = new FabricImage(bgImage, {
      left: 0,
      top: 0,
      selectable: false, // Set to true if you want to allow selecting the image
    });
    canvas.backgroundImage = fabricImage;
    canvas.renderAll();
  };




}
