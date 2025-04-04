import "./index.css";
import { APITester } from "./APITester";
import { FileHandler } from "./Uploader";
import { IconDisplay } from "./IconDisplay";
import { useState } from "react";


import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const [files, setFiles] = useState<{ name: string; data: string }[]>([]);
  const [canvasURLs, setCanvasURLs] = useState<{name: string, data: string, id: number}[]>([]);
  const [downloadURL, setDownloadURL] = useState('');
  
  const handleReset = () => {
    setFiles([]);
    setCanvasURLs([]);
    setDownloadURL('');
  };

  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-5xl font-bold my-4 leading-tight">PERK CREATOR</h1>
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
        />
      </div>


      <div className="flex justify-center items-center">
        <FileHandler />
      </div>
    </div>
  );
}

export default App;
