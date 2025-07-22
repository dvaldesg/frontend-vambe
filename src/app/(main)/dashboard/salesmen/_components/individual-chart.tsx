"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { SalesmanPerformanceData } from "@/types/kpi";

interface IndividualChartProps {
  performanceData: SalesmanPerformanceData[];
  selectedSalesmen: string[];
}

const colors = [
  "#8884d8",
  "#82ca9d", 
  "#ffc658",
  "#ff7300",
  "#0088fe",
  "#00c49f",
  "#ffbb28",
  "#ff8042",
  "#8dd1e1",
  "#d084d0"
];

export function IndividualChart({ performanceData, selectedSalesmen }: IndividualChartProps) {
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({});

  const toggleLineVisibility = (lineKey: string) => {
    setVisibleLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey]
    }));
  };

  const filteredData = selectedSalesmen.length > 0 
    ? performanceData.filter(salesman => selectedSalesmen.includes(salesman.salesmanName))
    : performanceData;

  const allMonths = Array.from(
    new Set(
      filteredData.flatMap(salesman => 
        salesman.data.map(item => item.month)
      )
    )
  ).sort();

  const chartData = allMonths.map((month) => {
    const dataPoint: any = { month };
    
    filteredData.forEach(salesman => {
      const monthData = salesman.data.find(item => item.month === month);
      dataPoint[`${salesman.salesmanName}_total`] = monthData?.totalMeetings || 0;
      dataPoint[`${salesman.salesmanName}_closed`] = monthData?.closedMeetings || 0;
    });
    
    return dataPoint;
  });

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 p-2 bg-muted/30 rounded-md">
        {filteredData.map((salesman, index) => (
          <div key={salesman.salesmanName} className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 py-0"
                onClick={() => toggleLineVisibility(`${salesman.salesmanName}_total`)}
              >
                <div 
                  className="w-3 h-0.5 mr-1"
                  style={{ 
                    backgroundColor: visibleLines[`${salesman.salesmanName}_total`] === false 
                      ? '#ccc' 
                      : colors[index % colors.length] 
                  }}
                />
                <span className="text-xs">{salesman.salesmanName} - Total</span>
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 py-0"
                onClick={() => toggleLineVisibility(`${salesman.salesmanName}_closed`)}
              >
                <div 
                  className="w-3 h-0.5 mr-1 border-dashed border-t-2"
                  style={{ 
                    borderColor: visibleLines[`${salesman.salesmanName}_closed`] === false 
                      ? '#ccc' 
                      : colors[index % colors.length] 
                  }}
                />
                <span className="text-xs">{salesman.salesmanName} - Closed</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={formatMonth}
              fontSize={12}
            />
            <YAxis 
              fontSize={12} 
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              labelFormatter={(value) => `Month: ${formatMonth(value as string)}`}
              formatter={(value, name) => {
                const [salesmanName, type] = (name as string).split('_');
                const displayType = type === 'total' ? 'Total Meetings' : 'Closed Meetings';
                return [value, `${salesmanName} - ${displayType}`];
              }}
            />
            
            {filteredData.map((salesman, index) => [
              <Line
                key={`${salesman.salesmanName}_total`}
                type="monotone"
                dataKey={`${salesman.salesmanName}_total`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                hide={visibleLines[`${salesman.salesmanName}_total`] === false}
                connectNulls={false}
              />,
              <Line
                key={`${salesman.salesmanName}_closed`}
                type="monotone"
                dataKey={`${salesman.salesmanName}_closed`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                hide={visibleLines[`${salesman.salesmanName}_closed`] === false}
                connectNulls={false}
              />
            ]).flat()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
