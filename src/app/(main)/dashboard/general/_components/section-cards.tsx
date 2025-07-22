"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCardsData } from "@/types/kpi";
import { 
  getTrendingInfo, 
  getPersonalizedDescription
} from "@/lib/section-cards-logic";

interface SectionCardsProps {
  sectionCards: SectionCardsData | null;
  isLoading: boolean;
  error: string | null;
}

export function SectionCards({ sectionCards, isLoading, error }: SectionCardsProps) {
  if (isLoading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="@container/card animate-pulse">
            <CardHeader>
              <CardDescription>Loading...</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">-</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading KPI data: {error}
      </div>
    );
  }

  const data = sectionCards || {
    totalClientMeetings: 0,
    totalClientMeetingsTrending: "stable" as const,
    totalClientMeetingsTrendingValue: 0,
    totalClosings: 0,
    totalClosingsTrending: "stable" as const,
    totalClosingsTrendingValue: 0,
    closingRate: 0,
    closingRateTrending: "stable" as const,
    closingRateTrendingValue: 0,
    averageClosingsPerMonth: 0,
    averageClosingsPerMonthTrending: "stable" as const,
    averageClosingsPerMonthTrendingValue: 0
  };

  const meetingsTrending = getTrendingInfo(data.totalClientMeetingsTrending, data.totalClientMeetingsTrendingValue);
  const closingsTrending = getTrendingInfo(data.totalClosingsTrending, data.totalClosingsTrendingValue);
  const rateTrending = getTrendingInfo(data.closingRateTrending, data.closingRateTrendingValue);
  const averageTrending = getTrendingInfo(data.averageClosingsPerMonthTrending, data.averageClosingsPerMonthTrendingValue);

  const meetingsDescription = getPersonalizedDescription("meetings", data.totalClientMeetings, data.totalClientMeetingsTrending);
  const closingsDescription = getPersonalizedDescription("closings", data.totalClosings, data.totalClosingsTrending);
  const rateDescription = getPersonalizedDescription("rate", data.closingRate, data.closingRateTrending);
  const averageDescription = getPersonalizedDescription("average", data.averageClosingsPerMonth, data.averageClosingsPerMonthTrending);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total meetings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalClientMeetings.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant={meetingsTrending.variant} className={meetingsTrending.className}>
              <meetingsTrending.icon className="h-3 w-3" />
              {data.totalClientMeetingsTrendingValue !== 0 && `${data.totalClientMeetingsTrendingValue > 0 ? '+' : ''}${data.totalClientMeetingsTrendingValue}%`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {meetingsTrending.text} <meetingsTrending.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">{meetingsDescription}</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total closings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.totalClosings.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant={closingsTrending.variant} className={closingsTrending.className}>
              <closingsTrending.icon className="h-3 w-3" />
              {data.totalClosingsTrendingValue !== 0 && `${data.totalClosingsTrendingValue > 0 ? '+' : ''}${data.totalClosingsTrendingValue}%`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {closingsTrending.text} <closingsTrending.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">{closingsDescription}</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Closing rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.closingRate}%
          </CardTitle>
          <CardAction>
            <Badge variant={rateTrending.variant} className={rateTrending.className}>
              <rateTrending.icon className="h-3 w-3" />
              {data.closingRateTrendingValue !== 0 && `${data.closingRateTrendingValue > 0 ? '+' : ''}${data.closingRateTrendingValue}%`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {rateTrending.text} <rateTrending.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">{rateDescription}</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average closings per month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.averageClosingsPerMonth.toFixed(1)}
          </CardTitle>
          <CardAction>
            <Badge variant={averageTrending.variant} className={averageTrending.className}>
              <averageTrending.icon className="h-3 w-3" />
              {data.averageClosingsPerMonthTrendingValue !== 0 && `${data.averageClosingsPerMonthTrendingValue > 0 ? '+' : ''}${data.averageClosingsPerMonthTrendingValue}%`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {averageTrending.text} <averageTrending.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">{averageDescription}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
