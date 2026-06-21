// models/Movie/crewMember.schema.js

import mongoose from "mongoose";

const crewMemberSchema = new mongoose.Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },

    department: {
      type: String,
      required: true,

      enum: [
        "director",
        "writer",
        "producer",
        "music director",
        "cinematographer",
        "editor",
        "vfx",
        "costume designer",
        "choreographer",
        "action director",
      ],
    },

    roleTitle: {
      type: String,
      trim: true,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

export default crewMemberSchema;