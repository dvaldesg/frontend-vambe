export interface CreateClientMeetingRequest {
  name: string;
  email: string;
  phone: string;
  salesmanName: string;
  date: string;
  closed: boolean;
  transcription: string;
}