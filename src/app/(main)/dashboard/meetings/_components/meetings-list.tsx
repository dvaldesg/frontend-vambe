"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, User, MapPin, Clock, Loader2, Search, Filter } from 'lucide-react';
import { clientMeetingService } from '@/services/api-services';
import { ClientMeetingData } from '@/types/kpi';
import { ClientClassificationData } from '@/types/client-classification';
import { cn } from '@/lib/utils';

interface MeetingsListProps {
  onMeetingSelect: (meeting: ClientMeetingData, classification: ClientClassificationData) => void;
  selectedMeeting: ClientMeetingData | null;
}

export function MeetingsList({ onMeetingSelect, selectedMeeting }: MeetingsListProps) {
  const [meetings, setMeetings] = useState<ClientMeetingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingClassification, setLoadingClassification] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const meetingsData = await clientMeetingService.getAllMeetings();
        setMeetings(meetingsData);
      } catch (error) {
        console.error('Error loading meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []);

  const filteredAndSortedMeetings = useMemo(() => {
    let filtered = meetings;

    if (searchTerm) {
      filtered = meetings.filter(meeting =>
        meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [meetings, searchTerm, sortOrder]);

  const handleMeetingClick = async (meeting: ClientMeetingData) => {
    if (loadingClassification === meeting.id) return;
    
    setLoadingClassification(meeting.id);
    try {
      const classification = await clientMeetingService.getClientMeetingClassification(meeting.id);
      onMeetingSelect(meeting, classification);
    } catch (error) {
      console.error('Error loading classification:', error);
    } finally {
      setLoadingClassification(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="h-full flex flex-col space-y-4">
        {/* Search and filter controls */}
        <div className="space-y-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, salesman, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <User className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No meetings found</h3>
          <p className="text-sm text-muted-foreground">
            Create a new meeting or upload a CSV file to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="space-y-3 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, salesman, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-100 overflow-y-auto">
        <div className="space-y-1 pr-4">
          {filteredAndSortedMeetings.map((meeting) => (
          <Button
            key={meeting.id}
            variant="ghost"
            className={cn(
              "w-full p-3 h-auto flex items-center justify-between text-left",
              selectedMeeting?.id === meeting.id && "bg-accent"
            )}
            onClick={() => handleMeetingClick(meeting)}
            disabled={loadingClassification === meeting.id}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  {getInitials(meeting.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{meeting.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(meeting.date)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {loadingClassification === meeting.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Badge variant={meeting.closed ? "default" : "secondary"} className="text-xs">
                  {meeting.closed ? "Closed" : "Open"}
                </Badge>
              )}
            </div>
          </Button>
        ))}
        </div>
      </ScrollArea>
    </div>
  );
}
