import { useEffect, useRef, useState } from "react";

interface FileHandlerProps {
  setFileData: React.Dispatch<React.SetStateAction<{ name: string; data: string }[]>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  resetStates: () => void;
}
export function FileHandler({ setFileData, setIsProcessing, resetStates }: FileHandlerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
   //must match the prop in Canvas

  /*const [fileData, setFileData] = useState<{ name: string; data: string }[]>(
    []
  ); //must match the prop in Canvas*/
  /*const [isProcessing, setIsProcessing] = useState(false);*/

  function uploadFiles(event: any) {
    resetStates();
    console.log("entering uploadFiles");
    const fileList = event.target.files;

    if (!fileList || fileList.length === 0) {
      console.error("No files selected.");
      return;
    }

    setIsProcessing(true); //preventing duplicate uploads due to trigger based on file updates on Canvas component
    console.log("Files processing:", fileList.length);
    for (let i = 0; i < fileList.length; i++) {
      console.log("Processing file:", fileList[i].name);
      if (!fileList[i].type.startsWith("image/png")) {
        console.error("Only PNG files are allowed.");
        continue; //skips to next image to see if it passes the criteria
      } else {
        //we need a dataURL for the image for compatibility with ImageTracer
        console.log("creating fileName");
        const fileName = fileList[i].name.substring(
          0,
          fileList[i].name.lastIndexOf(".")
        );
        const icon = fileList[i];
        const reader = new FileReader();
       
        reader.onload = (e) => {
          console.log("entering reader.onload");
          const dataUrl = e.target?.result as string;
          setFileData((prevFiles) => {
            const updatedFiles = [...prevFiles, { name: fileName, data: dataUrl }];
            if (updatedFiles.length === fileList.length) {
              setIsProcessing(false);
              console.log("processing complete");
            }
            return updatedFiles;
          });
          
        };

        reader.readAsDataURL(icon);
      }
      console.log("File processed + added to fileData.");
    }
    
  }

  return (
    <>
      <div className="py-[80px]">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          
          Upload Files
        </button>

        
        <p className="italic text-gray-600 pt-[15px]">Requires original .png files</p>
          <p className="italic text-gray-600">
            Need blank icons?  
            <a 
              href="https://nightlight.gg/packs/default-icons-no-shadow" 
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
                  Download from NightLight
            </a> 
          </p>
        
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

    </>

  );
}
