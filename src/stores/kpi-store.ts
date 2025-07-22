import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionCardsData, ChartAreaData, ClientMeetingData, NewLeadsData, ReasonData } from '@/types/kpi';

interface KpiStore {
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


export const useKpiStore = create<KpiStore>()(
  persist(
    (set) => ({
      sectionCards: null,
      chartAreaData: null,
      clientMeetings: null,
      newLeads: null,
      reasons: null,
      lastFetch: null,
      chartLastFetch: null,
      clientMeetingsLastFetch: null,
      newLeadsLastFetch: null,
      reasonsLastFetch: null,
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
    }),
    {
      name: 'kpi-storage',
    }
  )
);