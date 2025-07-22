import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData, LeadsSourceData, CommercialSectorData, LeadSourceSuccessRateData, CommercialSectorSuccessRateData } from '@/types/kpi';

interface KpiStore {
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


export const useKpiStore = create<KpiStore>()(
  persist(
    (set) => ({
      sectionCards: null,
      chartAreaData: null,
      clientMeetings: null,
      newLeads: null,
      reasons: null,
      leadsSource: null,
      commercialSectors: null,
      leadSourceSuccessRates: null,
      commercialSectorSuccessRates: null,
      lastFetch: null,
      chartLastFetch: null,
      clientMeetingsLastFetch: null,
      newLeadsLastFetch: null,
      reasonsLastFetch: null,
      leadsSourceLastFetch: null,
      commercialSectorsLastFetch: null,
      leadSourceSuccessRatesLastFetch: null,
      commercialSectorSuccessRatesLastFetch: null,
      setSectionCards: (data) => set({ 
        sectionCards: data, 
        lastFetch: Date.now() 
      }),
      setChartAreaData: (data) => set({ 
        chartAreaData: data, 
        chartLastFetch: Date.now() 
      }),
      setClientMeetings: (data) => set({ 
        clientMeetings: data, 
        clientMeetingsLastFetch: Date.now() 
      }),
      setNewLeads: (data) => set({ 
        newLeads: data, 
        newLeadsLastFetch: Date.now() 
      }),
      setReasons: (data) => set({ 
        reasons: data, 
        reasonsLastFetch: Date.now() 
      }),
      setLeadsSource: (data) => set({ 
        leadsSource: data, 
        leadsSourceLastFetch: Date.now() 
      }),
      setCommercialSectors: (data) => set({ 
        commercialSectors: data, 
        commercialSectorsLastFetch: Date.now() 
      }),
      setLeadSourceSuccessRates: (data) => set({ 
        leadSourceSuccessRates: data, 
        leadSourceSuccessRatesLastFetch: Date.now() 
      }),
      setCommercialSectorSuccessRates: (data) => set({ 
        commercialSectorSuccessRates: data, 
        commercialSectorSuccessRatesLastFetch: Date.now() 
      }),
      clearSectionCards: () => set({ 
        sectionCards: null, 
        lastFetch: null 
      }),
      clearChartAreaData: () => set({ 
        chartAreaData: null, 
        chartLastFetch: null 
      }),
      clearClientMeetings: () => set({ 
        clientMeetings: null, 
        clientMeetingsLastFetch: null 
      }),
      clearNewLeads: () => set({ 
        newLeads: null, 
        newLeadsLastFetch: null 
      }),
      clearReasons: () => set({ 
        reasons: null, 
        reasonsLastFetch: null 
      }),
      clearLeadsSource: () => set({ 
        leadsSource: null, 
        leadsSourceLastFetch: null 
      }),
      clearCommercialSectors: () => set({ 
        commercialSectors: null, 
        commercialSectorsLastFetch: null 
      }),
      clearLeadSourceSuccessRates: () => set({ 
        leadSourceSuccessRates: null, 
        leadSourceSuccessRatesLastFetch: null 
      }),
      clearCommercialSectorSuccessRates: () => set({ 
        commercialSectorSuccessRates: null, 
        commercialSectorSuccessRatesLastFetch: null 
      }),
    }),
    {
      name: 'kpi-storage',
    }
  )
);