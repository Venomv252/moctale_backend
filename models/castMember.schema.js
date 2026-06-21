import mongoose from "mongoose";

const castMemberSchema = new mongoose.Schema(
  {
    person: {
      type: String,
      required: true,
      trim: true,
    },

    roleName: {
      type: String,
      required: true,
      trim: true,
    },

    characterImage: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

export default castMemberSchema;