import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type TrendingType = "up" | "stable" | "down";

export interface TrendingInfo {
  icon: typeof TrendingUp;
  variant: "default" | "destructive" | "secondary";
  text: string;
  className?: string;
}

export function getTrendingInfo(trending: TrendingType, value: number): TrendingInfo {
  const formatValue = (val: number) => {
    const absValue = Math.abs(val);
    return `${val > 0 ? '+' : val < 0 ? '-' : ''}${absValue}%`;
  };

  switch (trending) {
    case "up":
      return {
        icon: TrendingUp,
        variant: "default" as const,
        text: `Trending up ${formatValue(value)}`,
        className: "bg-green-500 text-white border-transparent hover:bg-green-600",
      };
    case "down":
      return {
        icon: TrendingDown,
        variant: "destructive" as const,
        text: `Down ${formatValue(value)}`,
        className: "bg-red-500 text-white border-transparent hover:bg-red-600",
      };
    case "stable":
      return {
        icon: Minus,
        variant: "secondary" as const,
        text: "Stable performance",
        className: "bg-gray-500 text-white border-transparent hover:bg-gray-600",
      };
    default:
      return {
        icon: Minus,
        variant: "secondary" as const,
        text: "No change",
        className: "bg-gray-500 text-white border-transparent hover:bg-gray-600",
      };
  }
}

export function getPersonalizedDescription(metricType: string, value: number, trending: TrendingType): string {
  switch (metricType) {
    case "meetings":
      if (trending === "up") {
        return value > 100 ? "Excellent networking activity" : "Good meeting momentum";
      } else if (trending === "down") {
        return value < 50 ? "Needs more client engagement" : "Meeting activity declining";
      } else {
        return value > 80 ? "Consistent client engagement" : "Steady meeting pattern";
      }
    
    case "closings":
      if (trending === "up") {
        return value > 50 ? "Outstanding sales performance" : "Strong closing trend";
      } else if (trending === "down") {
        return value < 20 ? "Focus on conversion strategies" : "Sales need attention";
      } else {
        return value > 40 ? "Reliable sales output" : "Stable closing pattern";
      }
    
    case "rate":
      if (trending === "up") {
        return value > 70 ? "Exceptional conversion rate" : "Improving efficiency";
      } else if (trending === "down") {
        return value < 40 ? "Conversion needs improvement" : "Rate declining";
      } else {
        return value > 60 ? "Good conversion efficiency" : "Average closing rate";
      }
    
    case "average":
      if (trending === "up") {
        return value > 10 ? "Exceeding monthly targets" : "Growing monthly output";
      } else if (trending === "down") {
        return value < 5 ? "Below target performance" : "Monthly output declining";
      } else {
        return value > 7 ? "Meeting monthly goals" : "Consistent monthly pace";
      }
    
    default:
      return "Performance tracking";
  }
}
