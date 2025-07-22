import { ChartAreaData } from "@/types/kpi";

export function filterChartDataByTimeRange(data: ChartAreaData[], timeRange: string): ChartAreaData[] {
  if (!data.length) return [];

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (timeRange === "all") {
    return sortedData;
  }

  const lastDate = new Date(sortedData[sortedData.length - 1].date);
  let cutoffDate: Date;

  if (timeRange === "90d") {
    cutoffDate = new Date(lastDate.getTime() - 90 * 24 * 60 * 60 * 1000);
  } else if (timeRange === "30d") {
    cutoffDate = new Date(lastDate.getTime() - 30 * 24 * 60 * 60 * 1000);
  } else {
    return sortedData;
  }

  return sortedData.filter(item => new Date(item.date) >= cutoffDate);
}

export function formatDateTick(value: any): string {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateTooltip(value: any): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
