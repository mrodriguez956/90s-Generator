import JSZip from "jszip";
import { useRef } from "react";

interface DownloadZipProps{
    files: { name: string; data: string; id: number }[];
}

export function DownloadZip({ files }: DownloadZipProps) {
    console.log("Preparing Files for ZIP:", files);
    const downloadRef = useRef<HTMLAnchorElement>(null);
    const zip = new JSZip();
    
    async function handleZip() {
        if (!files || files.length === 0) {
            alert('No files to download');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const response = await fetch(files[i].data);
            const blob = await response.blob();
            zip.file(`${files[i].name}.png`, blob);

            if (i === files.length - 1) {
                const content = await zip.generateAsync({type: 'blob'});
                const url = URL.createObjectURL(content);

                if (downloadRef.current) {
                    downloadRef.current.href = url;
                    downloadRef.current.download = "icons.zip";
                    downloadRef.current.click();
                    setTimeout(() => URL.revokeObjectURL(url), 100);
                }
            }
        }
    }

    return (
        <>
        <div className="py-5">
            <button onClick={handleZip} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click to Download</button>
            <a ref={downloadRef} style={{ display: 'none' }}></a>
            </div>
        </>
    );
}
