"use client";

import { useState, useEffect } from "react";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import { useKpiStore } from "@/stores/kpi-store";
import { 
  fetchSectionCardsData, 
  fetchChartAreaData,
  fetchClientMeetingsData 
} from "@/lib/kpi-data-logic";

export default function Page() {
  const store = useKpiStore();
  const [sectionCardsLoading, setSectionCardsLoading] = useState(false);
  const [sectionCardsError, setSectionCardsError] = useState<string | null>(null);
  const [chartAreaLoading, setChartAreaLoading] = useState(false);
  const [chartAreaError, setChartAreaError] = useState<string | null>(null);
  const [clientMeetingsLoading, setClientMeetingsLoading] = useState(false);
  const [clientMeetingsError, setClientMeetingsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSectionCards() {
      const sessionStart = performance.timeOrigin;
      
      if (store.sectionCards && store.lastFetch && store.lastFetch > sessionStart) {
        return;
      }

      try {
        setSectionCardsLoading(true);
        setSectionCardsError(null);
        const response = await fetchSectionCardsData();
        store.setSectionCards(response);
      } catch (err) {
        setSectionCardsError(err instanceof Error ? err.message : 'Error fetching KPI data');
      } finally {
        setSectionCardsLoading(false);
      }
    }

    loadSectionCards();
  }, [store.sectionCards, store.lastFetch, store.setSectionCards]);

  useEffect(() => {
    async function loadChartAreaData() {
      const sessionStart = performance.timeOrigin;
      
      if (store.chartAreaData && store.chartLastFetch && store.chartLastFetch > sessionStart) {
        return;
      }

      try {
        setChartAreaLoading(true);
        setChartAreaError(null);
        const response = await fetchChartAreaData();
        store.setChartAreaData(response);
      } catch (err) {
        setChartAreaError(err instanceof Error ? err.message : 'Error fetching chart data');
      } finally {
        setChartAreaLoading(false);
      }
    }

    loadChartAreaData();
  }, [store.chartAreaData, store.chartLastFetch, store.setChartAreaData]);

  useEffect(() => {
    async function loadClientMeetings() {
      const sessionStart = performance.timeOrigin;
      
      if (store.clientMeetings && store.clientMeetingsLastFetch && store.clientMeetingsLastFetch > sessionStart) {
        return;
      }

      try {
        setClientMeetingsLoading(true);
        setClientMeetingsError(null);
        const response = await fetchClientMeetingsData();
        store.setClientMeetings(response);
      } catch (err) {
        setClientMeetingsError(err instanceof Error ? err.message : 'Error fetching client meetings data');
      } finally {
        setClientMeetingsLoading(false);
      }
    }

    loadClientMeetings();
  }, [store.clientMeetings, store.clientMeetingsLastFetch, store.setClientMeetings]);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards 
        sectionCards={store.sectionCards}
        isLoading={sectionCardsLoading}
        error={sectionCardsError}
      />
      <ChartAreaInteractive 
        chartAreaData={store.chartAreaData}
        isLoading={chartAreaLoading}
        error={chartAreaError}
      />
      <DataTable 
        data={store.clientMeetings || []} 
        isLoading={clientMeetingsLoading}
        error={clientMeetingsError}
      />
    </div>
  );
}
