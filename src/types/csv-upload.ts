export interface CsvUploadResponse {
  message: string;
  totalRows: number;
  validRows: number;
  errors: string[];
  createdSalesmen: Array<{
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  }>;
  createdMeetings: Array<{
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    phone: string;
    salesmanName: string;
    salesmanId: number;
    date: string;
    closed: boolean;
    transcription: string;
  }>;
  alreadyCreatedMeetings: Array<{
    name: string;
    email: string;
    salesmanName: string;
    date: string;
  }>;
}
