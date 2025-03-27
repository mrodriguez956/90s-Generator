interface IconDisplayProps {
  files?: { name: string, data: string }[];
}


export function IconDisplay({ files }: IconDisplayProps) {
  console.log("IconDisplay files:", files);
  return (
    <div>
      <h2>Icon Display</h2>
      {files?.map((file) => (
        <img key={file.name} src={file.data} alt={file.name} />
      ))}
    </div>
  );
}