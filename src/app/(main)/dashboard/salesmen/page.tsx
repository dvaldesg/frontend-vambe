"use client";

import { useState, useEffect } from "react";
import { useKpiStore } from "@/stores/kpi-store";
import { fetchSalesmenData, fetchSalesmanPerformanceData } from "@/lib/kpi-data-logic";
import { SalesmenList } from "./_components/salesmen-list";
import { PerformanceChart } from "./_components/performance-chart";

export default function Page() {
  const store = useKpiStore();
  const [salesmenLoading, setSalesmenLoading] = useState(false);
  const [salesmenError, setSalesmenError] = useState<string | null>(null);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [performanceError, setPerformanceError] = useState<string | null>(null);
  const [selectedSalesmen, setSelectedSalesmen] = useState<string[]>([]);

  useEffect(() => {
    async function loadSalesmen() {
      const sessionStart = performance.timeOrigin;
      
      if (store.salesmen && store.salesmenLastFetch && store.salesmenLastFetch > sessionStart) {
        return;
      }

      try {
        setSalesmenLoading(true);
        setSalesmenError(null);
        const response = await fetchSalesmenData();
        store.setSalesmen(response);
      } catch (err) {
        setSalesmenError(err instanceof Error ? err.message : 'Error fetching salesmen data');
      } finally {
        setSalesmenLoading(false);
      }
    }

    loadSalesmen();
  }, [store.salesmen, store.salesmenLastFetch, store.setSalesmen]);

  useEffect(() => {
    async function loadPerformanceData() {
      const sessionStart = performance.timeOrigin;
      
      if (store.salesmanPerformance && store.salesmanPerformanceLastFetch && store.salesmanPerformanceLastFetch > sessionStart) {
        return;
      }

      try {
        setPerformanceLoading(true);
        setPerformanceError(null);
        const response = await fetchSalesmanPerformanceData();
        store.setSalesmanPerformance(response);
      } catch (err) {
        setPerformanceError(err instanceof Error ? err.message : 'Error fetching performance data');
      } finally {
        setPerformanceLoading(false);
      }
    }

    loadPerformanceData();
  }, [store.salesmanPerformance, store.salesmanPerformanceLastFetch, store.setSalesmanPerformance]);

  const handleSalesmanToggle = (salesmanName: string) => {
    setSelectedSalesmen(prev => {
      if (prev.includes(salesmanName)) {
        return prev.filter(name => name !== salesmanName);
      } else {
        return [...prev, salesmanName];
      }
    });
  };

  const handleSalesmenUpdate = (updatedSalesmen: any[]) => {
    store.setSalesmen(updatedSalesmen);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Salesmen Management</h1>
        <p className="text-muted-foreground">
          Manage your sales team and track their performance over time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SalesmenList
            salesmen={store.salesmen}
            isLoading={salesmenLoading}
            error={salesmenError}
            selectedSalesmen={selectedSalesmen}
            onSalesmanToggle={handleSalesmanToggle}
            onSalesmenUpdate={handleSalesmenUpdate}
          />
        </div>

        <div className="lg:col-span-2">
          <PerformanceChart
            performanceData={store.salesmanPerformance}
            selectedSalesmen={selectedSalesmen}
            isLoading={performanceLoading}
            error={performanceError}
          />
        </div>
      </div>
    </div>
  );
}
