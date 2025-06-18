import "../../styles/index.css";
import "../../styles/globals.css";
import { FileHandler } from "../common/Uploader";
import { IconDisplay } from "../common/IconDisplay";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import bgImage from "../../assets/img/90s Icon Pack.png";
import { BaseCanvas } from "../canvas/BaseCanvas";
import { canvasAssets } from "../canvas/canvasAssets";
import { PerkCanvas } from "../canvas/PerkCanvas";

export function App() {
  const [files, setFiles] = useState<{ name: string; data: string }[]>([]);
  const [canvasURLs, setCanvasURLs] = useState<
    { name: string; data: string; id: number }[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("perk");

  const handleTabChange = (tab?: string) => {
    if (tab) setActiveTab(tab);
    setFiles([]);
    setCanvasURLs([]);
    setIsProcessing(false);
  };

  const handleFileUpload: React.Dispatch<
    React.SetStateAction<{ name: string; data: string }[]>
  > = (newFiles) => {
    setFiles(newFiles);
  };

  return (
    <div className="max-w-7xl mx-auto text-center relative z-10">
 {/*     <h1 className="text-5xl font-bold my-4 leading-tight">PERK CREATOR</h1>
      <h2 className="italic text-gray-600">
        Work in Progress, Pardon the jank
      </h2>

      */}

      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={bgImage}
          alt="3D image"
          className="p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] w-[512px]"
        />
      </div>

      <div className="mb-8">
        <button 
          className="text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const instructions = document.getElementById('instructions');
            if (instructions) {
              instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
            }
          }}
        >
          Getting Started
        </button>
      </div>

      <div id="instructions" style={{ display: 'none' }} className="max-w-2xl mx-auto mb-8 p-6 bg-gray-800 rounded-lg text-left">
        <h3 className="text-xl font-bold mb-4 text-pink-400">How to Use This Tool</h3>
        <ol className="space-y-2 text-gray-200">
          <li>Before you start: There is a full pack available in the{" "}
          <a 
            href="https://nightlight.gg/packs/90s-perk-pack" 
            className="text-pink-400 hover:text-pink-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            90s Pack Download
          </a> on NightLight. Use this tool for missing icons.</li>
          <li>1. Select the type of icon you want to create (Perk, Item, Addon, or Offering)</li>
          <li>2. Upload your PNG image(s) using the upload button</li>
          <li>3. Wait for the processing to complete</li>
          <li>4. Download your customized icons!</li>
        </ol>
        <p className="mt-4 text-gray-400 italic">
          Note: You can get blank icons from{" "}
          <a 
            href="https://nightlight.gg/packs/default-icons-no-shadow" 
            className="text-pink-400 hover:text-pink-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            NightLight
          </a>
        </p>
      </div>

      <div className="menu flex justify-center">
        <div className="w-[600px] items-center radio">
          <label>
            <input
              type="radio"
              name="tab"
              value="perk"
              onChange={() => handleTabChange("perk")}
              defaultChecked
            />
            <span className="option">
              Perks
              <span className="click"></span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="tab"
              value="item"
              onChange={() => handleTabChange("item")}
            />
            <span className="option">
              Items
              <span className="click"></span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="tab"
              value="addon"
              onChange={() => handleTabChange("addon")}
            />
            <span className="option">
              Addons
              <span className="click"></span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="tab"
              value="offering"
              onChange={() => handleTabChange("offering")}
            />
            <span className="option">
              Offerings
              <span className="click"></span>
            </span>
          </label>

          {activeTab === "perk" && (
            <PerkCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
            />
          )}

          {activeTab === "item" && (
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdItems.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.item.backgrounds[rarity],
                grad: canvasAssets.item.gradients[rarity],
              })}
            />
          )}

          {activeTab === "addon" && (
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdItemAddons.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.addon.backgrounds[rarity],
                grad: canvasAssets.addon.gradients[rarity],
              })}
            />
          )}

          {activeTab === "offering" && (
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdOfferings.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.offering.backgrounds[rarity],
                grad: canvasAssets.offering.gradients[rarity],
              })}
            />
          )}

          {/* <TabsContent value="perk">

            <PerkCanvas files={isProcessing ? [] : files} setCanvasURLs={setCanvasURLs} />
          </TabsContent>

          <TabsContent value="item">
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdItems.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.item.backgrounds[rarity],
                grad: canvasAssets.item.gradients[rarity]
              })}
            />
          </TabsContent>

          <TabsContent value="addon">
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdItemAddons.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.addon.backgrounds[rarity],
                grad: canvasAssets.addon.gradients[rarity]
              })}
            />
          </TabsContent>

          <TabsContent value="offering">
            <BaseCanvas
              files={isProcessing ? [] : files}
              setCanvasURLs={setCanvasURLs}
              jsonEndpoint="https://michaelexile.github.io/DBD-IconsJSON/dbdOfferings.json"
              getBackgroundImage={(rarity) => ({
                bg: canvasAssets.offering.backgrounds[rarity],
                grad: canvasAssets.offering.gradients[rarity]
              })}
            />
          </TabsContent>
*/}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <FileHandler
          setFileData={handleFileUpload}
          setIsProcessing={setIsProcessing}
          resetStates={handleTabChange}
        />
      </div>

      <div className="w-full">
        <IconDisplay files={canvasURLs} />
      </div>

      <footer className="mt-16 mb-8 text-center">
        <p className="text-gray-400 mb-4">Need help or found an issue?</p>
        <div className="flex justify-center gap-6">
          <a 
            href="https://github.com/michaelexile/90s-Pack-Generator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://twitter.com/michaelexile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Twitter
          </a>
          <a 
            href="https://discord.gg/your-discord" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Discord
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
