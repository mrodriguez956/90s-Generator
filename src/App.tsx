import "./index.css";
import { APITester } from "./APITester";
import { FileHandler } from "./Uploader";
import { IconDisplay } from "./IconDisplay";
import { useState } from "react";


import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = () => {
    
    setResetTrigger(prev => prev + 1);
    console.log("Reset triggered with value:", resetTrigger);
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
      <FileHandler resetTrigger={resetTrigger} />
      <IconDisplay resetTrigger={resetTrigger} />
      <button onClick={handleReset}> 🔃</button>
      </div>
    </div>
  );
}

export default App;
