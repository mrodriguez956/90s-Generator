
import { FabricImage, Canvas } from 'fabric';

import { useEffect, useRef } from 'react';

export function FileHandler() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasEl = useRef<HTMLCanvasElement>(null);

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

      createCanvas();
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
        <canvas></canvas>

       
        </>

    );
}

function createCanvas()
{

  const canvas = new Canvas();

  const bgImage = new Image();
  bgImage.src = '../assets/img/perk-background.png';

  bgImage.onload = () => {
    const fabricImage = new FabricImage(bgImage, {
      left: 0,
      top: 0,
      selectable: false
    });



canvas.add(fabricImage);


}
}