"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchSalesmanSuccessRateData } from "@/lib/kpi-data-logic";
import { transformSalesmanSuccessRateData } from "@/lib/chart-config-utils";
import { SalesmanSuccessRateData } from "@/types/kpi";

export default function SalesmanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const salesmanId = parseInt(params.id as string);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRateData, setSuccessRateData] = useState<SalesmanSuccessRateData[]>([]);
  const [salesmanName, setSalesmanName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      if (!salesmanId || isNaN(salesmanId)) {
        setError("Invalid salesman ID");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const storedSalesmen = localStorage.getItem('kpi-storage');
        if (storedSalesmen) {
          try {
            const parsedData = JSON.parse(storedSalesmen);
            const salesmen = parsedData.state?.salesmen;
            if (salesmen) {
              const salesman = salesmen.find((s: any) => s.id === salesmanId);
              if (salesman) {
                setSalesmanName(salesman.name);
              }
            }
          } catch {
          }
        }
        
        const response = await fetchSalesmanSuccessRateData(salesmanId);
        setSuccessRateData(response);
        
        if (!salesmanName) {
          setSalesmanName(`Salesman ${salesmanId}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching salesman success rate data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [salesmanId, salesmanName]);

  const transformedData = transformSalesmanSuccessRateData(successRateData);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading salesman success rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{salesmanName} - Success by Sector</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of performance across different commercial sectors
          </p>
        </div>
      </div>

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
                {transformedData.length > 0 
                  ? Math.round((transformedData.reduce((sum, item) => sum + item.closed, 0) / transformedData.reduce((sum, item) => sum + item.total, 0)) * 100)
                  : 0
                }%
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
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.successRateColor }}
                />
                <span className="text-2xl font-bold">{item.successRate}%</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Closed', value: item.closed, color: item.closedColor },
                        { name: 'Not Closed', value: item.notClosed, color: item.notClosedColor }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={50}
                      dataKey="value"
                    >
                      <Cell fill={item.closedColor} />
                      <Cell fill={item.notClosedColor} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">Closed</span>
                  <span className="text-sm font-bold">{item.closed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-red-600">Not Closed</span>
                  <span className="text-sm font-bold">{item.notClosed}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold">{item.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {transformedData.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
          <p className="text-muted-foreground">No success rate data available for this salesman</p>
        </div>
      )}
    </div>
  );
}
