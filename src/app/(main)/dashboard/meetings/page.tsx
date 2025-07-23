"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Users, Calendar } from 'lucide-react';
import { MeetingsList } from './_components/meetings-list';
import { ClassificationPanel } from './_components/classification-panel';
import { MeetingsSummaryHeader } from './_components/meetings-summary-header';
import { UploadCsvDialog } from '@/components/upload-csv-dialog';
import { NewMeetingDialog } from '@/components/new-meeting-dialog';
import { ClientMeetingData } from '@/types/kpi';
import { ClientClassificationData } from '@/types/client-classification';

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<ClientMeetingData | null>(null);
  const [classificationData, setClassificationData] = useState<ClientClassificationData | null>(null);

  const handleMeetingSelect = (meeting: ClientMeetingData, classification: ClientClassificationData) => {
    setSelectedMeeting(meeting);
    setClassificationData(classification);
  };

  return (
    <div className="flex flex-col h-full space-y-6 p-6">
      <MeetingsSummaryHeader />

      <div className="flex gap-4">
        <NewMeetingDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </NewMeetingDialog>
        
        <UploadCsvDialog>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
        </UploadCsvDialog>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        <Card className="w-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Meetings
            </CardTitle>
            <CardDescription>
              Select a meeting to view its AI classification
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="p-6 h-full">
              <MeetingsList 
                onMeetingSelect={handleMeetingSelect}
                selectedMeeting={selectedMeeting}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              AI Classification
            </CardTitle>
            <CardDescription>
              Automatic analysis of the selected meeting
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="p-6 h-full">
              <ClassificationPanel 
                meeting={selectedMeeting}
                classificationData={classificationData}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
