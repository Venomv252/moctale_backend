import { z } from "zod";

export const otpSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
  otp: z.string().length(6),
});
