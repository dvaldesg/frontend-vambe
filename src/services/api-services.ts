import { apiClient } from '@/lib/api-client';
import { SectionCardsData, ChartAreaData, ClientMeetingData } from '@/types/kpi';

export const kpiService = {
  async getSectionCards() {
    return apiClient.get<SectionCardsData>('/kpi/section-cards');
  },

  async getChartAreaInteractive() {
    return apiClient.get<ChartAreaData[]>('/kpi/chart-area-interactive');
  },

  async getClientMeetings() {
    return apiClient.get<ClientMeetingData[]>('/client-meetings/all');
  },
};
