"use client";

import { Upload } from "lucide-react";

interface FileUploadAreaProps {
  isDragOver: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadArea({
  isDragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileSelect
}: FileUploadAreaProps) {
  const handleClick = () => {
    const input = document.getElementById('csv-file-input') as HTMLInputElement;
    input?.click();
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={handleClick}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
        ${isDragOver 
          ? 'border-primary bg-primary/5' 
          : 'border-muted-foreground/25 hover:border-primary/50'
        }
      `}
    >
      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <div className="space-y-2">
        <p className="text-lg font-medium">
          Drop your CSV file here, or{" "}
          <span className="text-primary hover:underline cursor-pointer">
            browse
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Only CSV files are supported (max 10MB)
        </p>
      </div>
      <input
        id="csv-file-input"
        type="file"
        accept=".csv"
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
}
