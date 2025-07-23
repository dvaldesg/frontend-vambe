import { apiClient } from '@/lib/api-client';
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData, LeadsSourceData, CommercialSectorData, LeadSourceSuccessRateData, CommercialSectorSuccessRateData, SalesmanData, SalesmanPerformanceData, SalesmanSuccessRateData } from '@/types/kpi';
import { CreateClientMeetingRequest } from '@/types/client-meeting';
import { ClientClassificationData } from '@/types/client-classification';


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

  async getSalesmanPerformance() {
    return apiClient.get<SalesmanPerformanceData[]>('/kpi/salesman-performance');
  },

  async getSalesmanSuccessRate(salesmanId: number) {
    return apiClient.get<SalesmanSuccessRateData[]>(`/kpi/salesman-success-rate/${salesmanId}`);
  },
};

export const salesmanService = {
  async getAllSalesmen() {
    return apiClient.get<SalesmanData[]>('/salesmen/all');
  },

  async createSalesman(name: string) {
    return apiClient.post<SalesmanData>('/salesmen', { name });
  },
};

export const clientMeetingService = {
  async createClientMeeting(data: CreateClientMeetingRequest): Promise<ClientMeetingData> {
    const response = await apiClient.post<ClientMeetingData>('/client-meetings', data);
    return response;
  },

  async uploadCsv(file: File): Promise<{ message: string; meetingsCreated: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ message: string; meetingsCreated: number }>('/csv-parser/client-meetings', formData);
    return response;
  },

  async getAllMeetings(): Promise<ClientMeetingData[]> {
    const response = await apiClient.get<ClientMeetingData[]>('/client-meetings/all');
    return response;
  },

  async getClientMeetingClassification(meetingId: number): Promise<ClientClassificationData> {
    const response = await apiClient.get<ClientClassificationData>(`/client-classifications/meeting/${meetingId}`);
    return response;
  }
};
