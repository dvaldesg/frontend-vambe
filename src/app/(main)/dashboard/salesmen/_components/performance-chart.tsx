"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SalesmanPerformanceData } from "@/types/kpi";
import { CumulativeChart } from "./cumulative-chart";
import { IndividualChart } from "./individual-chart";

interface PerformanceChartProps {
  performanceData: SalesmanPerformanceData[] | null;
  selectedSalesmen: string[];
  isLoading: boolean;
  error: string | null;
}

export function PerformanceChart({ performanceData, selectedSalesmen, isLoading, error }: PerformanceChartProps) {
  const [showCumulative, setShowCumulative] = useState(false);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Salesman Performance
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">Loading performance data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Salesman Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-center space-y-2">
            <div>
              <p className="text-destructive font-medium">Error</p>
              <p className="text-muted-foreground text-sm">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!performanceData || performanceData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Salesman Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">No performance data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredData = selectedSalesmen.length > 0 
    ? performanceData.filter(salesman => selectedSalesmen.includes(salesman.salesmanName))
    : performanceData;

  if (filteredData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Salesman Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-center">
            <div>
              <p className="font-medium">No performance data available</p>
              <p className="text-sm text-muted-foreground">
                {selectedSalesmen.length > 0 
                  ? 'No data found for the selected salesmen'
                  : 'No performance data found for any salesmen'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Salesman Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedSalesmen.length > 0 
                ? `Showing data for: ${selectedSalesmen.join(', ')}`
                : 'Showing data for all salesmen'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="cumulative-mode"
                checked={showCumulative}
                onCheckedChange={setShowCumulative}
              />
              <Label htmlFor="cumulative-mode" className="text-sm">
                Cumulative
              </Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showCumulative ? (
          <CumulativeChart 
            performanceData={filteredData} 
            selectedSalesmen={selectedSalesmen} 
          />
        ) : (
          <IndividualChart 
            performanceData={filteredData} 
            selectedSalesmen={selectedSalesmen} 
          />
        )}
      </CardContent>
    </Card>
  );
}
