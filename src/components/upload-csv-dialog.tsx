"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clientMeetingService } from "@/services/api-services";

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
  const [success, setSuccess] = useState(false);

  const validateFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      return "Please select a CSV file only";
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
    setSuccess(false);
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
      // Use the API service for upload
      await clientMeetingService.uploadCsv(file);

      setSuccess(true);
      
      // Close dialog and refresh after a short delay
      setTimeout(() => {
        setOpen(false);
        router.refresh(); // Refresh the current page instead of navigating
        // Reset state when closing
        setFile(null);
        setError(null);
        setSuccess(false);
        setUploading(false);
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV file');
    } finally {
      setUploading(false);
    }
  };

  const resetFile = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    if (!uploading) {
      setOpen(false);
      setFile(null);
      setError(null);
      setSuccess(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!uploading) {
      setOpen(isOpen);
      if (!isOpen) {
        // Reset state when closing
        setFile(null);
        setError(null);
        setSuccess(false);
      }
    }
  };

  return (
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
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => {
                    // Trigger file input when clicking on the drop area
                    const input = document.getElementById('csv-file-input') as HTMLInputElement;
                    input?.click();
                  }}
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
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              )}

              {file && !success && (
                <div className="space-y-4">
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
                      onClick={resetFile}
                      disabled={uploading}
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleUpload}
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
                      onClick={handleClose}
                      disabled={uploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    CSV file uploaded successfully! The page will refresh shortly...
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSV Format Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>Your CSV file should include the following columns:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Client Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Salesman Name</li>
                  <li>Meeting Date</li>
                  <li>Is Closed (true/false)</li>
                  <li>Transcription</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Make sure your CSV file has headers in the first row and follows the expected format.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
