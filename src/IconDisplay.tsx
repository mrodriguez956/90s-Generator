import { DownloadZip } from './DownloadZip';

interface IconDisplayProps {
  files: { name: string; data: string; id: number }[];
}

export function IconDisplay({ files }: IconDisplayProps) {
  return (
    <div>
      <h2>⬇️ Generated Icons ⬇️</h2>
      {files?.length === 0 && <p>No files to display</p>}
      {files?.length > 0 && (
        <>
          <DownloadZip files={files} />
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <img 
                key={file.name} 
                src={file.data} 
                alt={file.name} 
                className="w-full h-auto"
              />
            ))}
          </div>

        </>
      )}
    </div>
  );
}