"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useKpiStore } from "@/stores/kpi-store";
import { fetchNewLeadsData, fetchReasonsData } from "@/lib/kpi-data-logic";

export function OverviewCards() {
  const store = useKpiStore();
  const [newLeadsLoading, setNewLeadsLoading] = useState(false);
  const [newLeadsError, setNewLeadsError] = useState<string | null>(null);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const [reasonsError, setReasonsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNewLeads() {
      const sessionStart = performance.timeOrigin;
      
      if (store.newLeads && store.newLeadsLastFetch && store.newLeadsLastFetch > sessionStart) {
        return;
      }

      try {
        setNewLeadsLoading(true);
        setNewLeadsError(null);
        const response = await fetchNewLeadsData();
        store.setNewLeads(response);
      } catch (err) {
        setNewLeadsError(err instanceof Error ? err.message : 'Error fetching new leads data');
      } finally {
        setNewLeadsLoading(false);
      }
    }

    loadNewLeads();
  }, [store.newLeads, store.newLeadsLastFetch, store.setNewLeads]);

  useEffect(() => {
    async function loadReasons() {
      const sessionStart = performance.timeOrigin;
      
      if (store.reasons && store.reasonsLastFetch && store.reasonsLastFetch > sessionStart) {
        return;
      }

      try {
        setReasonsLoading(true);
        setReasonsError(null);
        const response = await fetchReasonsData();
        store.setReasons(response);
      } catch (err) {
        setReasonsError(err instanceof Error ? err.message : 'Error fetching reasons data');
      } finally {
        setReasonsLoading(false);
      }
    }

    loadReasons();
  }, [store.reasons, store.reasonsLastFetch, store.setReasons]);

  // Configuración para el gráfico de new leads
  const newLeadsChartConfig = {
    meetingsClosed: {
      label: "Closed",
      color: "var(--chart-1)",
    },
    notClosed: {
      label: "Not Closed",
      color: "var(--chart-3)",
    },
    background: {
      color: "var(--primary)",
    },
  };

  // Configuración para el gráfico de reasons
  const reasonsChartConfig = {
    quantity: {
      label: "Quantity",
      color: "var(--chart-1)",
    },
  };

  // Calcular totales para new leads
  const totalClosed = store.newLeads?.reduce((sum, item) => sum + item.meetingsClosed, 0) || 0;
  const totalNotClosed = store.newLeads?.reduce((sum, item) => sum + item.notClosed, 0) || 0;
  const total = totalClosed + totalNotClosed;
  const closedPercentage = total > 0 ? ((totalClosed / total) * 100).toFixed(1) : "0.0";

  // Encontrar el valor máximo de meetings para usar como referencia en el background
  const maxMeetings = Math.max(
    ...(store.newLeads?.map(item => item.meetingsClosed + item.notClosed) || [0])
  );

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>New Leads</CardTitle>
          <CardDescription>Last 6 Weeks</CardDescription>
        </CardHeader>
        <CardContent className="size-full">
          {newLeadsLoading ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : newLeadsError ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-sm text-destructive">Error loading data</span>
            </div>
          ) : (
            <ChartContainer className="size-full min-h-32" config={newLeadsChartConfig}>
              <BarChart 
                accessibilityLayer 
                data={store.newLeads || []} 
                barSize={16}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 25,
                }}
              >
                <XAxis 
                  dataKey="dateRange" 
                  tickLine={false} 
                  tickMargin={10} 
                  axisLine={false} 
                  className="text-xs"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  background={{ 
                    fill: "var(--color-background)", 
                    radius: 4, 
                    opacity: 0.07 
                  }}
                  dataKey="meetingsClosed"
                  stackId="a"
                  fill="var(--color-meetingsClosed)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar 
                  dataKey="notClosed" 
                  stackId="a" 
                  fill="var(--color-notClosed)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-xl font-semibold tabular-nums">{total}</span>
          <span className="text-sm font-medium text-green-500">{closedPercentage}% closed</span>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Why Choose Vambe</CardTitle>
          <CardDescription>Reasons customers choose our platform</CardDescription>
        </CardHeader>
        <CardContent>
          {reasonsLoading ? (
            <div className="flex items-center justify-center h-60">
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : reasonsError ? (
            <div className="flex items-center justify-center h-60">
              <span className="text-sm text-destructive">Error loading data</span>
            </div>
          ) : (
            <ChartContainer config={reasonsChartConfig} className="h-60 w-full">
              <BarChart
                data={store.reasons || []}
                margin={{
                  top: 15,
                  right: 10,
                  left: 10,
                  bottom: 40,
                }}
              >
                <XAxis 
                  dataKey="reason" 
                  tickLine={false} 
                  tickMargin={10} 
                  axisLine={false} 
                  className="text-xs"
                  tick={{ fontSize: 9 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantity"
                  fill="var(--color-quantity)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">
            {store.reasons ? `${store.reasons.length} different reasons identified` : 'Loading reasons...'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
