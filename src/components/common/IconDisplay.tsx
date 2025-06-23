import { DownloadZip } from '../common/DownloadZip';

interface IconDisplayProps {
  files: { name: string; data: string; id: number }[];
}

export function IconDisplay({ files }: IconDisplayProps) {
  return (
  <>

{files?.length > 0 && (
        <>
          <h2 className="guide">Step 3: Download and Enjoy!</h2>
          <DownloadZip files={files} />

        </>
      )}

  <h2 className="title">Generated Icons</h2>
  <div className="container pt-0">
    
      {files?.length === 0 && <p className='italic text-gray-600'>No Files to Display</p>}
      {files?.length > 0 && (
        <>
      
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <img 
                key={file.name} 
                src={file.data} 
                alt={`Custom Icon Generated: ${file.name}`} 
                className="w-[256px] h-auto"
              />
            ))}
          </div>

        </>
      )}
  </div>
  </>
  );
}