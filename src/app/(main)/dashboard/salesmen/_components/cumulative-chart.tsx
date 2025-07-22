"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { SalesmanPerformanceData } from "@/types/kpi";

interface CumulativeChartProps {
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

export function CumulativeChart({ performanceData, selectedSalesmen }: CumulativeChartProps) {
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    'total': true,
    'closed': true
  });

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

  const chartData = allMonths.map((month, monthIndex) => {
    const dataPoint: any = { month };
    
    let cumulativeTotal = 0;
    let cumulativeClosed = 0;
    
    for (let i = 0; i <= monthIndex; i++) {
      const currentMonth = allMonths[i];
      
      filteredData.forEach(salesman => {
        const monthData = salesman.data.find(item => item.month === currentMonth);
        if (monthData) {
          cumulativeTotal += monthData.totalMeetings;
          cumulativeClosed += monthData.closedMeetings;
        }
      });
    }
    
    dataPoint['total'] = cumulativeTotal;
    dataPoint['closed'] = cumulativeClosed;
    
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
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 py-0"
            onClick={() => toggleLineVisibility('total')}
          >
            <div 
              className="w-3 h-0.5 mr-1"
              style={{ 
                backgroundColor: visibleLines['total'] === false ? '#ccc' : colors[0] 
              }}
            />
            <span className="text-xs">Total Meetings</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 py-0"
            onClick={() => toggleLineVisibility('closed')}
          >
            <div 
              className="w-3 h-0.5 mr-1 border-dashed border-t-2"
              style={{ 
                borderColor: visibleLines['closed'] === false ? '#ccc' : colors[1] 
              }}
            />
            <span className="text-xs">Closed Meetings</span>
          </Button>
        </div>
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
              domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
              allowDecimals={false}
            />
            <Tooltip 
              labelFormatter={(value) => `Month: ${formatMonth(value as string)}`}
              formatter={(value, name) => {
                const displayType = name === 'total' ? 'Total Meetings' : 'Closed Meetings';
                return [value, `Cumulative ${displayType}`];
              }}
            />
            
            {visibleLines['total'] && (
              <Line
                type="monotone"
                dataKey="total"
                stroke={colors[0]}
                strokeWidth={3}
                dot={{ r: 5 }}
                connectNulls={false}
                name="total"
              />
            )}
            {visibleLines['closed'] && (
              <Line
                type="monotone"
                dataKey="closed"
                stroke={colors[1]}
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 5 }}
                connectNulls={false}
                name="closed"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
