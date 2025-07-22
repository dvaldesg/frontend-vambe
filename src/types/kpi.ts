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

export interface KpiStore {
  sectionCards: SectionCardsData | null;
  chartAreaData: ChartAreaData[] | null;
  clientMeetings: ClientMeetingData[] | null;
  newLeads: NewLeadsData[] | null;
  reasons: ReasonData[] | null;
  lastFetch: number | null;
  chartLastFetch: number | null;
  clientMeetingsLastFetch: number | null;
  newLeadsLastFetch: number | null;
  reasonsLastFetch: number | null;
  setSectionCards: (data: SectionCardsData) => void;
  setChartAreaData: (data: ChartAreaData[]) => void;
  setClientMeetings: (data: ClientMeetingData[]) => void;
  setNewLeads: (data: NewLeadsData[]) => void;
  setReasons: (data: ReasonData[]) => void;
  clearSectionCards: () => void;
  clearChartAreaData: () => void;
  clearClientMeetings: () => void;
  clearNewLeads: () => void;
  clearReasons: () => void;
}