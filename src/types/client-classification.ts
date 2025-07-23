export interface ClientClassificationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  commercialSector: string;
  leadSource: string;
  interestReason: string;
  clientMeetingId: number;
  hasDemandPeaks: boolean;
  hasSeasonalDemand: boolean;
  estimatedDailyInteractions: number;
  estimatedWeeklyInteractions: number;
  estimatedMonthlyInteractions: number;
  hasTechTeam: boolean;
  vambeModel: string;
  isPotentialClient: boolean;
  isProblemClient: boolean;
  isLostClient: boolean;
  shouldBeContacted: boolean;
  confidenceScore: number;
  modelVersion: string;
  clientMeeting: {
    id: number;
    name: string;
    email: string;
    salesmanName: string;
    date: string;
    closed: boolean;
  };
}
