import { ChartConfig } from "@/components/ui/chart";
import { LeadsSourceData, CommercialSectorData, LeadSourceSuccessRateData, CommercialSectorSuccessRateData, SalesmanSuccessRateData } from "@/types/kpi";

const extendedColorPalette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "hsl(0, 0%, 20%)",  // Dark gray
  "hsl(0, 0%, 30%)",  // Medium dark gray
  "hsl(0, 0%, 40%)",  // Medium gray
  "hsl(0, 0%, 50%)",  // Gray
  "hsl(0, 0%, 60%)",  // Light gray
  "hsl(0, 0%, 70%)",  // Lighter gray
  "hsl(0, 0%, 75%)",  // Very light gray
  "hsl(0, 0%, 80%)",  // Even lighter gray
  "hsl(0, 0%, 85%)",  // Almost white gray
  "hsl(0, 0%, 25%)",  // Dark variant
  "hsl(0, 0%, 35%)",  // Medium dark variant
  "hsl(0, 0%, 45%)",  // Medium variant
  "hsl(0, 0%, 55%)",  // Light variant
  "hsl(0, 0%, 65%)",  // Lighter variant
  "hsl(0, 0%, 15%)",  // Very dark gray
];

const sourceColorMap: Record<string, string> = {
  EVENT: "var(--chart-1)",
  REFERRAL: "var(--chart-2)",
  CONFERENCE: "var(--chart-3)",
  ORGANIC_SEARCH: "var(--chart-4)",
  SOCIAL_MEDIA: "var(--chart-5)",
  OTHER: extendedColorPalette[5],
  WEBSITE: "var(--chart-1)",
  COLD: "var(--chart-2)",
};

const sourceLabelMap: Record<string, string> = {
  EVENT: "Event",
  REFERRAL: "Referral",
  CONFERENCE: "Conference",
  ORGANIC_SEARCH: "Organic Search",
  SOCIAL_MEDIA: "Social Media",
  OTHER: "Other",
  WEBSITE: "Website",
  COLD: "Cold Outreach",
};

const sectorLabelMap: Record<string, string> = {
  RETAIL: "Retail",
  PROFESSIONAL_SERVICES: "Professional Services",
  MEDIA_AND_ENTERTAINMENT: "Media & Entertainment",
  HEALTHCARE: "Healthcare",
  EVENTS: "Events",
  TECHNOLOGY: "Technology",
  EDUCATION: "Education",
  TOURISM: "Tourism",
  FOOD_AND_BEVERAGE: "Food & Beverage",
  FINANCIAL_SERVICES: "Financial Services",
  LOGISTICS: "Logistics",
  DESIGN: "Design",
  CONSTRUCTION: "Construction",
  REAL_ESTATE: "Real Estate",
  NON_PROFIT: "Non Profit",
  SECURITY: "Security",
  ENERGY: "Energy",
  TRANSPORTATION: "Transportation",
  AGRICULTURE: "Agriculture",
};

export function transformLeadsSourceData(apiData: LeadsSourceData[]) {
  return apiData.map((item, index) => ({
    source: item.source.toLowerCase(),
    leads: item.quantity,
    fill: sourceColorMap[item.source] || extendedColorPalette[index % extendedColorPalette.length],
  }));
}

export function generateLeadsSourceChartConfig(apiData: LeadsSourceData[]): ChartConfig {
  const config: ChartConfig = {
    leads: {
      label: "Leads",
    },
  };

  apiData.forEach((item, index) => {
    const sourceKey = item.source.toLowerCase();
    config[sourceKey] = {
      label: sourceLabelMap[item.source] || item.source,
      color: sourceColorMap[item.source] || extendedColorPalette[index % extendedColorPalette.length],
    };
  });

  return config;
}

export function transformCommercialSectorsData(apiData: CommercialSectorData[]) {
  return apiData.map((item, index) => ({
    sector: item.commercial_sector.toLowerCase(),
    leads: item.quantity,
    fill: extendedColorPalette[index % extendedColorPalette.length],
  }));
}

export function generateCommercialSectorsChartConfig(apiData: CommercialSectorData[]): ChartConfig {
  const config: ChartConfig = {
    leads: {
      label: "Leads",
    },
  };

  apiData.forEach((item, index) => {
    const sectorKey = item.commercial_sector.toLowerCase();
    config[sectorKey] = {
      label: sectorLabelMap[item.commercial_sector] || item.commercial_sector,
      color: extendedColorPalette[index % extendedColorPalette.length],
    };
  });

  return config;
}

export function getSuccessRateColor(rate: number): string {
  if (rate >= 60) return "hsl(142, 76%, 36%)"; // Green
  if (rate <= 40) return "hsl(0, 84%, 60%)"; // Red
  return "hsl(43, 89%, 38%)"; // Orange/Yellow for middle range
}

export function transformLeadSourceSuccessRateData(apiData: LeadSourceSuccessRateData[]) {
  return apiData.map((item) => ({
    leadSource: item.leadSource,
    closed: item.closed,
    notClosed: item.notClosed,
    successRate: item.successRate,
    total: item.closed + item.notClosed,
    successRateColor: getSuccessRateColor(item.successRate),
    closedColor: "hsl(142, 76%, 36%)", // Green
    notClosedColor: "hsl(0, 84%, 60%)", // Red
    sourceLabel: sourceLabelMap[item.leadSource] || item.leadSource
  }));
}

export function transformCommercialSectorSuccessRateData(apiData: CommercialSectorSuccessRateData[]) {
  return apiData.map((item) => ({
    commercialSector: item.commercialSector,
    closed: item.closed,
    notClosed: item.notClosed,
    successRate: item.successRate,
    total: item.closed + item.notClosed,
    successRateColor: getSuccessRateColor(item.successRate),
    closedColor: "hsl(142, 76%, 36%)", // Green
    notClosedColor: "hsl(0, 84%, 60%)", // Red
    sectorLabel: sectorLabelMap[item.commercialSector] || item.commercialSector
  }));
}

export function transformSalesmanSuccessRateData(apiData: SalesmanSuccessRateData[]) {
  return apiData.map((item) => ({
    commercialSector: item.commercialSector,
    closed: item.closed,
    notClosed: item.notClosed,
    successRate: item.successRate,
    total: item.closed + item.notClosed,
    successRateColor: getSuccessRateColor(item.successRate),
    closedColor: "hsl(142, 76%, 36%)", // Green
    notClosedColor: "hsl(0, 84%, 60%)", // Red
    sectorLabel: sectorLabelMap[item.commercialSector] || item.commercialSector
  }));
}
