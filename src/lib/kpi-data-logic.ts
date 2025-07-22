import { kpiService } from "@/services/api-services";
import { SectionCardsData, ChartAreaData } from "@/types/kpi";

export async function fetchSectionCardsData(): Promise<SectionCardsData> {
  try {
    const response = await kpiService.getSectionCards();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching KPI data');
  }
}

export async function fetchChartAreaData(): Promise<ChartAreaData[]> {
  try {
    const response = await kpiService.getChartAreaInteractive();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching chart data');
  }
}

export function shouldRefetchData(lastFetch: number | null): boolean {
  if (!lastFetch) return true;
  
  const sessionStart = performance.timeOrigin;
  return lastFetch <= sessionStart;
}
