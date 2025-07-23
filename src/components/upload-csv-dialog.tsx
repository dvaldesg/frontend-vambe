"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clientMeetingService } from "@/services/api-services";
import { CsvUploadResponse } from "@/types/csv-upload";
import { FileUploadArea } from "./upload-csv/file-upload-area";
import { FileDisplay } from "./upload-csv/file-display";
import { UploadActions } from "./upload-csv/upload-actions";
import { CsvFormatRequirements } from "./upload-csv/csv-format-requirements";
import { UploadResultsDialog } from "./upload-csv/upload-results-dialog";

interface UploadCsvDialogProps {
  children: React.ReactNode;
}

export function UploadCsvDialog({ children }: UploadCsvDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<CsvUploadResponse | null>(null);
  const [showResults, setShowResults] = useState(false);

  const validateFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      return "Please select a CSV file only";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    const validation = validateFile(selectedFile);
    if (validation) {
      setError(validation);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setUploadResponse(null);
    setShowResults(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileSelect(selectedFiles[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const response = await clientMeetingService.uploadCsv(file);
      setUploadResponse(response);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV file');
    } finally {
      setUploading(false);
    }
  };

  const resetFile = () => {
    setFile(null);
    setError(null);
    setUploadResponse(null);
    setShowResults(false);
  };

  const handleClose = () => {
    if (!uploading) {
      setOpen(false);
      setFile(null);
      setError(null);
      setUploadResponse(null);
      setShowResults(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!uploading) {
      setOpen(isOpen);
      if (!isOpen) {
        setFile(null);
        setError(null);
        setUploadResponse(null);
        setShowResults(false);
      }
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setOpen(false);
    setFile(null);
    setError(null);
    setUploadResponse(null);
    window.location.reload();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload CSV File</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-muted-foreground">
                Upload a CSV file containing client meeting data
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>CSV File Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!file && (
                  <FileUploadArea
                    isDragOver={isDragOver}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onFileSelect={handleFileInputChange}
                  />
                )}

                {file && !showResults && (
                  <div className="space-y-4">
                    <FileDisplay
                      file={file}
                      onRemove={resetFile}
                      disabled={uploading}
                    />
                    <UploadActions
                      uploading={uploading}
                      onUpload={handleUpload}
                      onCancel={handleClose}
                    />
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {showResults && uploadResponse && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      {uploadResponse.message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <CsvFormatRequirements />
          </div>
        </DialogContent>
      </Dialog>
      
      <UploadResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        uploadResponse={uploadResponse}
        onClose={() => setShowResults(false)}
        onCloseAndRefresh={handleCloseResults}
      />
    </>
  );
}
