"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CsvFormatRequirements() {
  return (
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
  );
}
