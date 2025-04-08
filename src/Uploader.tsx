import { useEffect, useRef, useState } from "react";
import { MainCanvas } from "./Canvas";

export function FileHandler() {
  const fileInputRef = useRef<HTMLInputElement>(null);
   //must match the prop in Canvas

  const [fileData, setFileData] = useState<{ name: string; data: string }[]>(
    []
  ); //must match the prop in Canvas
  const [isProcessing, setIsProcessing] = useState(false);


  function uploadFiles(event: any) {
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
      <div className="border-[10px] border-dashed h-[250px] w-[250px] justify-content content-center">
        <p>Drag and Drop</p>
        <p>or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 px-[5px] mt-[10px]"
        >
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
      <MainCanvas files={isProcessing ? [] : fileData}
      />
    </>

  );
}
