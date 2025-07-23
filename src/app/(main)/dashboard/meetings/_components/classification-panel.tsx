"use client";

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  User, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from 'lucide-react';
import { ClientMeetingData } from '@/types/kpi';
import { ClientClassificationData } from '@/types/client-classification';

interface ClassificationPanelProps {
  meeting: ClientMeetingData | null;
  classificationData: ClientClassificationData | null;
}

export function ClassificationPanel({ meeting, classificationData }: ClassificationPanelProps) {
  if (!meeting || !classificationData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Brain className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Select a meeting</h3>
        <p className="text-sm text-muted-foreground">
          Choose a meeting from the list to view its AI analysis
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{meeting.name}</h3>
            <Badge variant={meeting.closed ? "default" : "secondary"}>
              {meeting.closed ? "Closed" : "Open"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{meeting.salesmanName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(meeting.date)}</span>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{meeting.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{meeting.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis
            </CardTitle>
            <CardDescription>
              Automatic classification based on meeting transcription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Commercial Sector</h4>
              <Badge variant="outline">{classificationData.commercialSector}</Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Lead Source</h4>
              <Badge variant="outline">{classificationData.leadSource}</Badge>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Interaction Estimates</h4>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Daily Interactions</span>
                  <Badge variant="secondary">{classificationData.estimatedDailyInteractions}</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Weekly Interactions</span>
                  <Badge variant="secondary">{classificationData.estimatedWeeklyInteractions}</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Monthly Interactions</span>
                  <Badge variant="secondary">{classificationData.estimatedMonthlyInteractions}</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Interest Reason</h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {classificationData.interestReason}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Recommended Vambe Model</h4>
              <Badge variant="outline" className="text-sm">{classificationData.vambeModel}</Badge>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Client Status</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  {classificationData.isPotentialClient ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Potential Client</span>
                </div>

                <div className="flex items-center space-x-2">
                  {classificationData.shouldBeContacted ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Should Contact</span>
                </div>

                <div className="flex items-center space-x-2">
                  {classificationData.hasTechTeam ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Tech Team</span>
                </div>

                <div className="flex items-center space-x-2">
                  {classificationData.isProblemClient ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-sm">No Issues</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Demand Characteristics</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  {classificationData.hasDemandPeaks ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm">Demand Peaks</span>
                </div>

                <div className="flex items-center space-x-2">
                  {classificationData.hasSeasonalDemand ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm">Seasonal Demand</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-lg font-bold">{Math.round(classificationData.confidenceScore * 100)}/100</span>
              </div>
              <Progress value={classificationData.confidenceScore * 100} className="h-2" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Model: {classificationData.modelVersion}
                </p>
                <Badge variant="outline" className="text-xs">
                  ID: {classificationData.id}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {meeting.transcription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Transcription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {meeting.transcription}
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
