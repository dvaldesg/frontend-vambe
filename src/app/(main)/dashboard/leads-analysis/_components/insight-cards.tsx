"use client";

import { useState, useEffect } from "react";
import { XAxis, Label, Pie, PieChart, Bar, BarChart, CartesianGrid, LabelList, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import { useKpiStore } from "@/stores/kpi-store";
import { fetchLeadsSourceData, fetchCommercialSectorsData } from "@/lib/kpi-data-logic";
import { transformLeadsSourceData, generateLeadsSourceChartConfig, transformCommercialSectorsData, generateCommercialSectorsChartConfig } from "@/lib/chart-config-utils";

// import {
//   projectRevenueChartData,
//   projectRevenueChartConfig,
// } from "./sectors.config";

/*
  COMMENTED PROJECT REVENUE CHART:
  The Project Revenue vs. Target chart has been replaced with Commercial Sectors chart.
  To restore the Project Revenue chart, uncomment the imports above and replace the 
  Commercial Sectors card with the following structure:
  
  <Card className="col-span-1 xl:col-span-3">
    <CardHeader>
      <CardTitle>Project Revenue vs. Target</CardTitle>
    </CardHeader>
    <CardContent className="size-full max-h-52">
      <ChartContainer config={projectRevenueChartConfig} className="size-full">
        <BarChart accessibilityLayer data={projectRevenueChartData} layout="vertical">
          // ... BarChart configuration
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <p className="text-muted-foreground text-xs">Average progress: 78% · 2 projects above target</p>
    </CardFooter>
  </Card>
*/

export function InsightCards() {
  const store = useKpiStore();
  const [leadsSourceLoading, setLeadsSourceLoading] = useState(false);
  const [leadsSourceError, setLeadsSourceError] = useState<string | null>(null);
  const [commercialSectorsLoading, setCommercialSectorsLoading] = useState(false);
  const [commercialSectorsError, setCommercialSectorsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeadsSource() {
      const sessionStart = performance.timeOrigin;
      
      if (store.leadsSource && store.leadsSourceLastFetch && store.leadsSourceLastFetch > sessionStart) {
        return;
      }

      try {
        setLeadsSourceLoading(true);
        setLeadsSourceError(null);
        const response = await fetchLeadsSourceData();
        store.setLeadsSource(response);
      } catch (err) {
        setLeadsSourceError(err instanceof Error ? err.message : 'Error fetching leads source data');
      } finally {
        setLeadsSourceLoading(false);
      }
    }

    loadLeadsSource();
  }, [store.leadsSource, store.leadsSourceLastFetch, store.setLeadsSource]);

  useEffect(() => {
    async function loadCommercialSectors() {
      const sessionStart = performance.timeOrigin;
      
      if (store.commercialSectors && store.commercialSectorsLastFetch && store.commercialSectorsLastFetch > sessionStart) {
        return;
      }

      try {
        setCommercialSectorsLoading(true);
        setCommercialSectorsError(null);
        const response = await fetchCommercialSectorsData();
        store.setCommercialSectors(response);
      } catch (err) {
        setCommercialSectorsError(err instanceof Error ? err.message : 'Error fetching commercial sectors data');
      } finally {
        setCommercialSectorsLoading(false);
      }
    }

    loadCommercialSectors();
  }, [store.commercialSectors, store.commercialSectorsLastFetch, store.setCommercialSectors]);

  // Transform API data for charts
  const leadsBySourceChartData = store.leadsSource ? transformLeadsSourceData(store.leadsSource) : [];
  const leadsBySourceChartConfig = store.leadsSource ? generateLeadsSourceChartConfig(store.leadsSource) : {};
  const totalLeads = leadsBySourceChartData.reduce((acc: number, curr) => acc + curr.leads, 0);

  const commercialSectorsChartData = store.commercialSectors ? transformCommercialSectorsData(store.commercialSectors) : [];
  const commercialSectorsChartConfig = store.commercialSectors ? generateCommercialSectorsChartConfig(store.commercialSectors) : {};
  const totalSectorLeads = commercialSectorsChartData.reduce((acc: number, curr) => acc + curr.leads, 0);

  if (leadsSourceLoading || commercialSectorsLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="max-h-48 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Commercial Sectors</CardTitle>
          </CardHeader>
          <CardContent className="size-full max-h-52 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (leadsSourceError || commercialSectorsError) {
    return (
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="max-h-48 flex items-center justify-center">
            <div className="text-destructive">
              {leadsSourceError ? `Error: ${leadsSourceError}` : 'Loading...'}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Commercial Sectors</CardTitle>
          </CardHeader>
          <CardContent className="size-full max-h-52 flex items-center justify-center">
            <div className="text-destructive">
              {commercialSectorsError ? `Error: ${commercialSectorsError}` : 'Loading...'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Leads by Source</CardTitle>
        </CardHeader>
        <CardContent className="max-h-48">
          <ChartContainer config={leadsBySourceChartConfig} className="size-full">
            <PieChart
              className="m-0"
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={leadsBySourceChartData}
                dataKey="leads"
                nameKey="source"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                cornerRadius={4}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold tabular-nums"
                          >
                            {totalLeads.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className="fill-muted-foreground">
                            Leads
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                content={() => (
                  <ul className="ml-8 flex flex-col gap-3">
                    {leadsBySourceChartData.map((item) => (
                      <li key={item.source} className="flex w-36 items-center justify-between">
                        <span className="flex items-center gap-2 capitalize">
                          <span className="size-2.5 rounded-full" style={{ background: item.fill }} />
                          {leadsBySourceChartConfig[item.source]?.label || item.source}
                        </span>
                        <span className="tabular-nums">{item.leads}</span>
                      </li>
                    ))}
                  </ul>
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/dashboard/leads-analysis/source'}
          >
            View Full Report
          </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Commercial Sectors</CardTitle>
        </CardHeader>
        <CardContent className="max-h-52">
          <ChartContainer config={commercialSectorsChartConfig} className="size-full">
            <PieChart
              className="m-0"
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={commercialSectorsChartData}
                dataKey="leads"
                nameKey="sector"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={1}
                cornerRadius={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold tabular-nums"
                          >
                            {totalSectorLeads.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-sm">
                            Sectors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                content={() => (
                  <ul className="ml-6 flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-4">
                    {commercialSectorsChartData.map((item) => (
                      <li key={item.sector} className="flex w-48 items-center justify-between text-xs">
                        <span className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="size-2.5 rounded-full flex-shrink-0" style={{ background: item.fill }} />
                          <span className="truncate text-left">{commercialSectorsChartConfig[item.sector]?.label || item.sector}</span>
                        </span>
                        <span className="tabular-nums flex-shrink-0 ml-3 font-medium">{item.leads}</span>
                      </li>
                    ))}
                  </ul>
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/dashboard/leads-analysis/commercial-sector'}
          >
            View Full Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
