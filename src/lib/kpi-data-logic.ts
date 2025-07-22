import { kpiService } from "@/services/api-services";
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData } from "@/types/kpi";

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

export async function fetchClientMeetingsData(): Promise<ClientMeetingData[]> {
  try {
    const response = await kpiService.getClientMeetings();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching client meetings data');
  }
}

export async function fetchNewLeadsData(): Promise<NewLeadsData[]> {
  try {
    const response = await kpiService.getNewLeads();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching new leads data');
  }
}

export async function fetchReasonsData(): Promise<ReasonData[]> {
  try {
    const response = await kpiService.getReasons();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching reasons data');
  }
}

export function shouldRefetchData(lastFetch: number | null): boolean {
  if (!lastFetch) return true;
  
  const sessionStart = performance.timeOrigin;
  return lastFetch <= sessionStart;
}
