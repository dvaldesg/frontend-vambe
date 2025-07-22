import { useState, useEffect, useCallback } from 'react';
import { kpiService } from '@/services/api-services';
import { useKpiStore } from '@/stores/kpi-store';

export function useSectionCards() {
  const { sectionCards, lastFetch, setSectionCards } = useKpiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSectionCards = useCallback(async () => {
    const sessionStart = performance.timeOrigin;
    
    if (sectionCards && lastFetch && lastFetch > sessionStart) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await kpiService.getSectionCards();
      setSectionCards(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching KPI data');
    } finally {
      setIsLoading(false);
    }
  }, [sectionCards, lastFetch, setSectionCards]);

  useEffect(() => {
    fetchSectionCards();
  }, [fetchSectionCards]);

  return { 
    sectionCards, 
    isLoading, 
    error 
  };
}