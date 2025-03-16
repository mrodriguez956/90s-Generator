import * as fabric from 'fabric';

import { useEffect, useRef } from 'react';

export function FileHandler() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasEl = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (canvasEl.current) {
        createCanvas(canvasEl.current);
      }
    }, []);

    function uploadFiles(event: any){
        const fileList = event.target.files;
        console.log(fileList);

        if (!fileList || fileList.length === 0) {
          console.error("No files selected.");
          return;
      }

      for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].type.startsWith('image/png')) {
            console.error("Only PNG files are allowed.");
            event.target.value = ''; // Clear the input
            return;
        }

      }

      
    }

    return (
        <>
        
        <div className="border-[10px] border-dashed h-[250px] w-[250px] justify-content content-center">
        <p>
          Drag and Drop
        </p>
        <p>or</p>
        <button onClick={() => fileInputRef.current?.click()} className='bg-blue-500 px-[5px] mt-[10px]'>
            Upload Files
        </button>


        <input
              type="file"
              id="files"
              name="files"
              multiple
              accept="image/png"
              ref={fileInputRef}
              className="hidden"
              onChange={uploadFiles}
              onClick={(event: any) => {
                // Reset the input value to allow selecting the same file again
                event.target.value = null;
              }}
            />


 
      </div>
        <canvas ref={canvasEl} width={250} height={250}> </canvas>

       
        </>

    );
}

function createCanvas(cElement:HTMLCanvasElement)
{
  const canvas = new fabric.Canvas(cElement);

  const bgImage = new Image();
  bgImage.src = 'https://raw.githubusercontent.com/mrodriguez956/90s-Generator/refs/heads/main/public/assets/img/perk-background.png?token=GHSAT0AAAAAAC56AJ5SX7AOBS23TIC3LFCAZ6WTNYQ'; // Specify the correct path to your image

  bgImage.onload = () => {
    console.log("Image loaded successfully");
    const fabricImage = new fabric.Image(bgImage, {
      left: 0,
      top: 0,
      selectable: false, // Set to true if you want to allow selecting the image
    });

    canvas.add(fabricImage);
    canvas.renderAll();
  };

}


