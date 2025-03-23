import { useEffect, useRef, useState } from 'react';
import { MainCanvas } from './Canvas';


export function FileHandler() {

    const fileInputRef = useRef<HTMLInputElement>(null);
   const [uploadedFile, setUploadedFile] = useState<string | undefined>(undefined); //must match the prop in Canvas
   
   function uploadFiles(event: any){
    const fileList = event.target.files;
    const icon = fileList[0];
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
  
    else{ //we need a dataURL for the image for compatibility with ImageTracer
      const reader = new FileReader(); 
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        console.log("Data URL generated:", dataUrl); // Log the data URL
        setUploadedFile(dataUrl);
      }
      reader.readAsDataURL(icon);

      
    }
  
  }
  
  
  }
/*
    useEffect(() => {
      if (canvasEl.current) {
        createCanvas(canvasEl.current);
      }
    }, []);
*/
 

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
        
        <MainCanvas imgUpload={uploadedFile}/>

       
        </>

    );
}

/*
function createCanvas(cElement:HTMLCanvasElement)
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

*/
