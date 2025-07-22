import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionCardsData, ChartAreaData, ClientMeetingData } from '@/types/kpi';

interface KpiStore {
  sectionCards: SectionCardsData | null;
  chartAreaData: ChartAreaData[] | null;
  clientMeetings: ClientMeetingData[] | null;
  lastFetch: number | null;
  chartLastFetch: number | null;
  clientMeetingsLastFetch: number | null;
  setSectionCards: (data: SectionCardsData) => void;
  setChartAreaData: (data: ChartAreaData[]) => void;
  setClientMeetings: (data: ClientMeetingData[]) => void;
  clearSectionCards: () => void;
  clearChartAreaData: () => void;
  clearClientMeetings: () => void;
}


export const useKpiStore = create<KpiStore>()(
  persist(
    (set) => ({
      sectionCards: null,
      chartAreaData: null,
      clientMeetings: null,
      lastFetch: null,
      chartLastFetch: null,
      clientMeetingsLastFetch: null,
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
    }),
    {
      name: 'kpi-storage',
    }
  )
);