"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDisplayProps {
  file: File;
  onRemove: () => void;
  disabled: boolean;
}

export function FileDisplay({ file, onRemove, disabled }: FileDisplayProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
      <FileText className="h-8 w-8 text-primary" />
      <div className="flex-1">
        <p className="font-medium">{file.name}</p>
        <p className="text-sm text-muted-foreground">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        disabled={disabled}
      >
        Remove
      </Button>
    </div>
  );
}
