"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartAreaData } from "@/types/kpi";
import { 
  filterChartDataByTimeRange,
  formatDateTick,
  formatDateTooltip 
} from "@/lib/chart-area-logic";

export const description = "An interactive area chart";

interface ChartAreaInteractiveProps {
  chartAreaData: ChartAreaData[] | null;
  isLoading: boolean;
  error: string | null;
}

const chartConfig = {
  deals: {
    label: "Deals",
  },
  closed: {
    label: "Closed",
    color: "hsl(142, 76%, 36%)",
  },
  open: {
    label: "Not-Closed",
    color: "hsl(0, 84%, 60%)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ chartAreaData, isLoading, error }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("all");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d");
    }
  }, [isMobile]);

  const data = chartAreaData || [];

  const filteredData = React.useMemo(() => {
    return filterChartDataByTimeRange(data, timeRange);
  }, [data, timeRange]);

  let content;

  if (isLoading) {
    content = (
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full animate-pulse bg-muted rounded" />
      </CardContent>
    );
  } else if (error) {
    content = null;
  } else {
    content = (
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillClosed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-closed)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-closed)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillOpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-open)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-open)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDateTick}
            />
            <YAxis
              domain={[0, 'dataMax']}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toString()}
              hide
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={formatDateTooltip}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="open" type="monotone" fill="url(#fillOpen)" stroke="var(--color-open)" stackId="a" />
            <Area dataKey="closed" type="monotone" fill="url(#fillClosed)" stroke="var(--color-closed)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Meetings Volume Overview</CardTitle>
        <CardDescription>
          {isLoading ? (
            "Loading chart data..."
          ) : error ? (
            `Error loading chart data: ${error}`
          ) : (
            <>
              <span className="hidden @[540px]/card:block">Weekly deals performance</span>
              <span className="@[540px]/card:hidden">Weekly deals</span>
            </>
          )}
        </CardDescription>
        {!isLoading && !error && (
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="all">All time</ToggleGroupItem>
              <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
              <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all" className="rounded-lg">
                  All time
                </SelectItem>
                <SelectItem value="90d" className="rounded-lg">
                  Last 90 days
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        )}
      </CardHeader>
      {content}
    </Card>
  );
}
