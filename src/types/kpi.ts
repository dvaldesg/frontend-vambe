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

export interface KpiStore {
  sectionCards: SectionCardsData | null;
  chartAreaData: ChartAreaData[] | null;
  lastFetch: number | null;
  chartLastFetch: number | null;
  setSectionCards: (data: SectionCardsData) => void;
  setChartAreaData: (data: ChartAreaData[]) => void;
  clearSectionCards: () => void;
  clearChartAreaData: () => void;
}