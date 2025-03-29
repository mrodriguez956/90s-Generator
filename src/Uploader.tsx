import { useEffect, useRef, useState } from 'react';
import { MainCanvas } from './Canvas';


export function FileHandler() {

    const fileInputRef = useRef<HTMLInputElement>(null);
  /* const [uploadedFile, setUploadedFile] = useState<string>(); //must match the prop in Canvas
   const [uploadedName, setUploadedName] = useState<string>(); */
   const [fileData, setFileData] = useState<{name: string, data: string}[]>([]); //must match the prop in Canvas

   function uploadFiles(event: any){
    const fileList = event.target.files;

    if (!fileList || fileList.length === 0) {
      console.error("No files selected.");
      return;
  }
  
  for (let i = 0; i < fileList.length; i++) {
    if (!fileList[i].type.startsWith('image/png')) {
        console.error("Only PNG files are allowed.");
        continue; //skips to next image to see if it passes the criteria
    }

    else{ //we need a dataURL for the image for compatibility with ImageTracer
      const fileName = fileList[i].name.substring(0, fileList[i].name.lastIndexOf("."));
      const icon = fileList[i];
      const reader = new FileReader(); 
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;// Log the data URL
        setFileData([...fileData, {name: fileName, data: dataUrl}]); //pulls previous fileData and adds new entry
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
            />


 
      </div>
        
        <MainCanvas /*imgUpload={uploadedFile} imgName={uploadedName}*/ files={fileData}/>

       
        </>

    );
}

