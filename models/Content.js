import mongoose from "mongoose";

import castMemberSchema from "./castMember.schema.js";
import crewMemberSchema from "./crewMember.schema.js";

const contentSchema = new mongoose.Schema(
  {
    // CONTENT TYPE

    type: {
      type: String,
      required: true,
      enum: ["movie", "series", "anime"],
      index: true,
    },

    // BASIC INFO

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    tagline: {
      type: String,
      default: "",
    },

    // MEDIA

    poster: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    trailerUrl: {
      type: String,
      default: "",
    },

    screenshots: [
      {
        type: String,
      },
    ],

    // RELEASE INFO

    releaseDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "released", "cancelled"],
      default: "released",
    },

    latestUpdate: {
      type: String,
      trim: true,
      default: "",
    },

    whatsNew: {
      type: String,
      trim: true,
      default: "",
    },

    primaryLanguage: {
      type: String,
      required: true,
    },

    availableLanguages: [
      {
        type: String,
      },
    ],

    country: {
      type: String,
      default: "",
    },

    // SERIES / ANIME ONLY

    seasons: [
      {
        seasonNumber: {
          type: Number,
          required: true,
        },

        episodeCount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    // CATEGORIES

    genres: [
      {
        type: String,
        required: true,
      },
    ],

    keywords: [
      {
        type: String,
      },
    ],

    ageRating: {
      type: String,
      enum: ["U", "U/A 7+", "U/A 13+", "U/A 16+", "A"],
      default: "U/A 13+",
    },

    // PEOPLE

    cast: [castMemberSchema],

    crew: [crewMemberSchema],

    // RATINGS

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // ENGAGEMENT

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    // FEATURE FLAGS

    isTrending: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    // SEO

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    // ADMIN

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// INDEXES

contentSchema.index({ title: "text" });
contentSchema.index({ genres: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ averageRating: -1 });
contentSchema.index({ releaseDate: -1 });
contentSchema.index({ slug: 1 });

const Content = mongoose.model("Content", contentSchema);

export default Content;