import "./index.css";
import { APITester } from "./APITester";
import { FileHandler } from "./Uploader";
import { IconDisplay } from "./IconDisplay";
import { useState } from "react";
import { MainCanvas } from "./Canvas";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {

  
  const [fileData, setFileData] = useState<{ name: string; data: string }[]>([]); //must match the prop in Canvas
  const [canvasURLs, setCanvasURLs] = useState<{ name: string; data: string; id: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  console.log("fileData from App.tsx" + fileData);

  function resetStates() {
    setFileData([]);
    setCanvasURLs([]);
    setIsProcessing(false);
  }

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
      <button onClick={resetStates}>Reset</button>

      <div className="flex justify-center items-center">
      <FileHandler setFileData={setFileData} setIsProcessing={setIsProcessing} resetStates={resetStates}/> {/*FileHandler Fixed*/}
      <MainCanvas files={isProcessing ? [] : fileData} setCanvasURLs={setCanvasURLs} />  {/*MainCanvas Fixed*/}
      <IconDisplay files={canvasURLs} />  {/*IconDisplay Fixed*/}
      </div>
    </div>
  );
}

export default App;
