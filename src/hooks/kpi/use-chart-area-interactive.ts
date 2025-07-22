import { useState, useEffect, useCallback } from 'react';
import { kpiService } from '@/services/api-services';
import { useKpiStore } from '@/stores/kpi-store';

export function useChartAreaInteractive() {
  const { chartAreaData, chartLastFetch, setChartAreaData } = useKpiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChartAreaData = useCallback(async () => {
    const sessionStart = performance.timeOrigin;
    
    if (chartAreaData && chartLastFetch && chartLastFetch > sessionStart) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await kpiService.getChartAreaInteractive();
      setChartAreaData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching chart data');
    } finally {
      setIsLoading(false);
    }
  }, [chartAreaData, chartLastFetch, setChartAreaData]);

  useEffect(() => {
    fetchChartAreaData();
  }, [fetchChartAreaData]);

  return { 
    chartAreaData, 
    isLoading, 
    error 
  };
}