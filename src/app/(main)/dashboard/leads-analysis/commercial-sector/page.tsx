"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKpiStore } from "@/stores/kpi-store";
import { fetchCommercialSectorSuccessRatesData } from "@/lib/kpi-data-logic";
import { transformCommercialSectorSuccessRateData } from "@/lib/chart-config-utils";

export default function CommercialSectorPage() {
  const store = useKpiStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const sessionStart = performance.timeOrigin;
      
      if (store.commercialSectorSuccessRates && store.commercialSectorSuccessRatesLastFetch && store.commercialSectorSuccessRatesLastFetch > sessionStart) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchCommercialSectorSuccessRatesData();
        store.setCommercialSectorSuccessRates(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching commercial sector success rates data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [store.commercialSectorSuccessRates, store.commercialSectorSuccessRatesLastFetch, store.setCommercialSectorSuccessRates]);

  const transformedData = store.commercialSectorSuccessRates ? transformCommercialSectorSuccessRateData(store.commercialSectorSuccessRates) : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading commercial sector success rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Commercial Sectors Analysis</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of commercial sector performance and success rates
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      {transformedData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {transformedData.reduce((sum, item) => sum + item.total, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {transformedData.reduce((sum, item) => sum + item.closed, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Closed Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {transformedData.reduce((sum, item) => sum + item.notClosed, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Not Closed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {(
                  (transformedData.reduce((sum, item) => sum + item.closed, 0) /
                    transformedData.reduce((sum, item) => sum + item.total, 0)) * 100
                ).toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Success Rate</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transformedData.map((item) => (
          <Card key={item.commercialSector} className="space-y-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.sectorLabel}</CardTitle>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Total: {item.total} leads</span>
                <span 
                  className="font-semibold px-2 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: item.successRateColor }}
                >
                  {item.successRate.toFixed(1)}% success
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Closed vs Not Closed Chart */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Closed vs Not Closed</h4>
                <div className="h-24 flex justify-center">
                  <ResponsiveContainer width={96} height={96}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Closed", value: item.closed, fill: "#000000" },
                          { name: "Not Closed", value: item.notClosed, fill: "#ffffff" }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={40}
                        innerRadius={20}
                        dataKey="value"
                        stroke="#e5e7eb"
                        strokeWidth={1}
                      >
                        {[
                          { name: "Closed", value: item.closed, fill: "#000000" },
                          { name: "Not Closed", value: item.notClosed, fill: "#ffffff" }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Success Rate Indicator */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Success Rate Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#000000" }}></div>
                      Closed
                    </span>
                    <span className="font-semibold">{item.closed} ({((item.closed / item.total) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: "#ffffff" }}></div>
                      Not Closed
                    </span>
                    <span className="font-semibold">{item.notClosed} ({((item.notClosed / item.total) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Success Rate Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Success Rate</span>
                  <span className="font-semibold">{item.successRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(item.successRate, 100)}%`,
                      backgroundColor: item.successRateColor
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {transformedData.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
          <p className="text-muted-foreground">No commercial sector data available</p>
        </div>
      )}
    </div>
  );
}
