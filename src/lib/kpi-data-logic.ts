import { kpiService, salesmanService } from "@/services/api-services";
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData, LeadsSourceData, CommercialSectorData, LeadSourceSuccessRateData, CommercialSectorSuccessRateData, SalesmanData, SalesmanPerformanceData, SalesmanSuccessRateData } from "@/types/kpi";

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

export async function fetchLeadsSourceData(): Promise<LeadsSourceData[]> {
  try {
    const response = await kpiService.getLeadsSource();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching leads source data');
  }
}

export async function fetchCommercialSectorsData(): Promise<CommercialSectorData[]> {
  try {
    const response = await kpiService.getCommercialSectors();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching commercial sectors data');
  }
}

export async function fetchLeadSourceSuccessRatesData(): Promise<LeadSourceSuccessRateData[]> {
  try {
    const response = await kpiService.getLeadSourceSuccessRates();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching lead source success rates data');
  }
}

export async function fetchCommercialSectorSuccessRatesData(): Promise<CommercialSectorSuccessRateData[]> {
  try {
    const response = await kpiService.getCommercialSectorSuccessRates();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching commercial sector success rates data');
  }
}

export async function fetchSalesmenData(): Promise<SalesmanData[]> {
  try {
    const response = await salesmanService.getAllSalesmen();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching salesmen data');
  }
}

export async function createSalesmanData(name: string): Promise<SalesmanData> {
  try {
    const response = await salesmanService.createSalesman(name);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error creating salesman');
  }
}

export async function fetchSalesmanPerformanceData(): Promise<SalesmanPerformanceData[]> {
  try {
    const response = await kpiService.getSalesmanPerformance();
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching salesman performance data');
  }
}

export async function fetchSalesmanSuccessRateData(salesmanId: number): Promise<SalesmanSuccessRateData[]> {
  try {
    const response = await kpiService.getSalesmanSuccessRate(salesmanId);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching salesman success rate data');
  }
}

export function shouldRefetchData(lastFetch: number | null): boolean {
  if (!lastFetch) return true;
  
  const sessionStart = performance.timeOrigin;
  return lastFetch <= sessionStart;
}
