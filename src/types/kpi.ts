export interface SectionCardsData {
  totalClientMeetings: number;
  totalClientMeetingsTrending: "up" | "stable" | "down";
  totalClientMeetingsTrendingValue: number;
  totalClosings: number;
  totalClosingsTrending: "up" | "stable" | "down";
  totalClosingsTrendingValue: number;
  closingRate: number;
  closingRateTrending: "up" | "stable" | "down";
  closingRateTrendingValue: number;
  averageClosingsPerMonth: number;
  averageClosingsPerMonthTrending: "up" | "stable" | "down";
  averageClosingsPerMonthTrendingValue: number;
}

export interface ChartAreaData {
  date: string;
  closed: number;
  open: number;
}

export interface ClientMeetingData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  salesmanName: string;
  salesmanId: number;
  date: string;
  closed: boolean;
  transcription: string;
}

export interface NewLeadsData {
  dateRange: string;
  meetingsClosed: number;
  notClosed: number;
}

export interface ReasonData {
  reason: string;
  quantity: number;
}

export interface LeadsSourceData {
  source: string;
  quantity: number;
}

export interface CommercialSectorData {
  commercial_sector: string;
  quantity: number;
}

export interface LeadSourceSuccessRateData {
  leadSource: string;
  closed: number;
  notClosed: number;
  successRate: number;
}

export interface CommercialSectorSuccessRateData {
  commercialSector: string;
  closed: number;
  notClosed: number;
  successRate: number;
}

export interface KpiStore {
  sectionCards: SectionCardsData | null;
  chartAreaData: ChartAreaData[] | null;
  clientMeetings: ClientMeetingData[] | null;
  newLeads: NewLeadsData[] | null;
  reasons: ReasonData[] | null;
  leadsSource: LeadsSourceData[] | null;
  commercialSectors: CommercialSectorData[] | null;
  leadSourceSuccessRates: LeadSourceSuccessRateData[] | null;
  commercialSectorSuccessRates: CommercialSectorSuccessRateData[] | null;
  lastFetch: number | null;
  chartLastFetch: number | null;
  clientMeetingsLastFetch: number | null;
  newLeadsLastFetch: number | null;
  reasonsLastFetch: number | null;
  leadsSourceLastFetch: number | null;
  commercialSectorsLastFetch: number | null;
  leadSourceSuccessRatesLastFetch: number | null;
  commercialSectorSuccessRatesLastFetch: number | null;
  setSectionCards: (data: SectionCardsData) => void;
  setChartAreaData: (data: ChartAreaData[]) => void;
  setClientMeetings: (data: ClientMeetingData[]) => void;
  setNewLeads: (data: NewLeadsData[]) => void;
  setReasons: (data: ReasonData[]) => void;
  setLeadsSource: (data: LeadsSourceData[]) => void;
  setCommercialSectors: (data: CommercialSectorData[]) => void;
  setLeadSourceSuccessRates: (data: LeadSourceSuccessRateData[]) => void;
  setCommercialSectorSuccessRates: (data: CommercialSectorSuccessRateData[]) => void;
  clearSectionCards: () => void;
  clearChartAreaData: () => void;
  clearClientMeetings: () => void;
  clearNewLeads: () => void;
  clearReasons: () => void;
  clearLeadsSource: () => void;
  clearCommercialSectors: () => void;
  clearLeadSourceSuccessRates: () => void;
  clearCommercialSectorSuccessRates: () => void;
}