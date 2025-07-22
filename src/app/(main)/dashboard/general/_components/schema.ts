import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  salesmanName: z.string(),
  salesmanId: z.number(),
  date: z.string(),
  closed: z.boolean(),
  transcription: z.string(),
});
