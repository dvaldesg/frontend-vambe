import { UploadCsvDialog } from "@/components/upload-csv-dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Meetings</h1>
          <p className="text-muted-foreground">
            Manage and view all client meetings
          </p>
        </div>
        <UploadCsvDialog>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </Button>
        </UploadCsvDialog>
      </div>
      
      <div className="text-center py-8">
        <p className="text-muted-foreground">Coming Soon</p>
      </div>
    </div>
  );
}
