
import { useEffect, useState } from "react";

interface IconDisplayProps {
  files?: { name: string, data: string }[];
}


export function IconDisplay({ files }: IconDisplayProps) {


  
    return (
      <div>
        <h2>Icon Display</h2>
        {files?.length === 0 && <p>No files to display</p>}
        <div className="grid grid-cols-4">
        {files?.map((file) => (
          <img 
            key={file.name} 
            src={file.data} 
            alt={file.name} 
          />
        ))}
        </div>
      </div>
    );
  }