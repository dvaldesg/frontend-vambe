"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadCsvDialog } from "@/components/upload-csv-dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadCsvPage() {
  const router = useRouter();

  // If someone accesses this page directly, show the dialog content
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Upload CSV File</h1>
        <p className="text-muted-foreground">
          Upload a CSV file containing client meeting data
        </p>
      </div>

      <UploadCsvDialog>
        <Button className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Open CSV Upload Dialog
        </Button>
      </UploadCsvDialog>

      <div className="text-center text-muted-foreground">
        <p>Click the button above to open the upload dialog, or navigate to Clients → Meetings to access this feature from the sidebar.</p>
      </div>
    </div>
  );
}
