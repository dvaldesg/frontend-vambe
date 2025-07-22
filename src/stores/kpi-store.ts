import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionCardsData, ChartAreaData } from '@/types/kpi';

interface KpiStore {
  sectionCards: SectionCardsData | null;
  chartAreaData: ChartAreaData[] | null;
  lastFetch: number | null;
  chartLastFetch: number | null;
  setSectionCards: (data: SectionCardsData) => void;
  setChartAreaData: (data: ChartAreaData[]) => void;
  clearSectionCards: () => void;
  clearChartAreaData: () => void;
}


export const useKpiStore = create<KpiStore>()(
  persist(
    (set) => ({
      sectionCards: null,
      chartAreaData: null,
      lastFetch: null,
      chartLastFetch: null,
      setSectionCards: (data) => set({ 
        sectionCards: data, 
        lastFetch: Date.now() 
      }),
      setChartAreaData: (data) => set({ 
        chartAreaData: data, 
        chartLastFetch: Date.now() 
      }),
      clearSectionCards: () => set({ 
        sectionCards: null, 
        lastFetch: null 
      }),
      clearChartAreaData: () => set({ 
        chartAreaData: null, 
        chartLastFetch: null 
      }),
    }),
    {
      name: 'kpi-storage',
    }
  )
);