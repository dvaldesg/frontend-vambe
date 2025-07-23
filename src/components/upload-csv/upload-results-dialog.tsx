"use client";

import { CheckCircle, AlertTriangle, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CsvUploadResponse } from "@/types/csv-upload";

interface UploadResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadResponse: CsvUploadResponse | null;
  onClose: () => void;
  onCloseAndRefresh: () => void;
}

export function UploadResultsDialog({
  open,
  onOpenChange,
  uploadResponse,
  onClose,
  onCloseAndRefresh
}: UploadResultsDialogProps) {
  if (!uploadResponse) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>CSV Upload Results</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {uploadResponse.message}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{uploadResponse.totalRows}</div>
                <div className="text-sm text-muted-foreground">Total Rows</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{uploadResponse.validRows}</div>
                <div className="text-sm text-muted-foreground">Valid Rows</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{uploadResponse.errors.length}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </CardContent>
            </Card>
          </div>

          {uploadResponse.errors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Errors Found ({uploadResponse.errors.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg max-h-40 overflow-y-auto">
                  {uploadResponse.errors.map((error, index) => (
                    <div key={index} className="text-sm text-orange-700 dark:text-orange-300 mb-1">
                      • {error}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {uploadResponse.createdSalesmen.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Created Salesmen ({uploadResponse.createdSalesmen.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {uploadResponse.createdSalesmen.map((salesman) => (
                    <Badge key={salesman.id} variant="secondary" className="text-sm">
                      {salesman.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {uploadResponse.createdMeetings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>Created Meetings ({uploadResponse.createdMeetings.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {uploadResponse.createdMeetings.map((meeting) => (
                    <div key={meeting.id} className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <div className="font-medium">{meeting.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.email} • {meeting.salesmanName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(meeting.date).toLocaleDateString()} • {meeting.closed ? 'Closed' : 'Open'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {uploadResponse.alreadyCreatedMeetings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Skipped - Already Exist ({uploadResponse.alreadyCreatedMeetings.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {uploadResponse.alreadyCreatedMeetings.map((meeting, index) => (
                    <div key={index} className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                      <div className="font-medium">{meeting.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.email} • {meeting.salesmanName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(meeting.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onCloseAndRefresh}>
              Close & Refresh Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
