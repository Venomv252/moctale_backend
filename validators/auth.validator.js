import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name required"),

  lastName: z.string().min(1, "Last name required"),

  username: z.string().min(3, "Invalid Username"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z.string().regex(/^(?:\+91|0)?[6-9]\d{9}$/, "Invalid phone number"),
});

export const loginSchema = z
  .object({
    phone: z
      .string()
      .regex(/^(?:\+91|0)?[6-9]\d{9}$/, "Invalid phone number")
      .optional(),

    username: z.string().min(3).optional(),

    password: z.string().min(6),
  })
  .refine((data) => data.phone || data.username, {
    message: "Phone or username is required",
    path: ["phone"],
  });
