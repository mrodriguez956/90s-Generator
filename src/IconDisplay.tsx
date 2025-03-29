interface IconDisplayProps {
  files?: { name: string, data: string }[];
}


export function IconDisplay({ files }: IconDisplayProps) {
  return (
    <div>
      <h2>Icon Display</h2>
      {files?.map((file) => (
        console.log("IconDisplay file:", file.name),
        <img key={file.name} src={file.data} alt={file.name} />
      ))}
    </div>
  );
}