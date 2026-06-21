import { z } from "zod";

export const contentValidator = z.object({
  type: z.enum(["movie", "series", "anime"], {
    required_error: "Content type is required",
  }),

  title: z.string().trim().min(1, "Title is required"),

  slug: z.string().trim().min(1, "Slug is required"),

  description: z.string().trim().min(1, "Description is required"),

  tagline: z.string().optional(),

  poster: z.string().url("Poster must be a valid URL"),

  banner: z.string().optional(),

  trailerUrl: z.string().optional(),

  releaseDate: z.string().min(1, "Release date is required"),

  duration: z.coerce
    .number()
    .positive("Duration must be greater than 0"),

  status: z
    .enum(["upcoming", "released", "cancelled"])
    .default("released"),

  latestUpdate: z.string().optional(),

  whatsNew: z.string().optional(),

  primaryLanguage: z
    .string()
    .trim()
    .min(1, "Primary language is required"),

  availableLanguages: z.array(z.string()).optional(),

  country: z.string().optional(),

  genres: z
    .array(z.string())
    .min(1, "At least one genre is required"),

  keywords: z.array(z.string()).optional(),

  screenshots: z.array(z.string()).optional(),

  ageRating: z
    .enum(["U", "U/A 7+", "U/A 13+", "U/A 16+", "A"])
    .default("U/A 13+"),

  seasons: z
    .array(
      z.object({
        seasonNumber: z.coerce.number().positive(),
        episodeCount: z.coerce.number().min(0),
      })
    )
    .optional(),

  cast: z
    .array(
      z.object({
        person: z.string().min(1, "Cast member name is required"),
        roleName: z.string().optional(),
        characterImage: z.string().optional(),
        order: z.coerce.number().optional(),
      })
    )
    .optional(),

  crew: z
    .array(
      z.object({
        person: z.string().min(1, "Crew member name is required"),
        department: z.string().optional(),
        job: z.string().optional(),
        order: z.coerce.number().optional(),
      })
    )
    .optional(),

  isTrending: z.boolean().optional(),

  isFeatured: z.boolean().optional(),

  isPremium: z.boolean().optional(),

  isPublished: z.boolean().optional(),
});