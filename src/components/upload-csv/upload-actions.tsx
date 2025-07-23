"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadActionsProps {
  uploading: boolean;
  onUpload: () => void;
  onCancel: () => void;
}

export function UploadActions({ uploading, onUpload, onCancel }: UploadActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        onClick={onUpload}
        disabled={uploading}
        className="flex-1"
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={uploading}
      >
        Cancel
      </Button>
    </div>
  );
}
