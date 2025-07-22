import { apiClient } from '@/lib/api-client';
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData, LeadsSourceData, CommercialSectorData, LeadSourceSuccessRateData, CommercialSectorSuccessRateData } from '@/types/kpi';

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

  async getNewLeads() {
    return apiClient.get<NewLeadsData[]>('/kpi/new-leads');
  },

  async getReasons() {
    return apiClient.get<ReasonData[]>('/kpi/vambe-reason');
  },

  async getLeadsSource() {
    return apiClient.get<LeadsSourceData[]>('/kpi/leads-source');
  },

  async getCommercialSectors() {
    return apiClient.get<CommercialSectorData[]>('/kpi/commercial-sectors');
  },

  async getLeadSourceSuccessRates() {
    return apiClient.get<LeadSourceSuccessRateData[]>('/kpi/leads-source-success-rate');
  },

  async getCommercialSectorSuccessRates() {
    return apiClient.get<CommercialSectorSuccessRateData[]>('/kpi/commercial-sector-success-rate');
  },
};
