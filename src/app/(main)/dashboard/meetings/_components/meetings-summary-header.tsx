"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, TrendingUp, Clock } from 'lucide-react';
import { clientMeetingService } from '@/services/api-services';
import { ClientMeetingData } from '@/types/kpi';

interface MeetingSummary {
  totalMeetings: number;
  thisMonth: number;
  openMeetings: number;
  closedMeetings: number;
}

export function MeetingsSummaryHeader() {
  const [summary, setSummary] = useState<MeetingSummary>({
    totalMeetings: 0,
    thisMonth: 0,
    openMeetings: 0,
    closedMeetings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeetingsSummary = async () => {
      try {
        const meetings: ClientMeetingData[] = await clientMeetingService.getAllMeetings();
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const thisMonthMeetings = meetings.filter(meeting => {
          const meetingDate = new Date(meeting.date);
          return meetingDate.getMonth() === currentMonth && 
                 meetingDate.getFullYear() === currentYear;
        });

        const openMeetings = meetings.filter(meeting => !meeting.closed);
        const closedMeetings = meetings.filter(meeting => meeting.closed);

        setSummary({
          totalMeetings: meetings.length,
          thisMonth: thisMonthMeetings.length,
          openMeetings: openMeetings.length,
          closedMeetings: closedMeetings.length
        });
      } catch (error) {
        console.error('Error loading meetings summary:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeetingsSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{summary.totalMeetings}</p>
              <p className="text-sm text-muted-foreground">Total Meetings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <CalendarDays className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{summary.thisMonth}</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{summary.openMeetings}</p>
                <Badge variant="secondary">Open</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Not Closed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{summary.closedMeetings}</p>
                <Badge variant="default">Closed</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
