import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+91|0)?[6-9]\d{9}$/,
      "Invalid Indian phone number"
    ),
});